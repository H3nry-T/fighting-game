class Sprite {
    constructor({position, imageSource, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        this.position = position;

        this.height = 150; 
        this.width = 50; 
        this.image = new Image(); 

        this.image.src = imageSource; 

        this.scale = scale; 
        this.framesMax = framesMax; 

        this.framesCurrent = 0; 
        this.framesElapsed = 0; 
        this.framesHold = 5; 

        this.offset = offset; 
    }

    //draw sprite
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax), 
            0, 
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        ); 
    }

    animateFrames() {
        this.framesElapsed += 1; 
        
        //every 10 frames
        if (this.framesElapsed % this.framesHold === 0) {
            //ANIMATE sprite "-1" stops the background from updating/flickering
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++; 
            } else {
                this.framesCurrent = 0; 
            }
        }
    }

    //update sprite
    update() {
        this.draw(); 
        this.animateFrames(); 
    }
}

class Fighter extends Sprite {
    constructor({
        position, 
        velocity, 
        color="red", 
        imageSource, 
        scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y: 0},
        sprites, 
        attackBox = {offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSource, 
            scale,
            framesMax,
            offset
        }); 
        this.framesCurrent = 0; 
        this.framesElapsed = 0; 
        this.framesHold = 5; 

        //FIGHTER unique properties
        this.velocity = velocity;
        this.height = 150; 
        this.width = 50; 
        
        this.lastKey; 
        
        this.attackBox = {
            position: {
                //pass by value NOT a shallow clone
                x: this.position.x, //0
                y: this.position.y  //0
            },
            width: 100,
            height: 50,
            
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        
        this.color = color; 
        this.isAttacking;
        this.health = 100; 
        this.dead = false; 

        this.sprites = sprites; 
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image(); 
            sprites[sprite].image.src = sprites[sprite].imageSource; 
        }
    }

    //update sprite affected by gravity
    update() {
        this.draw(); 
        if (!this.dead) {
            this.animateFrames(); 
        }

        //attackBox should follow around the player's position       offset means attack box on enemy will face the player
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;  
        //draw the attack box
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height); 

        //update position depends on button press / gravity
        this.position.x += this.velocity.x; 
        this.position.y += this.velocity.y; 

        //  bottom of the sprite      +       velocity    >=      floor    we don't want the position to crash through the floor
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0; 
            this.position.y = 330;
        } else {
            // update gravitational acceleration if in sprite in air
            this.velocity.y += gravity; 
        }
    }

    attack() {
        this.switchSprite("attack1"); 
        this.isAttacking = true; 
    }

    takeHit(attackDamage) {
        this.health -= attackDamage; 
        if (this.health <= 0) {
            this.switchSprite("death"); 
        } else {
            this.switchSprite("takeHit"); 
        }
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true; 
            }
            return //death results in no code being run
        }
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) {
            return //idle animation will not trigger whilst attacking 
        } else if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) {
            return //idle animation will not trigger whilst taking hit
        } 
        switch(sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image; 
                    this.framesMax = this.sprites.idle.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
            case "run":
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image; 
                    this.framesMax = this.sprites.run.framesMax; 
                    this.framesCurrent = 0;
                }
                break; 
            case "jump":
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image; 
                    this.framesMax = this.sprites.jump.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
            case "fall":
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image; 
                    this.framesMax = this.sprites.fall.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
            case "attack1":
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image; 
                    this.framesMax = this.sprites.attack1.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
            case "takeHit":
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image; 
                    this.framesMax = this.sprites.takeHit.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
            case "death":
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image; 
                    this.framesMax = this.sprites.death.framesMax; 
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}

