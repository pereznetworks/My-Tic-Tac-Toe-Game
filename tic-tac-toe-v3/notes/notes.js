// bug: boxes can be selected after already filled

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
           // when one player gets 3 boxes in a row;
           // each player must have taken more than 2 turns to win
            // 3 boxes filled must match a winning row
              // across, up/down, side-to-side

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

            // passed to detect winner function
            game.winner:[]
            Ofilled:[]
            Xfilled:[]
            boxesFilled:[]

            const winRows {  // possible winning rows
                across1:[0,1,2],
                across2:[3,4,5],
                across3:[6,7,8],
                across4:[2,1,0],
                across5:[5,4,3],
                across6:[8,7,6],
                down1:[0,3,6],
                down2:[1,4,7],
                down3:[2,5,8],
                up1:[6,3,0],
                up2:[7,4,1],
                up3:[8,5,2],
                diagonal:[0,4,8],
                diagonal:[2,4,6],
                diagonal:[8,4,0],
                diagonal:[6,4,2]
              };

          // this following nested forEach needs work....
            // O and X filled boxes numbers are compared
              // with possible winning row box numbers
                // if any match, each match is stored multiples times

          // change to match game rules

              Ofilled.forEach(function(OfilledItem, OfilledIndex){
                // for each OfilledItem
                winRows.forEach(function(winRowItem, winRowIndex){
                  // iterate each item of possible winning rows
                  winRowItem.forEach(function(rowItem, rowIndex){
                    if (rowItem == OfilledItem){
                      game.winner.O.push(OfilledItem);
                    }
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
                     }
                   });
                 });
               });

*/


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
//     across1:[0,1,2,excluded],
//     across2:[3,4,5,blocked],
//     across3:[6,7,8,blocked],
//     across4:[2,1,0,excluded],
//     across5:[5,4,3,excluded],
//     across6:[8,7,6,blocked],
//     down1:[0,3,6,,excluded],
//     down2:[1,4,7,blocked],
//     down3:[2,5,8,blocked],
//     up1:[6,3,0,,excluded],
//     up2:[7,4,1,blocked],
//     up3:[8,5,2,excluded],
//     diagonal:[0,4,8,blocked],
//     diagonal:[2,4,6,excluded],
//     diagonal:[8,4,0,excluded],
//     diagonal:[6,4,2,excluded]
//   };
//
// game play senario 2:
//    add excluded, blocked or X, O to winRows arrays
//
// track boxes chosen by player
//   Xfilled:[]
//   Ofilled:[]
// keeps order that boxes are chosen
//    boxesFilled:[]
//
// const winRows {  // possible winning rows
//     across1:[0,1,2,],
//     across2:[3,4,5,],
//     across3:[6,7,8,],
//     across4:[2,1,0,],
//     across5:[5,4,3,],
//     across6:[8,7,6,],
//     down1:[0,3,6,],
//     down2:[1,4,7,],
//     down3:[2,5,8,],
//     up1:[6,3,0,],
//     up2:[7,4,1,],
//     up3:[8,5,2,],
//     diagonal:[0,4,8,],
//     diagonal:[2,4,6,],
//     diagonal:[8,4,0,],
//     diagonal:[6,4,2,]
//   };
