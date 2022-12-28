# 2D fighting game
This project is a simple fighting game that utilizes an HTML canvas and JavaScript.

## File Descriptions
- index.html - the HTML file that contains the canvas element and links to the necessary JavaScript files
- main.js - the main JavaScript file that contains the game logic and sets up the canvas and game elements
- sprite.js - the JavaScript file that contains the base Sprite class, which is used to create the player characters and other game elements
- fighter.js - the JavaScript file that contains the Fighter class, which extends the Sprite class and adds additional properties and methods specific to player characters

## Design Choices
- I chose to use a class-based structure for the game elements because it allows for easy reuse of code and the ability to create multiple instances of each class. The Sprite class is used as a base class for the Fighter class, which represents the player characters. This allows the Fighter class to inherit properties and methods from the Sprite class, such as the draw method.

- all player movement is in the Fighter.update() method. Every single animation frame checks for any velocity, position and player/enemy object changes. This is all embedded in the index.js animation() function game loop. This recursively calls itself. 

- player/enemy attack is randomized for some exiting gameplay

- both player/enemy characters can jump maximum 3 times. This functionality is the Fighter.jump() method

- both player/enemy can dodge once and must attack and hit to gain the dodge ability back

## game features:

keybindings: 

- w / arrowUp is to jump
- a / arrowLeft is to move left
- s / arrowDown is to attack
- d / arrowRight is to move right
- double tap a/d/arrowLeft/arrowRight is to dodge. 

Dodge mechanic: 
- players can only dodge once every time they spawn
- after using dodge once, the player can no longer dodge
- the player can gain a dodge by attacking the other character / enemy

Damage mechanic: 
- Red character has higher damage and a lower attack speed 
- Blue character has a lower damage and a higher attack speed
- critical hit chance is randomized from 0.8 - 1.5 attack multiplier

Jump mechanic: 
- both players can triple jump

Arena: 
- the arena is 1024 by 576 pixels
- the arena has no boundaries, once the player goes out of bounds the position is moved to the other side.
- the shop in the background is animated !

## How to use
- open the index.html file in the browser and start playing :)



