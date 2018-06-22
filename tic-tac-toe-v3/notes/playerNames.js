/* on start screen

  // above START button
    // on 25% from left or right margin
      // label 'Type a name for Player O' and directly below an text input
      // same for player

    // on click of start button
      // player name's read into game.playerOName and game.playerXName

  // setupNewGame()
      // if game.playerOName and game.playerXName exits
        // then display game board with Player X's name
           // display game board with Player O's name
           // call playGame()
      // else if only playerX has a name
        // then change playerO label to "to play against computer?
          // if Yes, click START"
          // also, change playerO text inout field to
            // "click here to type a name for Player O"
      // if play against computer prompy displayed and START clicked
       // display game board with Player X's name
          // and "computer" under player O
            // call computerPlayer() and then playGame()
     // if 2 players names submitted
       // then display game board with Player X's name
          // display game board with Player O's name
          // call playGame()
*/

/* game board screen

  // for players name span field
    // use same color for inactive and active player label
  // player's name remains listed when inactive
    // when player label active
      // players name font color changes to same color as player label

  // display game board with Player X's name in <span> under X label
     // and "computer" in <span> under player O's label

  // if 2 players names submitted
    // display game board with Player X's name in <span> under X label
     // and Player O's name in <span> under player O's label

// playGame()
    sends winning player's name to finishGame()
*/

/* finish screen
  display `Winner!, {player's name}!`
*/
