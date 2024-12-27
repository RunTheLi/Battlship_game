# Battlship_game
 We’re going to implement the classic game ‘Battleship’.

#Assignment for this project
1) Begin your app by creating the Ship class/factory (your choice).

Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.

Ships should have a hit() function that increases the number of ‘hits’ in your ship.

isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

2) Create a Gameboard class/factory.
Note that we have not yet created any User Interface. We should know our code is coming together by running the tests.

You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.

Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,

or records the coordinates of the missed shot.

Gameboards should keep track of missed attacks so they can display them properly.

Gameboards should be able to report whether or not all of their ships have been sunk.

3) Create a Player class/factory.

There will be two types of players in the game, ‘real’ players and ‘computer’ players.

Each player object should contain its own gameboard.

4) Import your classes/factories into another file, and drive the game using event listeners to interact with your objects.

Create a module that helps you manage actions that should happen in the DOM.

1.At this point it is appropriate to begin crafting your User Interface.

2.Set up a new game by creating Players. For now just populate each player’s Gameboard with predetermined coordinates.

You are going to implement a system for allowing players to place their ships later.

3.We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.

You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.

4.Your event listeners should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function,

step back and figure out which class or module that function should belong to.

5.For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects, and re-render the boards to display the new information.

Players should take turns playing the game by attacking the enemy Gameboard. If you feel the need to keep track of the current player’s turn,

it’s appropriate to manage that in this module, instead of another mentioned object.

The game is played against the computer, so make the ‘computer’ players capable of making random plays.

The computer does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).

6.Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module.

5) Finish it up by implementing a system that allows players to place their ships. For example, you can let them type coordinates for each ship or have a button to cycle through random placements.

// ---- https://runtheli.github.io/Battlship_game/ ---- //

![1](https://github.com/user-attachments/assets/efb0ccf3-7df4-464b-84f4-06272287c8a2)

![2](https://github.com/user-attachments/assets/2bdc7911-8193-4f2a-a6f7-c0f8178064cb)

![3](https://github.com/user-attachments/assets/030db2dc-7e24-43b2-aa66-1be08dce2f15)
