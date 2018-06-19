
var tictactoe = (function (exports){

          var exports = {
              playerO: 'O',
              playerX: 'X',
              isTurn: 'X',
              winRows: [  // possible winning rows
                  [0,1,2,'none'],
                  [3,4,5,'none'],
                  [6,7,8,'none'],
                  [0,3,6,'none'],
                  [1,4,7,'none'],
                  [2,5,8,'none'],
                  [0,4,8,'none'],
                  [2,4,6,'none'],
                ],
              $liPlayerX: '',
              $liPlayerO: '',
              $boardElmnt: '',
              $startElmnt: '',
              $finishElmnt: '',

          }; // end exports object

          exports.startGame = function(){
              // hide start div and show game board
              this.$startElmnt.hide();
              this.$finishElmnt.hide();
              this.$boardElmnt.show();
              // set isTurn to X player
              this.isTurn = this.playerX;
              this.$liPlayerX.attr('class', 'players active');

              // with-in playGame, toggle isTurn, place appropriate X or O's
              this.playGame($('li.box'), this)
          }; // end startGame() method

          exports.finishGame = function(game){
            let finishGameText = '';
            if (game.isWinner === 'playerX'){
              finishGameText = `The winner is ${game.isWinner}!`;
              game.$finishElmnt.attr('class', "screen screen-win-two");
            } else if ( game.isWinner === 'playerO' ){
              finishGameText = `The winner is ${game.isWinner}!`;
              game.$finishElmnt.attr('class', "screen screen-win-one");
            } else {
              finishGameText = `OOOH! and it's draw folks!`;
              game.$finishElmnt.attr('class', "screen screen-win-tie");
            }
            $('.message')[0].textContent=finishGameText;
            this.$boardElmnt.hide();
            this.$finishElmnt.show();
          }; // end finishGame() method

          // 3rd draft of detectIfWinner() function

          exports.detectIfWinner = function(game, Ofilled, Xfilled, boxesFilled){

            let blockedRows = 0;

            // detect possible win or blocked rows
              // at the end of each player's turn
              // compare current or last box selection
                // if only current player has 1,2 boxes in winning row,
                  // mark with player's name
                  // else mark row as blocked
            if (game.isTurn === game.playerO){
              const OfilledItem = Ofilled[(Ofilled.length - 1)];
                // for current box selection, last element in Ofilled array
                game.winRows.forEach(function(winRowItem, winRowIndex){
                  // iterate each item of each set of possible winning rows
                  let currentWinRowIndex = winRowIndex;
                  winRowItem.forEach(function(rowItem, rowIndex){
                    // if any match, test for row blocked,
                      // if is still a possible win or if row is a winner
                    if (rowItem === OfilledItem && winRowItem[3] === 'pO-w2'){

                        game.winRows[currentWinRowIndex][3] = 'pO-winner';

                    } else if ( rowItem === OfilledItem && winRowItem[3] === 'pO-w1'){

                         game.winRows[currentWinRowIndex][3] = 'pO-w2';

                    } else if (rowItem === OfilledItem
                        && winRowItem[3] === 'none'){

                         game.winRows[currentWinRowIndex][3] = 'pO-w1';

                    } else if (rowItem === OfilledItem){

                         game.winRows[currentWinRowIndex][3] = 'blocked';

                    }
                  });
                });

            } else {
               const XfilledItem = Xfilled[(Xfilled.length - 1)];
                 // for current box selection, last element in Ofilled array
                 game.winRows.forEach(function(winRowItem, winRowIndex){
                   // iterate each item of each set of possible winning rows
                   let currentWinRowIndex = winRowIndex;
                   winRowItem.forEach(function(rowItem, rowIndex){
                     // if any match, test for row blocked,
                       // if is still a possible win or if row is a winner
                     if (rowItem === XfilledItem
                         && winRowItem[3] === 'pX-w2'){

                         game.winRows[currentWinRowIndex][3] = 'pX-winner';

                     } else if ( rowItem === XfilledItem
                         && winRowItem[3] === 'pX-w1'){

                         game.winRows[currentWinRowIndex][3] = 'pX-w2';

                     } else if (rowItem === XfilledItem
                         && winRowItem[3] === 'none'){

                        game.winRows[currentWinRowIndex][3] = 'pX-w1';

                     } else if (rowItem === XfilledItem){

                        game.winRows[currentWinRowIndex][3] = 'blocked';

                     }
                   });
                 });

            } // end if forEach to detect possible win or blocked row


            // to simpilify placed this if/else byiteslf
               // at end of each players turn
              // test if any player has a winning row
            if (game.isTurn === 'X') {

              game.winRows.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'pX-winner'){
                    game.isWinner = 'playerX';
                 }
               });
            } else if (game.isTurn === 'O'){

              game.winRows.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'pO-winner')
                    game.isWinner = 'playerO';
              });
            } // end of a player as won

            // test for how many blocked rows
              game.winRows.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'blocked') {
                    blockedRows += 1;
                  }
              });  // end forEach to count blocked rows

              if (blockedRows == 8){
                  // if all rows blocked, then game is a draw
                game.isWinner = "draw";
              } // end if blocked rows = 8

          }; // end detectIfWinner() method

          exports.playGame = function($boxes, game){

            const Ofilled = [];
            const Xfilled = [];
            const filledBoxes = [];

            // for each box in boxes
              // create an event handler
                // fill box with O or X
                // detect if part or completes winning row, or blocked
                // set X or O as current player
            $boxes.each(function(index, item){
              $(this).click(function(){
                if (item.attributes[0].value === "box"){
                    filledBoxes.push(item);
                    if (game.isTurn === game.playerO) {
                      Ofilled.push(index);
                      item.setAttribute('class', 'box box-filled-1');
                      game.winner = game.detectIfWinner(game, Ofilled, Xfilled, filledBoxes);
                      game.isTurn = game.playerX;
                      game.$liPlayerO.attr('class', 'players');
                      game.$liPlayerX.attr('class', 'players active');
                    } else {
                      Xfilled.push(index);
                      item.setAttribute('class', 'box box-filled-2');
                      game.winner = game.detectIfWinner(game, Ofilled, Xfilled, filledBoxes);
                      game.isTurn = game.playerO;
                      game.$liPlayerX.attr('class', 'players');
                      game.$liPlayerO.attr('class', 'players active');
                    } // end if active player

                  if (game.isWinner === 'playerX' || game.isWinner === 'playerO' || game.isWinner === 'draw' ) {
                    game.finishGame(game);
                  }
                }
              }); // end box click event handler

            }); // end each function for boxes

          }; // end playGame() method

          /* TODO: convert to IIFE
          */

          /* TODO: after completion of first, start new game
              rest game object values
              or
              create new game object
          */

          /* TODO: play against the computer
              // computer plays O, player is X and goes first
              // use a random Number generator
              // track filled boxes
              // compare against sets of winning row's box numbers
              // filter for randon numbers that :
              //     block winning row by player
              //     place box in row for winning row
              // use random number as index in boxes.each function
              // if player does have a potential winning row
              //      block winning row by other player
              // else
              //      place sqaure in row for winning row

          */

          /* TODO: player's name
              // allow player's to type in a name
              // finish div will show winner's name
          */

          return exports

}(tictactoe || { }) );

$(document).ready(function() {

        $('#start .button').click(function(){
          // new Game 'tictactoe'
          tictactoe.playerO = 'O';
          tictactoe.playerX = 'X';
          tictactoe.$liPlayerO = $('#player2');
          tictactoe.$liPlayerX = $('#player1');
          tictactoe.$boardElmnt = $('#board');
          tictactoe.$startElmnt = $('#start');
          tictactoe.$finishElmnt = $('#finish');

          tictactoe.startGame();

        });

});
