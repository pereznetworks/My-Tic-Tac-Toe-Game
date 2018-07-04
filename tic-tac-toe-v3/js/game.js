
var tictactoe = (function (exports){

        var exports = {
            needReset: false,
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
            winRows: [  // possible winning rows
                [0,1,2,'none'],  // 0
                [3,4,5,'none'],  // 1
                [6,7,8,'none'],  // 2
                [0,3,6,'none'],  // 3
                [1,4,7,'none'],  // 4
                [2,5,8,'none'],  // 5
                [0,4,8,'none'],  // 6
                [2,4,6,'none'],  // 7
              ],
            winRowsProgress: [  // possible winning rows
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
              possibleBlock1: '',
              possibleBlock2: '',
              possibleWin1: '',
              possibleWin2: '',
              cpBoxFilledClass: '',
              opponentBoxFilledClass: '',
              playerFilled: [],
              opponentFilled: [],
              possibleWinners: {
                center: [4],
                corners: [0,2,6,8],
                sides: [1,3,5,7]
              },
          };

          exports.trackFilledBoxes = function(game, selectedBoxNumber, selectedBy){

              // first figure out whose turn it is
              if (selectedBy === game.computer.player){
                activePlayer = 'O';
                inactivePlayer = 'X';
              } else {
                activePlayer = 'X';
                inactivePlayer = 'O';
              }

              // as the game progresses, track who fills each box
              // who has potential winning rows, which rows are blocked
              // if the active player has just gotten a 3 in a row, a winner

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

            // doing this inorder to keep a 'clean' environment
            let origArrayLength = arrayToEmpty.length;
            for (var i = origArrayLength; i > 0; i--){
              var bucket = arrayToEmpty.pop();
            }
            return arrayToEmpty;

            // seems there should be a better way to do this...
          }; // end emptyArray()

          exports.findTargetBox = function(game, computerORplayer, noBoxesInRow){

            // called by computerPlayer() as part of choosing best move,
            // find empty box in computer or players's winning row

            // required paramters
            // game object
            // computerORplayer; string for 'O' or 'X'
            // noBoxesInRow; string for '-w2' or '-w1'
            // isTargetBox; string for 'E'

            const isTargetBox = 'E';
            const targets = [];

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

            if (blockedRows == 8){
                  // if all rows blocked, then game is a draw
                game.isWinner = "draw";
              } // end if blocked rows = 8

          }; // end detectIfWinner() method

          exports.takeTurn = function(indexNoOfSelectedBox, itemNoOfSelectedBox, game){

            // simplifies playGame() function
            // can then use in playAgainstComputer()
            if (game.isTurn === game.playerO) {
              game.trackFilledBoxes(game, indexNoOfSelectedBox, game.isTurn);
              game.Ofilled.push(indexNoOfSelectedBox);
              itemNoOfSelectedBox.setAttribute('class', 'box box-filled-1');
              game.winner = game.detectIfWinner(game);
              game.isTurn = game.playerX;
              game.$liPlayerO.attr('class', 'players');
              game.$liPlayerX.attr('class', 'players active');
            } else {
              game.trackFilledBoxes(game, indexNoOfSelectedBox, game.isTurn);
              game.Xfilled.push(indexNoOfSelectedBox);
              itemNoOfSelectedBox.setAttribute('class', 'box box-filled-2');
              game.winner = game.detectIfWinner(game);
              game.isTurn = game.playerO;
              game.$liPlayerX.attr('class', 'players');
              game.$liPlayerO.attr('class', 'players active');
              game.isGameOver(game);
            } // end if game.isTurn

          }; // end takeTurn()

          exports.isGameOver = function(game){
            // after each turn is taken, do we have a winner ...
            if (game.isWinner === 'playerX' || game.isWinner === 'playerO' || game.isWinner === 'draw' ) {
              game.finishGame(game);
            }
          };  // end isGameOver()

          exports.playGame = function(game){

            // 'O' or 'X' appears
              // to follow player's mouse around tictactoe game board
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

            // for each box in boxes
              // create an event handler
                // fill box with O or X
                // detect if part or completes winning row, or blocked
                // set X or O as current player
                if (game.isTurn !== game.computer.player){
                  game.$boxes.each(function(index, item){
                    $(this).click(function(){
                      if (item.attributes[0].value === "box"){
                          // store box number that was cliked
                          game.filledBoxes.push(index);
                          // fill in chosen box with X or O depending on game.isTurn ...
                          game.takeTurn(index, item, game);
                          // after each turn is taken, do we have a winner ...
                          game.isGameOver(game);
                          // if either below is true, start computer player
                          if (game.playerXComputer == true || game.playerOComputer == true && game.isWinner === 'keep playing'){
                            // brief delay, so human sees computer taking it's turn...
                            setTimeout( game.computer.computerPlay, 1000, game);
                          }
                      }
                    }); // end box click event handler
                  }); // end each function for boxes
                }

            // if (game.isTurn === game.computer.player) {
            //   game.computer.moveNo += 1;
            //   game.computer.computerTakeTurn(game);
            // } // condition if true, to trigger computer to takeTurn()


          }; // end playGame() method

          exports.finishGame = function(game){
            // show winner, or draw
              // setup event handler for new game
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

              game.needReset = true;
              game.setupNewGame(game);
              game.playGame(game);

            });
          }; // end finishGame() method

          exports.setupNewGame = function(game){

            game.$startElmnt.hide();
            game.$finishElmnt.hide();
            game.isWinner = 'keep playing';

            if (game.needReset) { // make sure board is cleared for new game

              //reset styling of boxes to original or 'empty'
              $('.boxes').children().attr('class', 'box');

              game.$boxes.each(function(){  // just to be sure...
                this.style.backgroundColor = '';
                this.style.backgroundImage = '';
              }); // reset each box background Color and Image style to 'empty'

              game.winRows.forEach(function(item, index){
                item[3] = 'none';
              });  // reset array used by detectIfWinner()

              game.winRowsProgress.forEach(function(winRowArray, indexWinRowArray){

                  winRowArray.forEach(function(itemArray, indexOfItemArray){
                    if (indexOfItemArray < 3){
                     itemArray[1] = 'E';
                    }
                  });
                  winRowArray[3] = 'none';
              }); //reset array used by computerPlay()

              // make sure each array for O and X filled are empty
              game.Ofilled = game.emptyArray(game.Ofilled);
              game.Xfilled = game.emptyArray(game.Xfilled);
              game.filledBoxes = game.emptyArray(game.filledBoxes);
              game.computer.moveNo = 0;

              // reselecting empty $boardElmnt
              game.$boardElmnt = $('#board');
              game.$boardElmnt.show();

              // reset flag
              game.needReset = false;

            } else { // if this is not a reset, but the FIRST game...

              if (!game.playerOName) {  // is one of the playerO input is blank
                // then setup computer to play O
                game.computer.player = game.playerO;
                game.computer.cpBoxFilledClass = 'box box-filled-1';
                game.computer.opponent = game.playerX;
                game.$playerONameLabel[0].textContent = 'the computer';
                game.playerOName = 'the computer';
                game.playerOComputer = true;

              } else if (!game.playerXName) {
                // if plarerX input is blank setup computer to play X
                game.computer.player = game.playerX;
                game.computer.cpBoxFilledClass = 'box box-filled-2';
                game.computer.opponent = game.playerO;
                game.$playerXNameLabel[0].textContent = 'the computer';
                game.playerXName = 'the computer';
                game.playerXComputer = true;
              }

              game.$boardElmnt.show();
              game.$boardElmnt = $('#board');
              // get name for player O
            }

            // make sure isTurn to X player
            game.isTurn = this.playerX;
            // 'visually activate player X' label
            game.$liPlayerO.attr('class', 'players');
            game.$liPlayerX.attr('class', 'players active');
            // now that game is reset, set new game to false

          };

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

          exports.computer.computerPlay = function(game){

            const makeBlockMove = function(game, possibleTargets){

               const targetBoxes = [];
               game.computer.possibleWinners.center.forEach(function(centerItem, centerIndex){
                 possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                  // itrate through target boxes, check for empty side boxes
                     if(centerItem == ptItem){
                       // select center box if empty
                       targetBoxes.push(ptItem);
                       // add to targetBoxes to played
                      }
                 }); // end for each possible block
               }); // end for possibleWinners.corner

                if(targetBoxes.length == 0){
                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes, check for empty side boxes
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer w1 to for a w2
                         targetBoxes.push(ptItem);
                         // add to targets to play for a block
                        }
                    }); // end for each possible block
                  }); // end for each corner box
                } // end (if targetBoxes.length == 0)

                if (targetBoxes.length == 0){
                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes, check for empty side boxes
                        if(sideItem == ptItem){
                          // select target that is a side box from computer w1 to for a w2
                          targetBoxes.push(ptItem);
                          // to play that target box for a block
                         }
                    }); // end for each possible block
                  }); // end for each corner box
                } // end 2nd (if targetBoxes.length == 0)

               if (targetBoxes.length > 1){
                 const randomBoxNumber = Math.floor(Math.random() * targetBoxes.length);
                 for (let i = 0; i < targetBoxes.length; i++){
                  if (i == randomBoxNumber){
                     // choose a random box number from possible targets
                     const targetBoxNo = targetBoxes[randomBoxNumber];
                     //then call takeTurn
                     game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                      // to play that box
                     i = game.computer.possibleWinners.corners.length;
                   }
                  }
                } else {
                  // only one possible empty box is a target for a block
                  const targetBoxNo = targetBoxes[0];
                  //then call takeTurn, to play that empty box
                  game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                }
              }; // end makeBlockMove function

            const makeWinMove = function(game, possibleTargets){

               const targetBoxes = [];

               game.computer.possibleWinners.center.forEach(function(centerItem, centerIndex){
                 possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                  // itrate through target boxes, check for empty side boxes
                     if(centerItem == ptItem){
                       // select center box if empty
                       targetBoxes.push(ptItem);
                       // add to targetBoxes to played
                      }
                 }); // end for each possibleWinners
               }); // end for each corner box

                if(targetBoxes.length == 0){
                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes, check for empty side boxes
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer w1 to for a w2
                         targetBoxes.push(ptItem);
                         // add to targetBoxes to played
                        }
                    }); // end for each possibleWinners
                  }); // end for each corner box
                } // end (if targetBoxes.length == 0)

                if (targetBoxes.length == 0){
                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes, check for empty side boxes
                        if(sideItem == ptItem){
                          // select target that is a corner box from computer w1 to for a w2
                          targetBoxes.push(ptItem);
                          // to play that target box for a w2
                         }
                    }); // end for each possibleWinners
                  }); // end for each side box
                } // end 2nd (if targetBoxes.length == 0)

               if (targetBoxes > 1){
                 const randomBoxNumber = Math.floor(Math.random() * targetBoxes.length);
                   for (let i = 0; i < targetBoxes.length; i++){
                    if (i == randomBoxNumber){
                       // choose random box number from posible Targets
                       const targetBoxNo = targetBoxes[randomBoxNumber];
                       //then call takeTurn
                       game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                        // to play that box
                       i = targetBoxes.length;
                       // set for-loop index to loop ends
                     }
                    }
                  } else {
                    // only 1 empty box is a possible target for a winning move
                    const targetBoxNo = targetBoxes[0];
                    // call takeTurn to play that box
                    game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
                  }
              }; // end makeWinMove function;

            // each time it's computer.player's turn
            if (game.isTurn === game.computer.player) {

              // increment moveNo,
              game.computer.moveNo += 1;

                // depending on move or turn number,
                  // w1 = possible winning row opponent has 1 box in
                  // w2 = possible winning row opponent has 2 boxes in
                  // target = empty box in possible winning row
                    // using analyzeGameBoard()
                      // calls findTargetBox()
                        // which iterates winRowsProgress to find...
                          // possibleBlocks = target boxes to block opponent's w1 or w2
                          // possibleWins = target boxes for computer to get a w1 or w2
                  // descion tree below, basically...
                   // simplifies possible moves based on
                   // ..which turn number computer is taking
                    // with boxes filled, only 1 possible winner this move
                     // hopefully not more than 1..
                    // if opponent has a w2, then a winning row needs to be blocked this turn
                      // if not can computer win this turn, fill 3rd box of a w2
                        // if not what about blocking or getting a w2
                          // if not what about blocking or getting a w1

                if (game.computer.moveNo == 1) {

                  let possibleTargetsM1 = '';
                  possibleTargetsM1 = game.computer.analyzeGameBoard(game, 'w1');
                  makeBlockMove(game, possibleTargetsM1);

                } else if (game.computer.moveNo == 2){

                    let possibleTargetsM2 = '';
                    possibleTargetsM2 = game.computer.analyzeGameBoard(game, 'w2', 'w1');

                     if(possibleTargetsM2.possibleBlocks[0].length > 0){

                        makeBlockMove(game, possibleTargetsM2);

                      } else if (possibleTargetsM2.possibleWins[0].length > 0){  // if opponent has no w2

                         makeWinMove(game, possibleTargetsM2);
                      } // end if possible to Block opponent else go for 2 in a row


                } else if (game.computer.moveNo == 3){

                    let possibleTargetsM3 = '';
                    possibleTargetsM3 = game.computer.analyzeGameBoard(game, 'w2', 'w2');

                      if (possibleTargetsM3.possibleWins[0].length > 0){  // computers has a w2

                          makeWinMove(game, possibleTargetsM3);
                          // do we have a winner or draw ...
                          game.isGameOver(game);

                      } else if (possibleTargetsM3.possibleBlocks[0].length > 0){

                           makeBlockMove(game, possibleTargetsM3);
                           // do we have a winner or draw ...
                           game.isGameOver(game);

                      } else {

                           let possibleTargetsM3w1 = '';
                           possibleTargetsM3w1 = game.computer.analyzeGameBoard(game, 'w1', 'w1');

                          makeWinMove(game, possibleTargetsM3W1);

                           // do we have a winner or draw ...
                           game.isGameOver(game);

                      }

                } else if (game.computer.moveNo == 4){

                    let possibleTargetsM4 = '';
                    possibleTargetsM4 = game.computer.analyzeGameBoard(game, 'w2', 'w2');

                    if (possibleTargetsM4.possibleWins[0].length > 0){  // if opponent has w2

                        makeWinMove(game, possibleTargetsM4);
                        // do we have a winner or draw ...
                        game.isGameOver(game);

                    } else if(possibleTargetsM4.possibleBlocks[0].length > 0){ // if opponent has no w2

                       makeBlockMove(game, possibleTargetsM4);
                       // do we have a winner or draw ...
                       game.isGameOver(game);

                     } else {

                       let possibleTargetsM4w1 = '';
                       possibleTargetsM4w1 = game.computer.analyzeGameBoard(game, 'w1', 'w1');

                       if (possibleTargetsM4w1.possibleWins[0].length > 0){

                           makeWinMove(game, possibleTargetsM4w1);
                           // do we have a winner or draw ...
                           game.isGameOver(game);

                        } else if(possibleTargetsM4w1.possibleBlocks[0].length > 0){ // if opponent has a w2

                           makeBlockMove(game, possibleTargetsM4w1);
                           // do we have a winner or draw ...
                           game.isGameOver(game);

                         }

                     }// end if/else win or block

                } // end if/else for moveNo

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

//
// // if first move, get possible target to block opponent
// let possibleTargetsM1 = ''
// possibleTargetsM1 = game.computer.analyzeGameBoard(game, 'w1');
//
// // for each target of opponent possible blocks
// possibleTargetsM1.possibleBlocks.forEach(function(pbItemArray, pbItemIndex){
//     // is target a center box ?
//      pbItemArray.forEach(function(ptItem, ptIndex){
//        if (ptItem == game.computer.possibleWinners.center[0] ){
//          // then choose center box
//          const targetBoxNo = ptItem;
//          //then call takeTurn
//          game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
//          // to play that center
//         } else {
//          game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
//            // is possible target a corner box ?
//            if (ptItem == cornerItem ){
//              // TODO: randomize which corner computer selects
//              // then choose that corner
//              const targetBoxNo = ptItem;
//              //then call takeTurn
//              game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);
//               // to play that center box
//             }
//          });
//        } // end if center is empty else take a corner box
//      });

//
// // detect possible win or blocked rows
//   // at the end of each player's turn
//   // compare current or last box selection
//     // if only current player has 1,2 boxes in winning row,
//       // mark with player's name
//       // else mark row as blocked
// if (game.isTurn === game.playerO){
//   const OfilledItem = game.Ofilled[(game.Ofilled.length - 1)];
//     // for current box selection, last element in Ofilled array
//     game.winRows.forEach(function(winRowItem, winRowIndex){
//       // iterate each item of each set of possible winning rows
//       let currentWinRowIndex = winRowIndex;
//       winRowItem.forEach(function(rowItem, rowIndex){
//         // if any match, test for row blocked,
//           // if is still a possible win or if row is a winner
//         if (rowItem === OfilledItem && winRowItem[3] === 'pO-w2'){
//
//             game.winRows[currentWinRowIndex][3] = 'pO-winner';
//
//         } else if ( rowItem === OfilledItem && winRowItem[3] === 'pO-w1'){
//
//              game.winRows[currentWinRowIndex][3] = 'pO-w2';
//
//         } else if (rowItem === OfilledItem
//             && winRowItem[3] === 'none'){
//
//              game.winRows[currentWinRowIndex][3] = 'pO-w1';
//
//         } else if (rowItem === OfilledItem){
//
//              game.winRows[currentWinRowIndex][3] = 'blocked';
//
//         }
//       });
//     });
//
// } else {
//    const XfilledItem = game.Xfilled[(game.Xfilled.length - 1)];
//      // for current box selection, last element in Ofilled array
//      game.winRows.forEach(function(winRowItem, winRowIndex){
//        // iterate each item of each set of possible winning rows
//        let currentWinRowIndex = winRowIndex;
//        winRowItem.forEach(function(rowItem, rowIndex){
//          // if any match, test for row blocked,
//            // if is still a possible win or if row is a winner
//          if (rowItem === XfilledItem
//              && winRowItem[3] === 'pX-w2'){
//
//              game.winRows[currentWinRowIndex][3] = 'pX-winner';
//
//          } else if ( rowItem === XfilledItem
//              && winRowItem[3] === 'pX-w1'){
//
//              game.winRows[currentWinRowIndex][3] = 'pX-w2';
//
//          } else if (rowItem === XfilledItem
//              && winRowItem[3] === 'none'){
//
//             game.winRows[currentWinRowIndex][3] = 'pX-w1';
//
//          } else if (rowItem === XfilledItem){
//
//             game.winRows[currentWinRowIndex][3] = 'blocked';
//
//          }
//        });
//      });
//
// } // end if forEach to detect possible win or blocked row
