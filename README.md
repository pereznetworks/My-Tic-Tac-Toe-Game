# TD-Project4: TIC-TAC-TOE

# TODO:

    Fix browser crash bug

    Finish documentation

# Project Expectations:  

    No plugins are used. All javascript, game.js, is written by me.
    I modified the provided index.html, styles.css a little.
    I added a game.css as well.

# Start Screen - Game start

    When the page loads, the startup screen appears.

    When the player clicks the start button, the start screen disappears.
    Then the game board appears, and the game begins.

    The game starts with player X, and the X player label is active.
    When active the box is highlighted with the player's color.

    EXTRA CREDIT # 1

        The game will not begin if both players name are blank. On 'start game', if both players name are blank, the player X name input is highlighted with an placeholder prompting for at least 1 player name.

        At least 1 player name must be entered of player X or O. The player names are then presented with X and O label and on the finish winner screen.

        If only 1 player name entered, the computer plays the player with no name.

# Board Screen - Game play:

    The game play following these rules:

    EXTRA CREDIT # 2
        Play alternates between X and O, with names of each player in each player label.

    The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player.

    When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square.

    Players can only click on empty squares. When the player clicks on an empty square the proper image to the square marking it as occupied.

    Once a box is chosen, or clicked, the players turn ends and the other players turn begins.
    The Player O or X label will be 'active' background color, when it's that players turn.
    There is no opportunity to go back and deselect a box or do a turn over again.

    EXTRA CREDIT # 3

        When it's the computer player's turn, a setTimeout of 800 milliseconds is used to give the highlight affect of the computer player's player-label to occur. This also makes it easier for the human player to realize that the computer is taking it's turn.

        While the computer is taking it's turn, mouse-hover and mouse-click events on the Tictactoe boxes is disabled. This is so the human player will not click a box by mistake. The mouse-hover and mouse-click event on the Tictactoe boxes in enabled when it's the human's turn.

        More on the computer player below.

    The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally.

    When the game ends, the board disappears and the finish screen appears.

# Finish Screen - Game end:

    The word "Winner" appears and the screen is the players color, Blue for X and Orange for O.

    EXTRA CREDIT #4:  

        The name of the player who wins, is also shown.

    If it's tie, no winner, the screen is green and the phrase "It's a tie" appears.

    If all of the squares are filled and no players have three in a row, the game is a tie.
    When only box is left empty, and no win is possible, the game will display the finish screen with, 'it's a tie'.

    When the "Play Game!" button is clicked, a game reset occurs, the board appears again, empty, and a new game begins. A game reset is: all internal game, and computer player if needed,  tracking values as well as the filled-in boxes are reset to appear empty.

    When 'playing again', the player names remain.

    When the "New Game, with different players" button is clicked, a game reset occurs, but also the player names are reset also. The start screen, with blank player name inputs appears again, to start a new game with different players  

# Extra Credits

  1: On the start screen, the user is prompted to add their name before the game starts

  2: Display the player’s name on the board screen during game play

  3: Add programming to support playing against the computer.

          If only one player name is entered; the player name that is blank is by the computer.

          When it's the computer player's turn, a setTimeout of 800 milliseconds is used to give the highlight affect of the computer player's player-label to occur. This also makes it easier for the human player to realize that the computer is taking it's turn.

          While the computer is taking it's turn, mouse-hover and mouse-click events on the Tictactoe boxes is disabled. This is so the human player will not click a box by mistake. The mouse-hover and mouse-click event on the Tictactoe boxes in enabled when it's the human's turn.

          The computer player will play to win, but will also play to bitter end, even if a draw.

          Instead of implementing an unbeatable computer player, I added both logic and randomness so the computer player will win, is possible, but will also not always respond that same way to every scenario.

          When there is more then one block or win possibility, a random number generator is used to pick from the possible win or block targets.

          This makes the computer player appear to win or lose 'naturally'. I believe this makes the playing experience more fun for the human player  

  4: DONE: Display the player’s name if they win the game


