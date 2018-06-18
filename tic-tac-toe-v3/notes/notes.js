
 /* game rules

       //TODO: detect when a box is filled and by O or X
       // $('.boxes')[0].children[index].attributes[0].value
          // == "box box-filled-1" or "box box-filled-2"

       // -- OR --

       //TODO: track which item/index of $boxes are filled
       // if true
          // O-filled.push(index) or  X-filled.push(index)

       //TODO: track and respond to game state
         // detect a win
           // when one player filles in 3rd box in a row
           // each player must have taken more than 2 turns to win
            // 3 boxes filled by one player
             // must match a winning row
              // across, up/down, side-to-side
           // player can only win on thier turn
            // because player must choose to select
              // the 3rd box, to complete the row of 3 boxes


        //TODO: detect a block
          // when a possible winning row is no longer possible
            // when player1 has
               // chosen 1 or 2 out of a winning row
                  // player2 choses 1 or 2 of same winning row

       //TODO: detect a draw
          // when all boxes are filled and there is no winner
            // when all possible winning rows are no longer possible
                // first player can only take 5 turns, 2nd can only take 4

       //TODO: show game finish
         // finish div will show either who won or that there was a draw
*/

/*  draft to detect a winner

// as game progresses,....
  // O and X filled boxes numbers are stored
  // compared to each possible winning row array of boxes
    // if any match, a box in a winning row,
      // if [4]value of array set opposing player
         // then set to block
      // if [4]value not set to opposing player and not blocked
         // then [4]value of array set to current player
      // if [4]value of array already set to current player
         // player-w2, -w3 or -winner

 // after each player's turn
    // if current player has winning row array [4] set to winner
    // return that winning row array, including name of winner
    // or
    // append  winning row array, including name of winner
      // to game.winner array

*/

// 1st draft of detectIfWinner() function

detectIfWinner(game, Ofilled, Xfilled, filledBoxes){

  let blockedRows = 0;

  Ofilled.forEach(function(OfilledItem, OfilledIndex){
    // for each OfilledItem
    winRows.forEach(function(winRowItem, winRowIndex){
      // iterate each item of possible winning rows
      winRowItem.forEach(function(rowItem, rowIndex){
        if (rowItem == OfilledItem){
          game.winner.O.push(OfilledItem);
        } // if any match, store that box's number
      });
    });
  });
   Xfilled.forEach(function(XfilledItem, XfilledIndex){
     // for each XfilledItem
     winRows.forEach(function(winRowItem, winRowIndex){
       // iterate each item of possible winning rows
       winRowItem.forEach(function(rowItem, rowIndex){
         if (rowItem == XfilledItem){
           game.winner.X.push(XfilledItem);
         } // if any match, store that box's number
       });
     });
   });

  if (game.winner.X.length === 3){
    return "playerX";
  } else if (game.winner.O.length === 3){
    return "playerO";
  } else if (filledBoxes.length === 9){
    return "draw";
  } else {
    return "keep playing"
  }

} // end detectIfWinner()

// 2nd draft of detectIfWinner() function

