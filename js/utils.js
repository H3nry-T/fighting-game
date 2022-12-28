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
    document.querySelector("#display-text-restart").style.display = "flex"; 

    document.querySelector("#display-text-restart").innerHTML = "PRESS R TO RESTART"
    if (player.health === enemy.health) {
        document.querySelector("#display-text").innerHTML = "TIE"; 
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

function randomAttackMultiplier(number) {
    const min = 0.8;
    const max = 1.5;
    const increment = 0.1;

    const randomNumber = min + Math.random() * (max - min) / increment * increment;
    return randomNumber * number; 
}