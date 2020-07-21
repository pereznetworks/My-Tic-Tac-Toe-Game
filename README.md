# My Tic-Tac-Toe Game

  - Originally build as part of TeamTreehouse, Tech Degree, Full Stack JavaScript

  - All code in game.js, games.css is original.
    - No plugins are used.
    - I modified the provided index.html, styles.css a little

  - TicTacToe is a IIFE module.
    - It exports the entire game code, all variables, objects and methods into one variable, TicTacToe.

## Play the Game here

  - https://pereznetworks.github.io/TD-Project4/

## A Basic Multi-player Tic-Tac-Toe Game

  - A Human can
    - play against another human or computer player
    - play either X or O
    - can play as many games as desired
      - or reset with new player names

  - For Game to start
    - at least 1 player name has to be entered
    - computer plays unnamed player

  - Computer Player will seem to win or lose naturally
    - Logic and randomness programmed
    - Computer can win, if human player really screws up
    - Computer Player will not always play the same series of moves given the same game board scenario

## In future releases....

  - Add a native mobile device version 

  - Give players a choice of colors and symbols, avatars, to use in the game.

  - A choice to play a series of games
    - 2 out of 3, 4 out of 5, etc.
    - and keep track of wins/losses

  - Add AI, (make the computer player smarter)
    - mske it appear that the computer player 'learns'.
      - by saving the state of the gameBoardState table at the end of each game, lose or win.
      - add code to analyze the saved game...
        - to reveal which move at which turn can be taken...
        - to win, or not lose, that scenario in the future.
    - full implementation of a min-max or other algorithm,

## Technical Readme
  - [A very lengthy and comprehensive technical walk through is available here](TechnicalReadme.md)
