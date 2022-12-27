class Sprite {
    constructor({position, imageSource, scale = 1, framesMax = 1}) {
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
    }

    //draw sprite
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax), 
            0, 
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        ); 
    }

    //update sprite
    update() {
        this.draw(); 
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
}

class Fighter extends Sprite {
    constructor({position, velocity, color="red", offset, imageSource, scale = 1, framesMax = 1}) {
        super({
            position,
            imageSource, 
            scale,
            framesMax,
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
            
            offset: offset
        }
        
        this.color = color; 
        this.isAttacking;
        this.health = 100; 
    }

    //draw sprite
    draw() {
        c.fillStyle = this.color; 
        c.fillRect(this.position.x, this.position.y, this.width, this.height); //50px wide and 150px tall

        //draw attackBox when attacking
        if (this.isAttacking) {
            c.fillStyle = "green"; 
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height); 
        }
    }

    //update sprite affected by gravity
    update() {
        this.draw(); 

        //attackBox should follow around the player's position       offset means attack box on enemy will face the player
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;  

        //update position depends on button press / gravity
        this.position.x += this.velocity.x; 
        this.position.y += this.velocity.y; 

        //  bottom of the sprite      +       velocity    >=      floor    we don't want the position to crash through the floor
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0; 
        } else {
            // update gravitational acceleration if in sprite in air
            this.velocity.y += gravity; 
        }
    }

    attack() {
        this.isAttacking = true; 
        setTimeout(() => {
            this.isAttacking = false; 
        }, 100);
    }
}

