# Technical Readme for My Tic-Tac-Toe game
- So this is kind of code review

# Start Screen - Game start

  - When the html page loads, the startup screen appears.

  - A name for Player X or O must be entered.
    - If not Player X name input changes to, "enter a name for X or O"

  - When players names are entered,
    - the start button is clickable ...
    - the start screen disappears.
    - the game board appears, and the game begins.

  - Yes, this means 2 humans can play
  - Or 1 human can play against a computer player

# Board Screen - Game play:

  - The game play following these rules:

  - Play alternates between X and O.

  - Whether the playing against the computer or not...
  - the game starts with player X, and the X player label is active.

  - Player X's label appears on the right.
  - Player O's label appears on the left.

## EXTRA CREDIT # 2

### Player Labels
  - The names of each player appear with X and O player labels.

  - The current or active player is indicated when O or X label is highlighted.
    - When Player X's label is highlighted with a BLUE color.
    - When Player O's label is highlighted with an ORANGE color.

### Taking Turns
  - As the current player's mouse 'hovers' over an empty box on the board,
    - Their symbol, the X or O, appears temporarily.
    - The players symbol appears to follow the player's mouse around the board.

  - Players can only click only one empty box per turn.

  - When the player clicks on an empty square ...
  their image is permanently placed in the box, marking it as occupied.

  - Once a box is chosen, or clicked...
    - that player's turn ends and the other player's turn begins.

### Active Player Indication

  - On each turn, the active player's label is toggled,
    - each player has it's respective 'active' background color...
    - each changes from grey to the active color for X or O, and back again when inactive.

### No Undo of moves *for now*

  -There is no opportunity to go back ...
  - nor to deselect a box
  - nor to do a turn over again.

### The game ends when ...

  - When one player has three of their symbols in a row....
    - either horizontally, vertically or diagonally

  - When all boxes are filled, with no winner

  - When the game ends, the board disappears and the finish screen appears.

### Finish Screen - Game end:

  - When there is a winner, a timeout of 800 milliseconds is used...
    - to make sure then human player will notice the winning row...
    - and see that the game is indeed a tie.

  - On the finish screen...
    - The word "Winner" appears ...
    - and the screen is that player's color, Blue for X and Orange for O.

    - If it's tie, there was no winner...
      - the screen is green and the phrase "It's a tie" appears.

### Continuing to Play

  - 2 buttons, or choices, are presented on the finish-screen...
    - When "Play Again!" is selected...
      - a game reset occurs.
      - a game reset is: internal values are reset to starting values.
      - The game board appears again, empty.
      - The same player names persist and same players keep playing.

    - When the "New Game, is selected
      - a game reset also occurs, however...
      - The player names are reset to blank and..
      - The normal start screen appears..
        - with a "start game" button
        - and player names inputs are blank,

## Extra Credits

### EXTRA CREDIT # 1

- Player Names.

  - Player X name input appears on left, Player O name input on the right.

  - The start screen will not switch to the game board screen unless...
    - if both players name inputs are blank.

  - On clicking 'start game', if both players name are blank...
    - the player X name input is highlighted
    - with an placeholder prompting for at least 1 player name.

### EXTRA CREDIT # 2:

  - Display player's name during game play.

  - The player’s name/s are displayed on the game board screen...
    - along with the X or O player label

  - Also, from the finish screen, when 'play again' is clicked...
    - the player names persist
    - these appear on the game board again
    - and the same players continue to play the game.

### EXTRA CREDIT # 3

  - If only 1 player name is entered...
    - the computer plays the player with no name.

  - Since the Player X name input gets focus on html page load...

  - Let's assumes that ....
    - most humans will want to play the game as X.
    - However, the computer can play both X or O,

  - The computer player...
    - If only one player name is entered;
    - the player name that is blank is played by the computer.

  - at beginning of computer's turn
    - a setTimeout of 800 milliseconds is used ...
    - to allow for the activation of computer player's player-label
    - otherwise, humans won't notice it
    - and will lose the feel of smooth game-flow

  - after the computer's turn, a 500 millisecond setTimeout is used
    - so that the human player can see the box filled..
    - before game is over or before it's the humans turn again.

  - While the computer is taking it's turn...

     - the mouse-hover and mouse-click events are disabled
        - this is so the human player will not be able to..
          - click a box by mistake, (or on purpose, ha..ha..)
        - these are enabled again when it's the human's turn.

  - The computer player will play to bitter end, even if a draw.
    - added both logic and randomness to the computer player.
    - The computer can win, if the human player really screws up
    - The computer will also try to block the human from winning.
    - But the computer will not always respond that same way to the same scenario.

  - When there is more then one block or win possibility...
    - a random number generator is used...
    - to pick from the possible win or block targets.
    - This makes the computer player...
      - appear to win or lose 'naturally'.
      - without purely 'programmed responses'.
      - It also gives the human player a chance to win, which is more fun for the human player.  

### EXTRA CREDIT # 4:

  - The winning player’s name is displayed in the finish-win screen.

  - When a player wins...
  that player’s name is displayed in the finish-win screen.

#### [Project Home](README.md)