# TicTacToe program flow:

     tictactoe is an IIFE module

              start-screen
                startGame
                  setupNewGame
                  playGame

              board-screen
                playGame
                  takeTurn
                    trackFilledBoxes
                    detectIfWinner
                    isGameOver
                      finishGame
                        show finish-screen
                if computerPlayer
                  analyzeGameBoard
                    findTargetBox
                  makeWinMove or makeBlockMove
                    takeTurn
                      trackFilledBoxes
                      detectIfWinner
                      isGameOver
                        finishGame
                          show finish-screen

              finish-screen
                  finishGame
                    if 'play again'
                      setupNewGame
                       if reset
                          emptyArray
                            on filledBoxes, Xfilled, Ofilled and winRowsProgress
                            if computer player,
                              on playerFilled and opponentFilled
                      playGame
                        show board-screen
                    if 'new game, different players'
                      setupNewGame
                        show start-screen


# Game-State and the Computer-Player

     Game play is handled by the playGame() and the takeTurn() method.

          With each turn, gamePlay(), calls takeTurn(), which calls trackFilledBoxes, which updates winRowsProgress with state of each box and state of the row the box is in.

          The takeTurn() method 'fills-in' the players selected box with X or O.

          After this the takeTurn() methods, calls detectIfWinner to update game.isWinner if there is a winner.

          Then playGame calls isGameOver() to see check the game.isWinner variable to see if it is set to "keep playing", or if there is a tie or winner.

          game.isGameOver() calls finishGame() if there is a tie or a winner.

          Otherwise, gamePlay() continues.

      The state of the game-board is tracked in game.winRowsProgress table array.

          The key to tracking the game-state and to allowing the computer-player to 'see' the game-board, is the winRowsProgress table, which is an array or arrays. The winRowsProgress table is a bit complex. By tracking more information here, I can use simpler code in the rest of my game-state and computer-player programming.

          The winRowsProgress table is made up of the possible winning-rows, or rows of 3, vertically, horizontally, diagonally, that could result in a win.

          Each winning-row is an array of 4 elements. The first 3, are the boxes. The fourth element of each winning-row is a string, which represents the state of that winning-row.
          The state of each winning-row can be empty, or blocked.

          In addition, in the winning-row's fourth element, the state, is also used to track which player still has a chance to win with that row, how many boxes are filled by that player.

          So the winning-row state could then be set to X-w1, X-w2 or O-w1 or O-w2. Once a winning-row is completed by one player, this fourth element is set to X-winner or O-winner.

          As for the boxes, the first 3 elements of each winning-row each are arrays containing 2 elements, [ [integer],['state'] ]. The 0 element of each box array is the number of that box on the tictactoe board counting from 0, top-left corner, left to right. The [1] element of each box array is the 'state' of each box, E for empty, X or O.

      The Computer Player

          The computerPlay() methods uses 3 different levels of methods. In the computerPlay() method, a fairly simple if/else decision-tree is used to find empty boxes that are targets for a block or for a win.

          The computerPlay() if/else decision-tree is turn-based.

          Instead of calculating all the different moves possible in a move-branching tree, after each turn. I choose a somewhat simpler method.

          I used the game.winRowsProgress allows me to simply look at which wins are possible given the moves that have been made.

          The computerPlay() method, calls the analyzeGameBoard() method, passing a value of what state of winning-rows to check for, whether to look for winning rows that have 1, ''-w1', or 2, '-w2', boxes filled in.

          The analyzeGameBoard() functions calls the findTargetBox, which reads the winRowsProgress table-array, filtering on winning-rows have a certain number of empty boxes and which player filled boxes in a winning-row   The winRowsProgress table array is updated after each move by the trackFilledBoxes method.

          The analyzeGameBoard(), returns an object, possibleTargets, with 2 arrays. Each array is set of empty boxes that are targets for a block of a winning row or completion of a winning row.  

          Back in the computerPlay() method, 2 functions, makeWinMove or makeBlockMove are called depending on whether blocks or wins are available.  The makeWinMove and makeBlockMove are passed the possibleTargets object.

          When there is more then one block or win possibility, a random number generator is used to pick from the possible win or block targets.

          In a future version....

              I could add some code to 'rank' the targets by using a move-tree for the possible win or block targets only.

              I could also, add code so the computer player 'learns'. I could do this by saving the state of the winRowsProgress table at the end of each game, lose or win. Then add code to analyze which "move" to reveal a tictactoe box that is a target to win that scenario in the future.