const detectIfWinner = function(game, Ofilled, Xfilled, boxesFilled){

  let blockedRows = 0;

  if (game.isTurn === game.playerO){
    Ofilled.forEach(function(OfilledItem, OfilledIndex){
      // for each OfilledItem
      game.winRows.forEach(function(winRowItem, winRowIndex){
        // iterate each item of possible winning rows
        winRowItem.forEach(function(rowItem, rowIndex){
          if (rowItem == OfilledItem && winRowItem[4] == 'p0-w3'){

              game.winRows[rowIndex][4] = 'pO-winner';

          } else if ( rowItem == OfilledItem && winRowItem[4] == 'p0-w2'){

               game.winRows[rowIndex][4] = 'pO-w3';

          } else if ( rowItem == OfilledItem && winRowItem[4] == 'pO-1'){

               game.winRows[rowIndex][4] = 'pO-w2';

          } else if (rowItem == OfilledItem
              && winRowItem[4] !== 'pX-1'
              && winRowItem[4] !== 'blocked'){

               game.winRows[rowIndex][4] = 'pO-w1';

          } else {

               game.winRows[rowIndex][4] = 'blocked';

          }
        });
      });
    });
  } else {
     Xfilled.forEach(function(XfilledItem, XfilledIndex){
       // for each XfilledItem
       game.winRows.forEach(function(winRowItem, winRowIndex){
         // iterate each item of possible winning rows
         winRowItem.forEach(function(rowItem, rowIndex){
           if (rowItem == XfilledItem
               && winRowItem[4] == 'pX-w3'){

               game.winRows[rowIndex][4] = 'pX-winner';

           } else if ( rowItem == XfilledItem
               && winRowItem[4] == 'pX-w2'){

               game.winRows[rowIndex][4] = 'pX-w3';

           } else if ( rowItem == XfilledItem
               && winRowItem[4] == 'pX-w1'){

               game.winRows[rowIndex][4] = 'pX-w2';

           } else if (rowItem == XfilledItem
               && winRowItem[4] !== 'pO-w1'
               $$ winRowItem[4] !== 'pO-w2'
               && winRowItem[4] !== 'blocked'){

              game.winRows[rowIndex][4] = 'pX-w1';

           } else {

              game.winRows[rowIndex][4] = 'blocked';

           }
         });
       });
     });
  }

  // at end of each players turn
    // test if any player has a winning row
  if (game.isTurn === 'playerX') {

    game.winRows.forEach(function(winRowItem, winRowIndex){
      // iterate each item of possible winning rows
      if (winRowItem[4] === 'pX-winner'){
          game.winner.push(winRowItem);
       }
     });
  } else if (game.isTurn === 'playerO'){

    game.winRows.forEach(function(winRowItem, winRowIndex){
      // iterate each item of possible winning rows
      if (winRowItem[4] === 'pO-winner')
          game.winner.push(winRowItem);
    });
  }

  // test for how many blocked rows
    game.winRows.forEach(function(winRowItem, winRowIndex){
      // iterate each item of possible winning rows
      if (winRowItem[4] === 'blocked') {
          blockedRows += 1;
        }
    });

    if (blockedRows == 8){
        // if all rows blocked, then game is a draw
      game.winner.push('draw');
    }

};



// strategy test :
// as the game progresses,
//  possible winning rows can be excluded
//    add excluded, blocked or X, O to winRows arrays
//
// game play senario 1: draw detectable before last box filled
//
// track boxes chosen by player
//   Xfilled:[4,2,7,3]
//   Ofilled:[8,6,1]
// keeps order that boxes are chosen
//    boxesFilled:[4,8,3,6,7,1,3,5]
//
// const winRows {  // possible winning rows
//     across1:[0,1,2,blocked],
//     across2:[3,4,5,blocked],
//     across3:[6,7,8,blocked],
//     down1:[0,3,6,blocked],
//     down2:[1,4,7,blocked],
//     down3:[2,5,8,blocked],
//     diagonal:[0,4,8,blocked],
//     diagonal:[2,4,6,blocked],
//   };
//
// game play senario 2: playerO wins with across2
//    add excluded, blocked or X, O to winRows arrays
//
// track boxes chosen by player
//   Xfilled:[0,2,7,6]
//   Ofilled:[4,1,5,3]
// keeps order that boxes are chosen
//    boxesFilled:[0,4,1,7,5,6,3]
//
// const winRows {  // possible winning rows
//     across1:[0,1,2,blocked],
//     across2:[3,4,5,playerO],
//     across3:[6,7,8,],
//     down1:[0,3,6,],
//     down2:[1,4,7,blocked],
//     down3:[2,5,8,blocked],
//     diagonal:[0,4,8,blocked],
//     diagonal:[2,4,6,blocked]
//   };
