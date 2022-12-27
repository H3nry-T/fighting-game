class Sprite {
    constructor({position, imageSource}) {
        this.position = position;
        this.height = 150; 
        this.width = 50; 
        this.image = new Image(); 
        this.image.src = imageSource; 
    }

    //draw sprite
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y); 
    }

    //update sprite
    update() {
        this.draw(); 
    }
}

class Fighter {
    constructor({position, velocity, color="red", offset}) {
        this.position = position;
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

