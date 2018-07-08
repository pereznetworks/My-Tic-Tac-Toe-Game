//Psuedo code - don't try to run this

// filtering-out possible targets
  // when neither opponent or computer have 2 in a row

// calculas : (using possibleTargets and gameBoardState)
  // complete w2 for a win
  // if no w2's for a win, (opponent missed a block)
     // then look block opponent w2
     // if no w2 blocks
        // then look to get w2
          // with least number of opponent w2's unblocked

// playing out 4 highly-reprentive win or lose scenario's
// where there are w2's by move 3 (O's 2nd turn)
// X always goes first with move 0
// move 3, isTurn = O

scenario 1: // filledBoxes = [0,4,8]

given :

  possibleTargets.w2s.wins  // []

  possibleTargets.w2s.blocks // []

  possibleTargets.w1s.wins   //[1,2,3,5,6,7]

  possibleTargets.w1s.blocks  //[1,2,2,3,5,6,6,7]

    // following function only works for some scenarios
    const rankTargets = function(game, possible2InRowTargets){

      const verifiedTargetBoxes = [];

       possible2InRowTargets.forEach(function(targetBox, targetBoxIndex){
          game.gameBoardState.forEach(function(rowArray, indexofRowArray){
            if ( rowArray[3] == `p${game.computer.player}-r1` ){
              rowArray.forEach(function(boxArray, indexofBoxArray){

                if (indexofBoxArray < 3){

                    let unblocked = 0;
                    let unblockedNum = 0;
                    let targetBoxRowArrayIndex = 0;

                     if (boxArray[0] == targetBox ){
                        targetBoxRowArrayIndex = indexofRowArray;
                     }

                     game.gameBoardState[targetBoxRowArrayIndex].forEach(function(boxArray, boxArrayIndex){
                       if (boxArrayIndex < 3){
                          boxArray.forEach(function(item, index){
                            if (item[0] !== targetBox && item[1] === 'E'){

                               unblocked = boxArray[0];

                               game.gameBoardState.forEach(function(rowArray, indexofRowArray){
                                  if ( rowArray[3] = `p${game.computer.opponent}-r1` ){
                                    if (indexofRowArray < 3){

                                       rowArray.forEach(function(boxArray, indexofBoxArray){
                                            if (unblocked == boxArray[0]){
                                               unblockedNum++;
                                            }
                                       });
                                    }
                                  }
                               });

                               if (unblockedNum <= 1){
                                    verifiedTargetBoxes.push(targetBox);
                               }

                            }
                          });
                       }

                     });

                }

              });
            }
          });
        });

        return verifiedTargetBoxes;
    };



gameBoardState[0][0][0,X] // X filledbox
gameBoardState[0][1][1,E] // empty       // possible block if 1, unblocked if 7
gameBoardState[0][2][2,E] // empty       // possible block if 2, unblocked if 6
gameBoardState[O][3] = X-w1

gameBoardState[1][0][3,E]  // empty      // possible w2,
gameBoardState[1][1][4,O]  // O filledbox
gameBoardState[1][2][5,E]  // empty      // possible w2,
gameBoardState[1][3] = 0-w1

gameBoardState[2][0][6,E]  // empty      // possible block if 6, unblocked if 2
gameBoardState[2][1][7,E]  // empty      // possible block if 7, unblocked if 1
gameBoardState[2][2][8,X]  // X filledbox
gameBoardState[2][3] = X-w1

gameBoardState[3][0][0,X]  // X filledbox
gameBoardState[3][1][3,E]  // empty      // possible block if 3, unblocked if 5
gameBoardState[3][2][6,E]  // empty      // possible block if 6, unblocked if 2
gameBoardState[3][3] = X-w1

gameBoardState[4][0][1,E]  // empty      // possible w2
gameBoardState[4][1][4,0]  // O filledbox
gameBoardState[4][2][7,E]  // empty      // possible w2
gameBoardState[4][3] = O-w1

gameBoardState[5][0][2,E]  // empty      // possible block if 2, unblocked if 6
gameBoardState[5][1][5,E]                // possible block if 5, unblocked if 3
gameBoardState[5][2][8,X]  // X filledbox
gameBoardState[5][3] = X-w1

gameBoardState[6][0][0,X]  // X filledbox
gameBoardState[6][1][4,O]  // O filledbox
gameBoardState[6][2][8,X]  // X filledbox
gameBoardState[6][3] = blocked

gameBoardState[7][0][2,E]  // empty      // possible w2
gameBoardState[7][1][4,O]  // O filledbox
gameBoardState[7][2][6,E]  // empty      // possible w2
gameBoardState[7][3] = O-w1

result:

  // w2's (1,3,5,7 )that leave only a single w1 unblocked for opponent
  // both other possible w2's (2,6)
    // leave double w2 (2 or 6) for opponent unblocked
     // these cancel each other out, so removed as possibleTarget.wins

   // remaining [1,3,5,7], can choose from any one of these

scenario 2: // filledBoxes = [1,4,3]
  //  1 possible w2's (8) leaves double w2 (0,0)for opponent unblocked
  //  (2,6) leave 1 block open each,
      // but still prevent future double w2's for opponent
  //  1 w2 (0) actually blocks 2 w1's (0,0) for opponent,
      // and does not leave any unblocked

possibleTargets.w2s.wins  // []

possibleTargets.w2s.blocks // []

possibleTargets.w1s.wins   //[0,2,6,8]

possibleTargets.w1s.blocks  //[0,0,2,6,6]


scenario 3: // filledBoxes = [2,4,6]
  //  2 possible w2's (0,8) leave only 1 block open
  //  2 possible w2's (1,5) leave dooble blocks open
  //  boxes 3,7 are possible blocks but are not w2's for computer
      // so actually leave both double blocks open

possibleTargets.w2s.wins  // []

possibleTargets.w2s.blocks // []

possibleTargets.w1s.wins   //[0,1,5,8]

possibleTargets.w1s.blocks  //[0,0,1,3,5,7,8,8]

scenario 4: // filledBoxes [3,4,5]
// ** with this move-brach : O gets 2 double w2's or a fork
// for a definite win
  // (1,7) possible w2 leave no blocks open for opponent w2's
  // (0,2,6,8) are possible w2's but leave 1 block each open for an opponent w2

possibleTargets.w2s.wins  // []

possibleTargets.w2s.blocks // []

possibleTargets.w1s.wins   //[0,1,2,6,7,8]

possibleTargets.w1s.blocks  //[0,2,6,8]
