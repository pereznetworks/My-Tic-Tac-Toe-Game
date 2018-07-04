# TD-Project4: TIC-TAC-TOE

# Project Expectations:  Completed:

    No plugins are used. Besides the html and provided css and svg images, all javascript, game.js, is written by me. I modified index.html a little and added a game.css as well.

    Game begin

        When the page loads, the startup screen appears.
        When the player clicks the start button the start screen disappears, the board appears, and the game begins.
        The game starts with X, and the X player box is highlighted to indicate this.

# Game play:

        The game play following these rules:

        Play alternates between X and O.

        The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player.

        When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square.

        Players can only click on empty squares. When the player clicks on an empty square the proper image to the square marking it as occupied.

        Once a box is chosen, or clicked, the players turn ends and the other players turn begins. There is no opportunity to go back and deselect a box or do a turn over again.

        The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally.

        If all of the squares are filled and no players have three in a row, the game is a tie.

        When the game ends, the board disappears and the game end screen appears.

# Game end:

        The word "Winner" appears and the screen is the players color, Blue for X and Orange for O.

        If it's tie, no winner, the screen is green and the phrase "It's a tie" appears.

        When a player pushes the "New Game" button, the board appears again, empty, and a new game begins.

# Extra Credit 3 OUT OF 4 COMPLETE

    To get an "exceeds" rating, you can expand on the project in the following ways: 4 steps

# 1: DONE: On the start screen, prompt the user add their name before the game starts

# 2: DONE Display the player’s name on the board screen during game play

# 3: DEBUGGING Add programming to support playing against the computer.

      If only one player name plays; the other played by the computer.

      Ideal: Computer will play to win, but should play to bitter end, even if draw.
             Will always block opponents 2 in a row.
             Randomness built-in where more than 1 choice for win possible.
             So the computer will not respond that same to every scenario.

             while an unbeatable computer player is admirable,
             making the computer player appear to lose 'naturally' or 'randomly',
             makes playing more fun for the human player  

      NEED TO TEST COMPUTER PLAYING AS X.
      FOR COMPUTER PLAYING AS O, MOST scenarios tested.

      NEED TO FIX:

        1: FIXED
           bug: playerO-active label may turn on or off at incorrect times
           set a setTimeout with each turn computer takes
             so computer player active label get a chance to be 'actived'
           fixed new game playerO label also
             on newGame, reset both $playerX and $playerO labels to 'inactive'

        2: FIXED
           bug: human player can click and fill in a box when it's computer's turn
            which cause even more strange stuff to happen, yuk..
           disabled click and hover events on $(li.box)
            if computer player is enabled and it's computer's turn

        3: FIXED
            when one player gets 'flanked', immediate winner declared
            need to wait for 3 in a row to be actually selected
            perhaps, highlighting the winning row and waiting for 1-2 seconds

            ...okay, weird unintended programmed behavior...
            in the 'flanked' scenario, the 3rd box in the unblocked row ...
              .. actually get's filled in !?!?!?!?

              changed to end loop after one choice taken
                when iterating through possible win targets

        4: TEST Fix
            ensure that draw or tie is not declared to early
            when only 1 square is left empty with no possible wins

        5: FIXED
            ensure that game scenarios account for side or corner possible win-targets
            after moves, 2,3,4
            including the randomness if more than one win-target possible

        6: REMOVED
            hoverAffect() for computer dropped
            not enough time for affect to occur
            when set to occur to quickly is confusing

        7: other bugs: move-randomization, double-finish-screen, a few others..

# 4: DONE: Display the player’s name if they win the game
