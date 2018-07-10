//"use strict";

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
            filledBoxes: [],
            gameBoardState: [
                [[0,'E'],[1,'E'],[2,'E'],'none'],  // 0
                [[3,'E'],[4,'E'],[5,'E'],'none'],  // 1
                [[6,'E'],[7,'E'],[8,'E'],'none'],  // 2
                [[0,'E'],[3,'E'],[6,'E'],'none'],  // 3
                [[1,'E'],[4,'E'],[7,'E'],'none'],  // 4
                [[2,'E'],[5,'E'],[8,'E'],'none'],  // 5
                [[0,'E'],[4,'E'],[8,'E'],'none'],  // 6
                [[2,'E'],[4,'E'],[6,'E'],'none'],  // 7
              ],
            filledInClassNameforActivePlayer: '',
            filledInClassNameforO: 'box box-filled-1',
            filledInClassNameforX: 'box box-filled-2',
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
              turnIsComplete: false,
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
              // r1 = 1 box in a winning row, r2 = 1 boxes in a winning row
              // if the active player has just gotten a 3 in a row, or a winner

              game.gameBoardState.forEach(function(itemArray, itemArrayIndex){
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
                        if( itemArray[3] == `p${activePlayer}-r2` ){
                            // and if active player has 2 boxes in this row
                            itemArray[3] = `${activePlayer}-winner`;
                            // then this row is a winner
                          } else if ( itemArray[3] == `p${inactivePlayer}-r2` ) {
                            // else if inactive player has 2 in boxes in this row
                            itemArray[3] = `blocked`;
                            // then marked it as blocked
                          } else if( itemArray[3] === `p${activePlayer}-r1`){
                            // else if active player already has 1 box in this row
                            itemArray[3] = `p${activePlayer}-r2`;
                            // then label it a row for active player, -r2
                        } else if ( itemArray[3] == `p${inactivePlayer}-r1` ) {
                          // else if inactive player has 1 in boxes in this row
                          itemArray[3] = `blocked`;
                          // then marked it as blocked
                        } else if ( itemArray[3] == `none` ){
                            // if no one has boxes in this row
                            itemArray[3] = `p${selectedBy}-r1`;
                            // then label it a row for active player, -r1
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
               // for '-r2' for 2 in a row
               // or '-r1' for 1 in a row


            const isTargetBox = 'E';  // any empty, 'E', box is a target for block or a  win
            const targets = [];  // array for target boxes

            game.gameBoardState.forEach(function(rowItem, rowIndex){
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
            }); // end for gameBoardState

            return targets;

          }; // end findTargetBox() function

          exports.detectIfWinner = function(game){

            let blockedRows = 0;

            // count blocked rows
            game.gameBoardState.forEach(function(winRowItem, winRowIndex){
              if (winRowItem[3] == 'blocked'){
                blockedRows += 1;
              }
            });  // end forEach to count blocked rows

            // test if any player has a winning row
            if (game.isTurn === 'X') {

              game.gameBoardState.forEach(function(winRowItem, winRowIndex){
                // iterate each item of possible winning rows
                if (winRowItem[3] === 'X-winner'){
                    game.isWinner = 'playerX';
                 }
               });
            } else if (game.isTurn === 'O'){

              game.gameBoardState.forEach(function(winRowItem, winRowIndex){
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

            if (game.isTurn === 'X'){
              // active player is X, so use css box-filled-in class name for X
              game.filledInClassNameforActivePlayer = game.filledInClassNameforX;
            } else {
              // active player is X, so use css box-filled-in class name for O
              game.filledInClassNameforActivePlayer = game.filledInClassNameforO;
            }

              // keep track of filled boxes
              game.trackFilledBoxes(game, indexNoOfSelectedBox, game.isTurn);
              // change class name of box, to trigger css to fill-in box for X or O
              itemNoOfSelectedBox.setAttribute('class', game.filledInClassNameforActivePlayer);
              // return state of game, winner, tie or 'keep playing'
              game.winner = game.detectIfWinner(game);

              // if computer is playing O or X, and if it's computer player's turn ....
              if (game.isTurn === game.computer.player){
                // wait a bit so human can see box filled in
                setTimeout(game.isGameOver, 200, game);
              } else {
                // else if only humans are playing no need for setTimeout
                game.isGameOver(game);
              }

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
              game.playGame(game);
            }
          };  // end isGameOver()

          exports.ifComputerVsHuman = function(game, $cpLabel, $humanLabel){

            // class name of active player label
            const playerLabelActiveClassName = 'players active';

            // setting up eventListener using a custom event
            // to trigger computerPlay() method
             const $ifComputersTurn = function(){
               let cpLabelCurrentClassName = $cpLabel[0].className;
               if (playerLabelActiveClassName === cpLabelCurrentClassName) {
                  $cpLabel.trigger('itsComputersTurn');
                  console.log('its computers Turn', cpLabelCurrentClassName );
               } else {
                 console.log('its NOT computer turn', cpLabelCurrentClassName);
               }

             };
             setInterval($ifComputersTurn, 200);

             $cpLabel.bind('itsComputersTurn', game.computer.computerPlay(game));

             // setting up eventListener using a custom event
             // to trigger humansPlaying() method
              const $ifHumansTurn = function(){
                let humanLabelCurrentClassName = $humanLabel[0].className;
                if (playerLabelActiveClassName === humanLabelCurrentClassName) {
                   $humanLabel.trigger('itsHumansTurn');
                }
              };
              setInterval($ifHumansTurn, 200);

              $humanLabel.bind('itsHumansTurn', game.humanPlaying(game));

          };  // end ifComputerIsPlaying() method

          exports.humanPlaying = function(game){
              // event handler for hover affect on tictactoe boxes
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
                  ); // end hover event handler

                  $(this).click(function(){
                    if (item.attributes[0].value === "box"){ // if not filled in yet
                        // store box number that was clicked
                        game.filledBoxes.push(index);
                        // fill in chosen box with X or O depending on game.isTurn ...
                        game.takeTurn(index, item, game);
                        // if either below is true, start computer player
                    } // end if (if box not filled in yet)
                  }); // end box click event handler

              }); // end for each tictactoe box
          }; // end onlyHumansPlaying() funbction

          exports.playGame = function(game){

              if(game.playerOComputer == false && game.playerXComputer == false){

                // class name of active player label
                const playerLabelActiveClassName = 'players active';

                // setting up eventListener using a custom event
                // for playerX, to trigger
                 const $itsPlayerXTurn = function(game){
                   let playerLabelCurrentClassName = game.$liPlayerX[0].className;
                   if (playerLabelActiveClassName === playerLabelCurrentClassName) {
                     game.$liPlayerX.trigger('itsPlayerXTurn');
                   }
                 };
                 setInterval($itsPlayerXTurn, 200, game);

                 game.$liPlayerX.bind('itsPlayerXTurn', game.humanPlaying(game));

                 // setting up eventListener using a custom event
                 // for player 0
                 // to trigger computerPlay() method
                  const $itsPlayerOTurn = function(game){
                    let playerLabelCurrentClassName = game.$liPlayerO[0].className;
                    if (playerLabelActiveClassName === playerLabelCurrentClassName) {
                      game.$liPlayerO.trigger('itsPlayerOTurn');
                    }
                  };
                  setInterval($itsPlayerOTurn, 200, game);

                  game.$liPlayerO.bind('itsPlayerOTurn', game.humanPlaying(game));

              } // end if computer not playing

              let $cpLabel = '';

              // select the player label that will be "active" when the computer will take it's turn
              if (game.playerOComputer == true  ){

                 //$cpLabel = game.$liPlayerO;
                 //$humanLabel = game.$liPlayerX;
                 game.ifComputerVsHuman(game, game.$liPlayerO, game.$liPlayerX );

              } else if (game.playerXComputer == true){

                 //$humanLabel = game.$liPlayerX;
                 //$cpLabel = game.$liPlayerO;
                 game.ifComputerVsHuman(game, game.$liPlayerX, game.$liPlayerO );

              }

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

              game.gameBoardState.forEach(function(winRowArray, indexWinRowArray){

                  winRowArray.forEach(function(itemArray, indexOfItemArray){
                    if (indexOfItemArray < 3){
                     itemArray[1] = 'E';
                    }
                  });
                  winRowArray[3] = 'none';
              }); //reset array used track progress of winning rows

              // make sure each array for O and X filled are empty
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

          exports.startGame = function(){
            // startGame called by start screen 'start' button
              // first game with new players, needReset can be set to false
              this.needReset = false;
              //setup a new game
              this.setupNewGame(this);
          }; // end startGame() method

          exports.computer.computerPlay = function(game){

            const decideMove = function(game){

              // decide on move to make,
              // test for targets to block 3 or 2 in row by opponent
              // test for targets to get 3 or 2 in row
              // 1 in a row, r1
              // 2 in a row, r2

              let possibleTargets = '';
              possibleTargets = game.computer.analyzeGameBoard(game, 'r2', 'r2');
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

                 let possibleTargetsR1 = '';
                 possibleTargetsR1 = game.computer.analyzeGameBoard(game, 'r1', 'r1');
                 // which empty boxes are targets to block opponent from getting 2 in a row
                 // and which are targets to get 2 in a row

                 if (possibleTargetsR1.possibleWins[0].length > 0){
                   // if target for computer to get 2 in a row
                     makeWinMove(game, possibleTargetsR1);
                     // play it

                  } else if(possibleTargetsR1.possibleBlocks[0].length > 0){ // if opponent has a r2
                    // else if target to block opponent from getting 2 in a row
                     makeBlockMove(game, possibleTargetsR1);
                     // block it

                   } else { // then computer is playing X

                     let targetBoxes = [0,2,4,6,8];
                     const randomBoxNumber = Math.floor(Math.random() * targetBoxes.length);
                     const targetBoxNo = targetBoxes[randomBoxNumber];
                     // store box being filled in
                     game.filledBoxes.push(targetBoxNo);
                     // then call takeTurn, to play that box
                     game.takeTurn(targetBoxNo, game.$boxes[targetBoxNo], game);

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
                       if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                        // if not a duplicate
                        targetBoxes.push(ptItem);
                        // to add that box as target box for a r1 or r2
                        }
                       }
                 }); // end for center box
               }); // end for possibleWinners.center


                if(targetBoxes.length == 0){ // if center box is not empty

                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes,
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer r1 to for a r2
                         if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                          // if not a duplicate
                          targetBoxes.push(ptItem);
                          // to add that box as target box for a r1 or r2
                          }
                        }
                    }); // end for each corner box
                  }); // end for possibleWinners.corners

                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleBlocks[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes,
                        if(sideItem == ptItem){
                            // select target that is a side box from computer r1 to for a r2
                            if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                             // if not a duplicate
                             targetBoxes.push(ptItem);
                             // to add that box as target box for a r1 or r2
                             }
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
                          if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                           // if not a duplicate
                           targetBoxes.push(ptItem);
                           // to add that box as target box for a r1 or r2
                           }
                       }
                 }); // end for center box
               }); // end forEach possibleWinners.center

                if(targetBoxes.length == 0){
                  game.computer.possibleWinners.corners.forEach(function(cornerItem, cornerIndex){
                   possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                    // itrate through target boxes,
                       if(cornerItem == ptItem){
                         // select target that is a corner box from computer r1 to for a r2
                         if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                          // if not a duplicate
                          targetBoxes.push(ptItem);
                          // to add that box as target box for a r1 or r2
                          }
                         }
                    }); // end for each corner box
                  }); // end forEach possibleWinners.corners

                  game.computer.possibleWinners.sides.forEach(function(sideItem, sideIndex){
                    possibleTargets.possibleWins[0].forEach(function(ptItem, ptIndex){
                     // itrate through target boxes,
                        if(sideItem == ptItem){
                          // select target that is a side box from computer r1 to for a r2
                           if (ptItem !== targetBoxes[targetBoxes.length - 1 ]){
                            // if not a duplicate
                            targetBoxes.push(ptItem);
                            // to add that box as target box for a r1 or r2
                            }
                          }
                    }); // end for each side box
                  }); // end for possibleWinners.sides
                } // end if (targetBoxes.length == 0)


               if (targetBoxes.length > 1){
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
                // decide on best move, breif delay so human player can notice visual affects
                setTimeout(decideMove, 800, game);
                game.computer.turnIsComplete = true;
            } // end if game.isTurn

          }; //end computerPlay()

          exports.computer.turnComplete = function(game){
            if (game.computer.turnIsComplete) {
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
