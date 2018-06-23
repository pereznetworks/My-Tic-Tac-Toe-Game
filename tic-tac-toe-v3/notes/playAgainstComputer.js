/* TODO: basic steps to add functionality for "playing against the computer"

  // add to playGame()
    // if choosing to play against computer
      // execute computerPlayer()
       if (playerXComputer == true  || playerOComputer == true) {
        computerPlayer(game);
       }

    computerPlayer(game)

     if (game.playerXComputer == true) {
          computerPlayer.isTurn = playerX;
        } else if (game.playerOComputer == true) {
          computerPlayer.isTurn = playerO;
      }

      if (game.isTurn === computerPlayer.isTurn) {
        takeTurn(game);
      }

      takeTurn(game){

      // to make it appear that computer player is thinking
      // x-svg or o-svg appears to hover (appear and disappear ) over several of the empty boxes, with 1000 millisecond time intervals

        let randomBoxNumber = Math.floor(Math.random() * 9);
        game.filledBoxes.forEach(function (index, item){
          if (index !== randomBoxNumber) {
              if (computerPlayer.isTurn === game.playerO) {
                game.$boxes[randomBoxNumber].style.backgroundImage = "url('img/o.svg')";
                game.$boxes[randomBoxNumber].style.backgroundColor = '#FFA000';
              } else {
                game.$boxes[randomBoxNumber].style.backgroundImage = "url('img/x.svg')";
                game.$boxes[randomBoxNumber].style.backgroundColor = '#3688C3';
              } // end if active player
              setTimeout(function(game, lastRandomBoxNumber){
                game.$boxes[randomBoxNumber].style.backgroundImage = "";
                game.$boxes[randomBoxNumber].style.backgroundColor = "";
              }, 1000);
          } // end if box is not yet selected

        }); // each forEach filledBoxes

      // need to detail rules, logic for computerPlayer() to choose best move

        // for each of the winRows
          // are any set to computer player-w2
            // then
              // if so which box in winning row is empty
                  select emnpty box in winning row for a win
          // else if any are winnning rows any set to opponent player -w2
              // then
              // if so which boxes in winning row match filledBoxes
                 // select empty box in winning row

         // are any set to computer player-w1
           // then
             // if so which box in winning row is empty
                 select emnpty box w2
         // else if any winnning rows any set to opponent player-w1
          // then
            // if so which boxes in winning row match filledBoxes
              // select empty box in opponent player's winning row, for a block

         // else if any are set to computer player-w1
           // then
             // if so which box in winning row is empty
                // then
                  // if that empty box part of opponent player's winning rows
                      // then select that empty box for a block and -w2
                  // else
                    // select empty box in opponent player's winning row, for a block



      // computer player selects a box, uses game.playgame or similar code to
        // place fill selected box with o.svg

      // computerPlayer() set game.isTurn back to "playerX"
      // computerPlayer passed updated arrays, object back to tictactoe()
          // i.e, Xfilled array, filledBoxes array and winRow
      }


*/
