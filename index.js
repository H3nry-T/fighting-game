const canvas = document.querySelector("canvas"); 
const c = canvas.getContext("2d"); //c stands for context it will be used alot

canvas.width = 1024; 
canvas.height = 576; 

//draw a rectangle from top left coordinate "fighting background"
c.fillRect(0, 0, canvas.width, canvas.height);

//global constants 
const gravity = 0.98; 


//class for fighters
class Sprite {
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

    //update sprite
    update() {
        this.draw(); 

        //attackBox should follow around the player's position       offset means attack box on enemy will face the player
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;  

        //update position depends on button press / gravity
        this.position.x += this.velocity.x; 
        this.position.y += this.velocity.y; 

        //  bottom of the sprite      +       velocity    >=      floor    we don't want the position to crash through the floor
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

//create instance of PLAYER Sprite
const player = new Sprite({
    position: {
        x: 0, 
        y: 0
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x: 0, 
        y: 0
    }
}); 

player.draw(); 

//create instance of ENEMY sprite
const enemy = new Sprite({
    position: {
        x: 400, 
        y: 100
    },
    velocity: {
        x: 0, 
        y: 0
    },
    color: "blue", 
    offset: {
        x: -50, 
        y: 0
    }
}); 

enemy.draw(); 

//key bindings
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },
    " ": {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

//rectangularCollision conditional 
function rectangularCollison({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

//determine winner takes in object with 2 sprites 
function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId); 
    document.querySelector("#display-text").style.display = "flex"; 
    if (player.health === enemy.health) {
        document.querySelector("#display-text").innerHTML = "Tie"; 
    } else if (player.health > enemy.health) {
        document.querySelector("#display-text").innerHTML = "PLAYER WINS";
    } else if (player.health < enemy.health) {
        document.querySelector("#display-text").innerHTML = "ENEMY WINS";
    }
}
//decrease timer countdown
let timer = 60; 
let timerId;  
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--; 
        document.querySelector("#timer").innerHTML = timer; 
    }

    if (timer === 0) {        
        determineWinner({player, enemy, timerId});
    }
}
decreaseTimer(); 

// animate the game
function animate() {
    window.requestAnimationFrame(animate); 

    //redraw the fighting background as a black rectangle
    c.fillStyle = "black"; 
    c.fillRect(0, 0, canvas.width, canvas.height); 

    //update player's position affected by gravity; 
    player.update(); 
    enemy.update(); 
    
    //default velocity 
    player.velocity.x = 0; 
    enemy.velocity.x = 0; 
    
    //animation responds to PLAYER controls 
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5; 
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5; 
    }

    //animation responds to ENEMY controls 
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5; 
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
       enemy.velocity.x = 5; 
    } 

    //PLAYER attackBox collision
    if (
        rectangularCollison({rectangle1: player, rectangle2: enemy})
        && player.isAttacking
    ) {
        player.isAttacking = false; 
        console.log("player attack hit"); 

        //damage enemy health change healthbar
        enemy.health -= 20; 
        document.querySelector("#enemy-health").style.width = enemy.health + "%"; 
    }

    //ENEMY attackBox collision
    if (
        rectangularCollison({rectangle1: enemy, rectangle2: player})
        && enemy.isAttacking
    ) {
        enemy.isAttacking = false; 
        console.log("enemy attack hit"); 

         //damage player health change healthbar
         player.health -= 20; 
         document.querySelector("#player-health").style.width = player.health + "%"; 
    }

    //END game based on health 
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId }); 
    }
}

animate(); 

//CONTROLS

//prevent scrolling and browser keybinds
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

//button keydown
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        //PLAYER controls
        case "d": 
            keys.d.pressed = true; 
            player.lastKey = "d";
            break;
        case "a": 
            keys.a.pressed = true; 
            player.lastKey = "a"; 
            break; 
        case "w": 
            player.velocity.y = -15; 
            break; 
        case " ": 
            player.attack(); 
            break;

        //ENEMY controls
        case "ArrowRight": 
            keys.ArrowRight.pressed = true; 
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft": 
            keys.ArrowLeft.pressed = true; 
            enemy.lastKey = "ArrowLeft"; 
            break; 
        case "ArrowUp": 
            enemy.velocity.y = -15; 
            break;
        case "ArrowDown":
            enemy.attack(); 
            break;
    }

});

//button keyup
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        //PLAYER controls
        case "d": 
            keys.d.pressed = false;
            break; 
        case "a": 
            keys.a.pressed = false;
            break; 
        case "w": 
            keys.w.pressed = false; 
            break; 

        //ENEMY controls
        case "ArrowRight": 
            keys.ArrowRight.pressed = false;
            break; 
        case "ArrowLeft": 
            keys.ArrowLeft.pressed = false;
            break; 
        case "ArrowUp": 
            keys.ArrowUp.pressed = false; 
            break; 
    }
});

