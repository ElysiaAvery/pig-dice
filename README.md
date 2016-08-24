# Pig Dice

#### By _Ewa Manek and Elysia Nason_

## Description

_A Pig Dice Game_

### Specifications

Program will be able to create player objects with overall score and turn score
* Example Input: n/a
* Example Output: player1 = {turnScore, overallScore}

Program will create a die object that can roll 1-6
* Example Input: n/a
* Example Output: die(random 1-6)

Program will create a game object that holds the player and die objects.
* Example Input: n/a
* Example Output: game{player1, player2, die}

On a die roll of one, the current player's turn score = 0
* Example Input: 1
* Example Output: player1.turnscore = 0

On another die roll, the value of the roll is added to turn score
* Example Input: 3
* Example Output: player1.turnscore += 3

Player can hold turnscore or roll 1 to end the turn:
* Example Input: hold/1
* Example Output: turn ends.

On turn end, turn score is added to overall score
* Example Input: (turn end)
* Example Output: player1.overallscore += player1.turnscore

If a player's overall score reaches 100, that player wins
* Example Input: player1.overallscore >= 100
* Example Output: player1.win = true/game.win = player1

On a turn end, the program will check if the current player won, if not, the current player switches to the other player
* Example Input: player1.overallscore = 78
* Example Output: currentplayer = player2

One player can be played by the computer
* Example Output: player2 = computerPlayer

The computer Player is a separate object
* Example Output: computerPlayer = new ComputerPlayer()

The computer Player has functions to help it decide to roll again or hold (initially random).
* Example Output: computerPlayer.rollagain()

Program will keep track of how many games each player has won
* Example Input: player1.win = true/game.win = player1
* Example Output: player1.gameswon ++

Program will allow players to play with two dice
* Example Output: die1(random 1-6), die2(random 1-6)

With two dice if two 1s are rolled, the player's entire score is lost and the turn ends
* Example Input: die1: 1, die2: 1
* Example Output: player1.turnscore = 0; player1.totalScore = 0;

With two dice if another double is rolled, the score is added to turn score and the player MUST roll again (no hold)
* Example Input: die1: 2, die2: 2
* Example Output: player1.turnscore += 4; player1.totalScore = 0;

## Setup/Installation Requirements

* _Copy the repository from GitHub_
* _Open the index.html file a browser of your choice_

## GitHub link

https://github.com/ewajm/Template

## Licensing

* MIT

Copyright (c) 2016 **_Ewa Manek and Elysia Nason_**

Original Template Copyright (c) 2016 **_Ryan Loos_**
