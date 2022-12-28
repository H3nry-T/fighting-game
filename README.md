# 2D FIGHTING GAME
#### Video Demo:  <URL HERE>
#### Description:

####2D Fighting Game
This 2D fighting game is a simple implementation of a side-scrolling fighting game. The game features two fighters - a player character and an enemy character - who fight each other until one of them is defeated or the timer runs out.

####Files
index.html - This file contains the HTML structure of the game. It includes the canvas element where the game is drawn, as well as the necessary CSS and JavaScript files.
index.js - This is the main JavaScript file for the game. It contains the logic for creating and updating the player and enemy characters, as well as the game loop and user input handling.
classes.js - This file contains the classes for the game's sprites, including the Sprite class and the Fighter class which extends Sprite. It also includes the rectangularCollision function which is used to determine if the player's attack box has collided with the enemy character.
utils.js - This file contains utility functions for the game, including the decreaseTimer function which counts down the timer and the determineWinner function which determines the winner of the fight based on the health of the player and enemy characters.

####Design Choices
I chose to use the Sprite class as a base class for the player and enemy characters, as both of them will have largely the same functionality but with different sprites. This allows for code reuse and makes it easier to add new characters to the game in the future.

I also implemented a simple state machine for the player character, where the character's sprite and attack box changes based on the user input and the character's velocity. This allows for more realistic and varied gameplay.

Each Attack has a a slight delay depending on the frames of the attack animation. Each sprite has a series of frames that are different for each character. The blue character Kenji is faster whilst the Red character samurai Mack is slower because it's attack animation is 6 frames long. 

Kenji does less damage compared to samurai mack but is quicker. 

Both characters are controllable for multiplayer. the kenji character is controlled through the arrow buttons and the samurai mack character is controllable through the wasd keys. This allows for local multiplayer which is alot more fun if you have friends around. However you are not able to play the game in single player. 

Added rotation on the X axis so the players can face different directions and the hitboxes will rotate as well. 

the arena doesn't have a boundary, instead the player can go behind the other player by going out of bounds.

both players can double jump which adds more dynamic gameplay compared to being able to jump once. 

I have also added some critical hits which will add some uncertainty into the game. especially samurai mack who has a slower katana, may be able to deal extremely high dps. `