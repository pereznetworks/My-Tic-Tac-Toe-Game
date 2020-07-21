# My Tic-Tac-Toe Game

  - Originally build as part of TeamTreehouse, Tech Degree, Full Stack JavaScript

  - All code in game.js, games.css is original.
    - No plugins are used.
    - I modified in the provided index.html, styles.css a little

  - TicTacToe is a IIFE module.
    - It exports the entire game code, all variables, objects and methods into one variable, TicTacToe.

## A Basic Multi-player Tic-Tac-Toe Game

  - A Human can
    - play against another human or computer player
    - play either X or O
    - can play as many games as desired
      - or reset with new player names

  - For Game to start
    - at least 1 player name has to be entered
    - computer plays unnamed player

## In future versions....

  - Give players a choice of colors and symbols, avatars, to use in the game.

  - A choice to play a series of games
    - 2 out of 3, 4 out of 5, etc.
    - and keep track of wins/losses

  - add AI
    - so the computer player 'learns'.
    - by saving the state of the gameBoardState table at the end of each game, lose or win.
    - add code to analyze the saved game...
      - to reveal which move at which turn can be taken...
      - to win, or not lose, that scenario in the future.
    - full implementation of a min-max or other algorithm,

## Technical Readme
  - [A very lengthy and comprehensive technical walk through is available here](TechnicalReadme.md)
