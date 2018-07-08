# TD-Project4: TIC-TAC-TOE

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

        Player Names.

        The game will not begin if both players name inputs are blank.

        On clicking 'start game', if both players name are blank...
          the player X name input is highlighted
          with an placeholder prompting for at least 1 player name.

        At least 1 player name must be entered in player X or O.
        The player names are then presented with X and O label
        The name of the player who wins is presented on finish-win screen.

        EXTRA CREDIT # 3

          If only 1 player name is entered...
            the computer plays the player with no name.

            So the computer can play both X or O, but the UI assumes...
            most humans will want to play the game as X, with first turn.

            More on the computer player below under # Extra Credits.

# Board Screen - Game play:

    The game play following these rules:

    Play alternates between X and O.

    EXTRA CREDIT # 2
        The names of each player appear with X and O player labels.

    The current or active player is indicated by...
    -- the label the symbol O or X is highlighted for the current player.

    As the current player's mouse 'hovers' over an empty box on the board,
    Their symbol, the X or O, appears temporarily.
    Their symbol follows the player's mouse around the board.

    Players can only click one empty box per turn.
    When the player clicks on an empty square ...
    their image is permanently placed in the box, marking it as occupied.

    Once a box is chosen, or clicked...
     the players turn ends and the other players turn begins.

    On each turn, the player's label,
     get it's respective 'active' background color...
     changes from grey to the active color for X or O.

     There is no opportunity to go back ...
      Nor deselect a box nor do a turn over again.

    EXTRA CREDIT # 3

        If there's only 1 player name, the computer plays the nameless player.

        When it's the computer player's turn...

        a setTimeout of 800 milliseconds is used ...
        to allow for the activation of computer player's player-label ...

        This slows the game a little, but makes it easier...
        for the human to realize that the computer is taking it's turn.

        While the computer is taking it's turn...

         the mouse-hover and mouse-click events are disabled
         ...on the Tictactoe boxes.

         This is so the human player will not click a box by mistake.

         The mouse-hover and mouse-click event on the Tictactoe boxes
          are enabled again when it's the human's turn.

         More on the computer player below under # Extra Credits.

    The game ends when ...

     When one player has three of their symbols in a row....
      either horizontally, vertically or diagonally

     When all boxes are filled, with no winner

     When the game ends, the board disappears and the finish screen appears.

# Finish Screen - Game end:

    On the finish screen...

      The word "Winner" appears ...
      and the screen is that players color, Blue for X and Orange for O.

    EXTRA CREDIT #4:  

        The name of the player who wins, is also shown.

    If it's tie, no winner...
     the screen is green and the phrase "It's a tie" appears.

    2 choices are presented on the finish-screen...

      When the "Play Again!" button is clicked a game reset occurs.
        A game reset is: internal values are reset to default starting values.
        The game board appears again, empty.
        The same player names persist and a new game begins.

        When the "New Game, with different players" button is clicked...
         a game reset also occurs, however...
          The player names are reset to blank and..
          The normal start screen appears..
            with blank player name inputs,
            and the 'start game' button

# Extra Credits

  1: On the start screen, the user is prompted to add their name before the game starts

  2: The player’s name/s are displayed on the board screen during game play

  3: A computer player has been implemented.

          If only one player name is entered;
          the player name that is blank is played by the computer.

          When it's the computer player's turn,
          a setTimeout of 800 milliseconds is used...
           so the computer player's player-label activation can occur.
           This makes it easier for the human player to realize ...
            that the computer is taking it's turn.

          While the computer is taking it's turn,
           mouse-hover and mouse-click events on the Tictactoe boxes...
            are disabled.

            This is so the human player will not click a box by mistake.

            The mouse-hover and mouse-click events on the Tictactoe boxes`
             are enabled when it's the human's turn.

          The computer player will play to win...
           but will also play to bitter end, even if a draw.

           I added both logic and randomness to the computer player.
            The computer will play to win, if possible..
            The computer will block the human from winning.
            But the computer will not always respond that same way...
             to the same scenario.

          When there is more then one block or win possibility...
           a random number generator is used to...
            pick from the possible win or block targets.

          This makes the computer player...
           appear to win or lose 'naturally'.
           without purely 'programmed responses'.

           Since this gives the human player a chance to win...
            it's more fun for the human player.  

  4:  When a player wins...
        that player’s name is displayed in the finish-win screen.

        When a player wins...
              that player’s name is displayed in the finish-win screen.

        when 'play again' is clicked the player names persist
        and the players can continue to play each other

# In future versions....

    I could give the players a choice ...
     of a colors and symbols to use in the game.

    I could also provide a choice to play a series of games
      2 out of 3, 4 out of 5, etc.

    I could also, add code so the computer player 'learns'.
    by saving the state of the gameBoardState table
     at the end of each game, lose or win.
     Then add code to analyze the saved game...
      to reveal which move at which turn can be taken...
      to win, or not lose, that scenario in the future.

    By implementing min-max algorithm,
     I could make the TicTacToe computer player 'smarter'
