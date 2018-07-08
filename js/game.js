"use strict";

var tictactoe = (function (exports){

        var exports = {
            needReset: false,
            setNewPlayers: false,
            playerO: 'O',
            playerX: 'X',
            playerOName: '',
            playerXName: '',
            playerOComputer: false,
            playerXComputer: false,
            computerTurnComplete: false,
            isTurn: 'X',
            isWinner: 'keep playing',
            Ofilled: [],
            Xfilled: [],
            filledBoxes: [],
            winRowsProgress: [
                [[0,'E'],[1,'E'],[2,'E'],'none'],  // 0
                [[3,'E'],[4,'E'],[5,'E'],'none'],  // 1
                [[6,'E'],[7,'E'],[8,'E'],'none'],  // 2
                [[0,'E'],[3,'E'],[6,'E'],'none'],  // 3
                [[1,'E'],[4,'E'],[7,'E'],'none'],  // 4
                [[2,'E'],[5,'E'],[8,'E'],'none'],  // 5
                [[0,'E'],[4,'E'],[8,'E'],'none'],  // 6
                [[2,'E'],[4,'E'],[6,'E'],'none'],  // 7
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

          exports.computer = {
              turnComplete: false,
              moveNo: 0,
              player: '',
              opponent: '',
              cpBoxFilledClass: '',
              opponentBoxFilledClass: '',
              possibleWinners: {
                center: [4],
                corners: [0,2,6,8],
                sides: [1,3,5,7]
              },
          };

          exports.trackFilledBoxes = function(game, selectedBoxNumber, selectedBy){


              // first figure out who the active player is
              let activePlayer = '';
              let inactivePlayer = '';
              if (game.isTurn === game.playerX){
                activePlayer = 'X';
                inactivePlayer = 'O';
              } else {
                activePlayer = 'O';
                inactivePlayer = 'X';
              }

              // as the game progresses, track who fills each box
              // who has a potential winning row, which rows are blocked
              // if the active player has just gotten a 3 in a row, or a winner

              game.winRowsProgress.forEach(function(itemArray, itemArrayIndex){
                  // each item is an itemArray has 4 items,
                  // 0,1 and 2 are arrays,
                  // item 3 is a string, which player 1 or 2 boxes selected
                  itemArray.forEach(function(rowItem, indexofRowItem){
                       // skip condition test for indexofRowItem 3,
                       // which is not an array
                    if (indexofRowItem < 3) {
                      // each rowItem is an array
                       // has a 2 elements, a box# and a char; E, X, or O
                      if (rowItem[0] == selectedBoxNumber) {
                        // if box # = selected boxNumber
                        rowItem[1] = selectedBy;
                        if( itemArray[3] == `p${activePlayer}-w2` ){
                            // and if active player has 2 boxes in this row
                            itemArray[3] = `${activePlayer}-winner`;
                            // then this row is a winner
                          } else if ( itemArray[3] == `p${inactivePlayer}-w2` ) {
                            // else if inactive player has 2 in boxes in this row
                            itemArray[3] = `blocked`;
                            // then marked it as blocked
                          } else if( itemArray[3] === `p${activePlayer}-w1`){
                            // else if active player already has 1 box in this row
                            itemArray[3] = `p${activePlayer}-w2`;
                            // then label it a row for active player, -w2
                        } else if ( itemArray[3] == `p${inactivePlayer}-w1` ) {
                          // else if inactive player has 1 in boxes in this row
                          itemArray[3] = `blocked`;
                          // then marked it as blocked
                        } else if ( itemArray[3] == `none` ){
                            // if no one has boxes in this row
                            itemArray[3] = `p${selectedBy}-w1`;
                            // then label it a row for active player, -w1
                        }
                      }
                    }

                  });
              });


          };// end trackFilledBoxes() method

          exports.emptyArray = function(arrayToEmpty){

            // utility to empty all arrays used during a game
            // seems there should be a better way to do this...

            let origArrayLength = arrayToEmpty.length;
            for (var i = origArrayLength; i > 0; i--){
              var bucket = arrayToEmpty.pop();
            }
            return arrayToEmpty;

          }; // end emptyArray()

          exports.findTargetBox = function(game, computerORplayer, noBoxesInRow){

            // called by computerPlayer() as part of choosing best move,
            // find empty box in computer or players's winning row

            // required paramters:
            // game object
            // computerORplayer; string for 'O' or 'X'
            // noBoxesInRow; string
               // for '-w2' for 2 in a row
               // or '-w1' for 1 in a row


            const isTargetBox = 'E';  // any empty, 'E', box is a target for block or a  win
            const targets = [];  // array for target boxes

            game.winRowsProgress.forEach(function(rowItem, rowIndex){
                // does computer or player have 1 or 2 boxes in any row
                 if (rowItem[3] == `p${computerORplayer}-${noBoxesInRow}`){
                   // iterate through that row,
                    rowItem.forEach(function(rowItemArray, rowItemIndex){
                    // find empty box
                      if (rowItemArray[1] == isTargetBox){
                         // choose box represented by rowItemArray[0]
                         targets.push(rowItemArray[0]);
                       }  // end if == isTargetBox
                  }); // end forEach rowItem
                } // if computer or player has winning row
            }); // end for winRowsProgress

            return targets;

          }; // end findTargetBox() function

          exports.detectIfWinner = function(game){

            let blockedRows = 0;

            // count blocked rows
            game.winRowsProgress.forEach(function(winRowItem, winRowIndex){
              if (winRowItem[3] == 'blocked'){
                blockedRows += 1;
              }
            });  // end forEach to count blocked rows

            // test if any player has a winning row
            if (game.isTurn === 'X') {

              game.winRowsProgress.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'X-winner'){
                    game.isWinner = 'playerX';
                 }
               });
            } else if (game.isTurn === 'O'){

              game.winRowsProgress.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'O-winner')
                    game.isWinner = 'playerO';
              });
            }

            if (blockedRows == 8 && game.filledBoxes.length == 9){
                  // if all rows blocked, and all boxes have been filled, then game is a draw
                game.isWinner = "draw";
              } // end if blocked rows = 8

          }; // end detectIfWinner() method

          exports.takeTurn = function(indexNoOfSelectedBox, itemNoOfSelectedBox, game){

            // fill in box for player O or X
            // after each turn
                // detectIfWinner()
                // isGameOver()
            if (game.isTurn === game.playerO) {
              game.trackFilledBoxes(game, indexNoOfSelectedBox, game.isTurn);
              game.Ofilled.push(indexNoOfSelectedBox);
              itemNoOfSelectedBox.setAttribute('class', 'box box-filled-1');
              game.winner = game.detectIfWinner(game);
              if (game.playerOComputer == true){
                setTimeout(game.isGameOver, 400, game);
              } else {
                game.isGameOver(game);
              }
            } else {
              game.trackFilledBoxes(game, indexNoOfSelectedBox, game.isTurn);
              game.Xfilled.push(indexNoOfSelectedBox);
              itemNoOfSelectedBox.setAttribute('class', 'box box-filled-2');
              game.winner = game.detectIfWinner(game);
              if (game.playerXComputer == true){
                setTimeout(game.isGameOver, 400, game);
              } else {
                game.isGameOver(game);
              }
            } // end if game.isTurn

          }; // end takeTurn()

          exports.isGameOver = function(game){
            // after each turn is taken, do we have a winner ...or is game a draw
            if (game.isWinner === 'playerX' || game.isWinner === 'playerO' || game.isWinner === 'draw' ) {
              game.finishGame(game);
            } else { // (game.isWinner = 'keep playing') : game is NOT over...
              if (game.isTurn == game.playerO){  // then set isTurn to other player
              game.isTurn = game.playerX;
              game.$liPlayerO.attr('class', 'players');
              game.$liPlayerX.attr('class', 'players active');
            } else if (game.isTurn == game.playerX){
              game.isTurn = game.playerO;
              game.$liPlayerX.attr('class', 'players');
              game.$liPlayerO.attr('class', 'players active');
            }
            }
          };  // end isGameOver()

          exports.playGame = function(game){

            // 'O' or 'X' appears to follow player's mouse around tictactoe game board
            game.$boxes.each(function(index, item){
                $(this).hover(  // when the mouse hovers over a box...
                  function(){ // execute this function
                    // if box is not selected, (or is empty)
                    if (this.attributes[0].value === "box"){
                      // if it's playerO's turn ..
                      if (game.isTurn === game.playerO && game.playerOComputer == false) {
                        // playerO's symbol appears...
                        this.style.backgroundImage = "url('img/o.svg')";
                        this.style.backgroundColor = '#FFA000';
                      } else if (game.isTurn === game.playerX && game.playerXComputer == false){
                        // else playerX's symbol appears...
                        this.style.backgroundImage = "url('img/x.svg')";
                        this.style.backgroundColor = '#3688C3';
                      } // end if game.isTurn
                    } // end if this.attributes[0].value === "box"
                  },// end hover if class 'box', (is not yet selected)
                   function(){
                    // "X" or "O" disappears when mouse moves away from box
                    if (this.attributes[0].value === "box"){
                        this.style.backgroundImage = "";
                        this.style.backgroundColor = "";
                      } // end if active player
                  }
                );
            }); // end mouse hover event

            // for each box on tictactoe board
                if (game.isTurn !== game.computer.player){
                  game.$boxes.each(function(index, item){
                    $(this).click(function(){
                      if (item.attributes[0].value === "box"){ // if not filled in yet
                          // store box number that was clicked
                          game.filledBoxes.push(index);
                          // fill in chosen box with X or O depending on game.isTurn ...
                          game.takeTurn(index, item, game);
                          // if either below is true, start computer player
                          if (game.playerXComputer == true || game.playerOComputer == true && game.isWinner === 'keep playing'){
                            game.computer.computerPlay(game);
                          } // end if (computer is playing and game is NOT over)
                      } // end if (if box not filled in yet)
                    }); // end box click event handler
                  }); // end forEach tictactoe boxes
                } // end if (it's not computer player's turn)

          }; // end playGame() method

          exports.finishGame = function(game){
            // show winner, or draw
            let finishGameText = '';
            if (game.isWinner === 'playerX'){
              finishGameText = ` ${game.playerXName}!`;
              game.$finishElmnt.attr('class', "screen screen-win-two");
            } else if ( game.isWinner === 'playerO' ){
              finishGameText = ` ${game.playerOName}!`;
              game.$finishElmnt.attr('class', "screen screen-win-one");
            } else {
              finishGameText = `It's a tie!`;
              game.$finishElmnt.attr('class', "screen screen-win-tie");
            }
            $('.message')[0].textContent=finishGameText;
            game.$boardElmnt.hide();
            game.$finishElmnt.show();

            // if 'play again' button clicked, just reset game, show empty tictactoe board
            $('#resetGame').click(function(){

              game.needReset = true;
              game.setupNewGame(game);
              game.playGame(game);

            });

            // if 'new game, different players', reset game, reset player names, back to start screen
            $('#newPlayers').click(function(){

              game.setNewPlayers = true;
              game.needReset = true;
              game.playerOName = '';
              game.playerXName = '';
              game.setupNewGame(game);
            });
          }; // end finishGame() method

          exports.setupNewGame = function(game){

            if (game.needReset) { // make sure board is cleared for new game

              //reset styling of boxes to original or 'empty'
              $('.boxes').children().attr('class', 'box');

              game.$boxes.each(function(){  // just to be sure...
                this.style.backgroundColor = '';
                this.style.backgroundImage = '';
              }); // reset each box background Color and Image style to 'empty'

              game.winRowsProgress.forEach(function(winRowArray, indexWinRowArray){

                  winRowArray.forEach(function(itemArray, indexOfItemArray){
                    if (indexOfItemArray < 3){
                     itemArray[1] = 'E';
                    }
                  });
                  winRowArray[3] = 'none';
              }); //reset array used track progress of winning rows

              // make sure each array for O and X filled are empty
              game.Ofilled = game.emptyArray(game.Ofilled);
              game.Xfilled = game.emptyArray(game.Xfilled);
              game.filledBoxes = game.emptyArray(game.filledBoxes);
              game.computer.moveNo = 0;


              // now that game is reset, set needReset to false
              game.needReset = false;

            } else { // if this is not a reset, but the FIRST game...

              if (!game.playerOName) {  // if one of the player inputs is blank
                // if player O name input blank, then setup computer to play O
                game.computer.player = game.playerO;
                game.computer.cpBoxFilledClass = 'box box-filled-1';
                game.computer.opponent = game.playerX;
                game.$playerONameLabel[0].textContent = 'the computer';
                game.playerOName = 'the computer';
                game.playerOComputer = true;

              } else if (!game.playerXName) {
                // if playerX name input is blank setup computer to play X
                game.computer.player = game.playerX;
                game.computer.cpBoxFilledClass = 'box box-filled-2';
                game.computer.opponent = game.playerO;
                game.$playerXNameLabel[0].textContent = 'the computer';
                game.playerXName = 'the computer';
                game.playerXComputer = true;
              }

            } // end if(game.needReset)


            if (!game.setNewPlayers){
              // if NOT setting new players,
              game.$boardElmnt.show(); // reset game board
              game.$boardElmnt = $('#board');  // reselect emptied game board element
              game.isTurn = this.playerX; // make sure isTurn to X player

              // visually activate player X's label and de-activate player O label
              game.$liPlayerO.attr('class', 'players');
              game.$liPlayerX.attr('class', 'players active');
              // hide start and finish screens
              game.$startElmnt.hide();
              game.$finishElmnt.hide();
              // start game
              game.isWinner = 'keep playing';
              game.playGame(game);

            } else { // else if setting new players
              // hide game board and finish screen
              game.$boardElmnt.hide();
              game.$finishElmnt.hide();
              // reset player names
              $('#playerO')[0].value = '';
              $('#playerX')[0].value = '';

              game.$startElmnt.show(); // show start screen
              game.setNewPlayers = false; // reset flag to false

            } // end if (!game.setNewPlayers)



          }; // end setupNewGame()

          exports.startGame = function(){ // startGame called by start screen 'start' button
              // first game with new players, needReset can be set to false
              this.needReset = false;
              //setup a new game
              this.setupNewGame(this);
          }; // end startGame() method

          exports.computer.computerPlay = function(game){


            const decideMove = function(game){

              // calc move to make,
              // test for how many boxes in a row opponent has
              // 1 in a winning row, w1
              // 2 in a winning row, w2

              let possibleTargets = '';
              possibleTargets = game.computer.analyzeGameBoard(game, 'w2', 'w2');
              // which empty boxes are targets to block opponent from completing 3 in a row
              // and which empty boxes are targets for computyer to complete 2 in a row

              if (possibleTargets.possibleWins[0].length > 0){
                // if target for computer to complete 3 in a row
                  makeWinMove(game, possibleTargets);
                  // play it, for a win

              } else if(possibleTargets.possibleBlocks[0].length > 0){
                // else if target to block opponent from completing 3 in a row
                 makeBlockMove(game, possibleTargets);
                 // block it

               } else {

                 let possibleTargetsW1 = '';
                 possibleTargetsW1 = game.computer.analyzeGameBoard(game, 'w1', 'w1');
                 // which empty boxes are targets to block opponent from getting 2 in a row
                 // and which are targets to get 2 in a row

                 if (possibleTargetsW1.possibleWins[0].length > 0){
                   // if target for computer to get 2 in a row
                     makeWinMove(game, possibleTargetsW1);
                     // play it

                  } else if(possibleTargetsW1.possibleBlocks[0].length > 0){ // if opponent has a w2
                    // else if target to block opponent from getting 2 in a row
                     makeBlockMove(game, possibleTargetsW1);
                     // block it

                   }

               }// end if/else win or block
            };

            const makeBlockMove = function(game, possibleTargets){

               const targetBoxes = [];
               game.computer.possibleWinners.center.forEach(function(centerItem, centerIndex){
                 possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                  // itrate through target boxes,
                     if(centerItem == ptItem){
                       // select center box if empty
                        targetBoxes.push(ptItem);
                        // add to targetBoxes to played
                       }
                 }); // end for center box
               }); // end for possibleWinners.center


                if(targetBoxes.length == 0){ // if center box is not empty

                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes,
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer w1 to for a w2
                          targetBoxes.push(ptItem);
                          // add to targets to play for a block
                        }
                    }); // end for each corner box
                  }); // end for possibleWinners.corners

                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes,
                        if(sideItem == ptItem){
                            // select target that is a side box from computer w1 to for a w2
                            targetBoxes.push(ptItem);
                            // to play that target box for a block
                          }
                    }); // end for each center box
                  }); // end for possibleWinners.sides

                } // end if (center box is empty )

               if (targetBoxes.length > 1){
                 // from the possible targets, randomly choose one
                 const randomBoxNumber = Math.floor(Math.random() * targetBoxes.length);
                 const targetBoxNo = targetBoxes[randomBoxNumber];
                 // store box being filled in
                 game.filledBoxes.push(targetBoxNo);
                 // then call takeTurn, to play that box
                 game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                 //
               } else { // else if only one possible empty box is a target for a block
                  const targetBoxNo = targetBoxes[0];
                  // store box being filled in
                  game.filledBoxes.push(targetBoxNo);
                  //then call takeTurn, to play that empty box
                  game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                } // end if multiple targets

              }; // end makeBlockMove function

            const makeWinMove = function(game, possibleTargets){

               const targetBoxes = [];

               game.computer.possibleWinners.center.forEach(function(centerItem, centerIndex){
                 possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                  // itrate through target boxes,
                     if(centerItem == ptItem){
                       // select center box if empty
                          targetBoxes.push(ptItem);
                          // add to targetBoxes to played
                       }
                 }); // end for center box
               }); // end forEach possibleWinners.center

                if(targetBoxes.length == 0){
                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes,
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer w1 to for a w2
                           targetBoxes.push(ptItem);
                           // add to targetBoxes to played
                         }
                    }); // end for each corner box
                  }); // end forEach possibleWinners.corners

                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes,
                        if(sideItem == ptItem){
                          // select target that is a side box from computer w1 to for a w2
                           targetBoxes.push(ptItem);
                            // to play that target box for a w1 or w2
                          }
                    }); // end for each side box
                  }); // end for possibleWinners.sides
                } // end if (targetBoxes.length == 0)

               if (targetBoxes > 1){
                 // from possible targets, randomly choose one
                 const randomBoxNumber = Math.floor(Math.random() * targetBoxes.length);
                 const targetBoxNo = targetBoxes[randomBoxNumber];
                 // store box being filled in
                 game.filledBoxes.push(targetBoxNo);
                 // then call takeTurn, to play that box
                 game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                } else { // only 1 empty box is a possible target for a winning move
                    const targetBoxNo = targetBoxes[0];
                    // store box being filled in
                    game.filledBoxes.push(targetBoxNo);
                    // call takeTurn to play that box
                    game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                } // end if (multiple targets)
              }; // end makeWinMove function;

            // if it's computer.player's turn
            if (game.isTurn === game.computer.player) {

                // increment moveNo,
                game.computer.moveNo += 1;
                // decide on best move
                setTimeout(decideMove, 800, game);

            } // end if game.isTurn

          }; //end computerPlay()

          exports.computer.turnComplete = function(game){
            if (game.computerTurnComplete) {
              game.isTurn = game.computer.opponent;
            }
          };

          exports.computer.analyzeGameBoard = function(game, opponentWno, computerWno){

            // function to 'analyze' game board
            // new set of possibleTargets each time computer 'analyzes' gameBoard
            const possibleTargets = {
              possibleBlocks:[],
              possibleWins:[]
            };

            // checking for computer's and player's possible winning rows
            // and which of the boxes in these rows are 'targets', or are empty

            if(opponentWno) {
              possibleTargets.possibleBlocks.push(game.findTargetBox(game, game.computer.opponent, opponentWno));
            }
            if (computerWno){
              possibleTargets.possibleWins.push(game.findTargetBox(game, game.computer.player, computerWno));
            }

            return possibleTargets;
          }; // end analyzeGameBoard() function

          $(document).ready(function() {

            // labels and input allow for players to enter names
            // computer plays player input that is blank
            // game will not start unless one name is entered

            $('#playerO').change(function(){
              exports.playerOName = $(this)[0].value;
              $('#player1Name')[0].textContent = exports.playerOName;
            });

            // get name for player O
            $('#playerX').focus().change(function(){
              exports.playerXName = $(this)[0].value;
              $('#player2Name')[0].textContent = exports.playerXName;
            });


            // at present it is implied that user must type in thier name in input for player
            $('#start .button').click(function(){

              if (!exports.playerOName && !exports.playerXName) {
                // require at least one name entered
                $('#playerX')[0].placeholder = "enter your name for X or O";
                $('#playerX').focus()
              } else if (exports.playerOName || exports.playerXName){
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
              }

            });

          });

          return exports   // returning the entire object and it's methods

}(tictactoe || { } ));
