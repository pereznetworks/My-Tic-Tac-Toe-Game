
var tictactoe = (function (exports){

          var exports = {
              needReset: false,
              playerO: 'O',
              playerX: 'X',
              playerOname: '',
              playerXname: '',
              isTurn: 'X',
              isWinner: 'keep playing',
              Ofilled: [],
              Xfilled: [],
              filledBoxes: [],
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
              $boxes: '',
              $boardElmnt: '',
              $startElmnt: '',
              $finishElmnt: '',
              $playerONameInput: '',
              $playerXNameInput: '',
              $playerONameLabel: '',
              $playerXNameLabel: '',

          }; // end exports object

          exports.startGame = function(){
              // startGame called by start screen 'start' button
                // so this is the first game with new players
                // so needReset can be set to false
              this.needReset = false;

              //setup a new game
              this.setupNewGame(this);
              // with-in playGame, toggle isTurn, place appropriate X or O's
              this.playGame(this)
          }; // end startGame() method

          exports.finishGame = function(game){
            let finishGameText = '';
            if (game.isWinner === 'playerX'){
              finishGameText = ` Winner! ${game.playerXName}!`;
              game.$finishElmnt.attr('class', "screen screen-win-two");
            } else if ( game.isWinner === 'playerO' ){
              finishGameText = ` Winner! ${game.playerOName}!`;
              game.$finishElmnt.attr('class', "screen screen-win-one");
            } else {
              finishGameText = `It's a tie!`;
              game.$finishElmnt.attr('class', "screen screen-win-tie");
            }
            $('.message')[0].textContent=finishGameText;
            game.$boardElmnt.hide();
            game.$finishElmnt.show();

            $('#finish .button').click(function(){
              // new Game 'tictactoe'
              // tictactoe.playerO = 'O';
              // tictactoe.playerX = 'X';
              // tictactoe.$liPlayerO = $('#player2');
              // tictactoe.$liPlayerX = $('#player1');
              // tictactoe.$startElmnt = $('#start');
              // tictactoe.$finishElmnt = $('#finish');

              game.needReset = true;
              game.setupNewGame(game);
              game.playGame(game);

            });
          }; // end finishGame() method

          exports.emptyArray = function(arrayToEmpty){

              // doing this inorder to keep a 'clean' environment
              var origArrayLength = arrayToEmpty.length;
              for (var i = origArrayLength; i > 0; i--){
                var bucket = arrayToEmpty.pop();
              }
              return arrayToEmpty;

              // seems there should be a better way to do this...
          };

          exports.setupNewGame = function(game){

            game.$startElmnt.hide();
            game.$finishElmnt.hide();
            game.isWinner = 'keep playing';

            if (game.needReset) {
              // make sure board is cleared for new game
              $('.boxes').children().attr('class', 'box');

              game.$boxes.each(function(){
                this.style.backgroundColor = '';
                this.style.backgroundImage = '';
              });

              game.winRows.forEach(function(item, index){
                item[3] = 'none';
              });

              // make sure array for O and X filled are empty
              game.Ofilled = game.emptyArray(game.Ofilled);
              game.Xfilled = game.emptyArray(game.Xfilled);
              game.filledBoxes = game.emptyArray(game.filledBoxes);

              // reselecting empty $boardElmnt
              game.$boardElmnt = $('#board');
              game.$boardElmnt.show();
              // reset flag
              game.needReset = false;
            } else {
              game.$boardElmnt.show();
              game.$boardElmnt = $('#board');
              // get name for player O
            }


            // make sure isTurn to X player
            game.isTurn = this.playerX;
            // 'visually activate player X' button
            game.$liPlayerX.attr('class', 'players active');
            // now that game is reset, set new game to false

          };

          exports.detectIfWinner = function(game){

            let blockedRows = 0;

            // detect possible win or blocked rows
              // at the end of each player's turn
              // compare current or last box selection
                // if only current player has 1,2 boxes in winning row,
                  // mark with player's name
                  // else mark row as blocked
            if (game.isTurn === game.playerO){
              const OfilledItem = game.Ofilled[(game.Ofilled.length - 1)];
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
               const XfilledItem = game.Xfilled[(game.Xfilled.length - 1)];
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

          exports.playGame = function(game){

            game.$boxes.each(function(index, item){

                $(this).hover(

                  function(){

                    if (this.attributes[0].value === "box"){

                      if (game.isTurn === game.playerO) {
                        this.style.backgroundImage = "url('img/o.svg')";
                        this.style.backgroundColor = '#FFA000';
                      } else {
                        this.style.backgroundImage = "url('img/x.svg')";
                        this.style.backgroundColor = '#3688C3';
                      } // end if active player

                    } // end if class 'box', (is not yet selected)

                  }, function(){

                    if (this.attributes[0].value === "box"){
                        this.style.backgroundImage = "";
                        this.style.backgroundColor = "";
                      } // end if active player
                  }
                );

            });

            // for each box in boxes
              // create an event handler
                // fill box with O or X
                // detect if part or completes winning row, or blocked
                // set X or O as current player
            game.$boxes.each(function(index, item){
              $(this).click(function(){
                if (item.attributes[0].value === "box"){
                    game.filledBoxes.push(index);
                    if (game.isTurn === game.playerO) {
                      game.Ofilled.push(index);
                      item.setAttribute('class', 'box box-filled-1');
                      game.winner = game.detectIfWinner(game);
                      game.isTurn = game.playerX;
                      game.$liPlayerO.attr('class', 'players');
                      game.$liPlayerX.attr('class', 'players active');
                    } else {
                      game.Xfilled.push(index);
                      item.setAttribute('class', 'box box-filled-2');
                      game.winner = game.detectIfWinner(game);
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
              // need to make that can run an IIFE module...
                // then set and use methods from that IIFE module
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

          $(document).ready(function() {

            $('#playerO').change(function(){
              exports.playerOName = $(this)[0].value;
              $('#player1Name')[0].textContent = exports.playerOName;
            });

            // get name for player O
            $('#playerX').change(function(){
              exports.playerXName = $(this)[0].value;
              $('#player2Name')[0].textContent = exports.playerXName;
            });

            $('#start .button').click(function(){
              // new Game
              exports.playerO = 'O';
              exports.playerX = 'X';
              exports.$liPlayerO = $('#player1');
              exports.$liPlayerX = $('#player2');
              exports.$boxes = $('li.box');
              exports.$boardElmnt = $('#board');
              exports.$startElmnt = $('#start');
              exports.$finishElmnt = $('#finish');
              exports.$playerONameInput = $('#playerO');
              exports.$playerXNameInput = $('#playerX');
              exports.$playerONameLabel = $('#player1Name');
              exports.$playerXNameLabel = $('#player2Name');

              exports.startGame();

            });

          });

          return exports

}(tictactoe || { }) );
