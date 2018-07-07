//Psuedo code - don't try to run this

// filtering-out possible targets
  // when neither opponent or computer have 2 in a row

// calculas : (using possibleTargets and winRowsProgress)
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

// game.winRowsProgress.forEach(iArray, indexofiArray),
  // iArray.forEach(item, itemIndex)
      // if ( iArray[3] = O-w1 ),
        // pChoice = null;
        // unblocked = null;
        // item.forEach(box, boxIndex)
         // if (box[1] = 'E' && !pChoice )
            // pChoice = box[0]
         // else
            // unblocked = box[0]
         // game.winRowsProgress.forEach(iArray, indexofiArray)
           // iArray.forEach(item, itemIndex)
            // unblockedNum = 0
            // item.forEach(box, boxIndex)
              // if unblocked = box
                // then unblockedNum ++
            // if unblockedNum > 1
            // verifiedTargetBoxes.push(pChoice)

    // GIVEN COMPUTER PLAYER IS O,
      // MUST DO SAME FOR EACH empty box in each O-w1 in winRowsProgress


winRowsProgress[0][0][0,X] // X filledbox
winRowsProgress[0][1][1,E] // empty       // possible block if 1, unblocked if 7
winRowsProgress[0][2][2,E] // empty       // possible block if 2, unblocked if 6
winRowsProgress[O][3] = X-w1

winRowsProgress[1][0][3,E]  // empty      // possible w2,
winRowsProgress[1][1][4,O]  // O filledbox
winRowsProgress[1][2][5,E]  // empty      // possible w2,
winRowsProgress[1][3] = 0-w1

winRowsProgress[2][0][6,E]  // empty      // possible block if 6, unblocked if 2
winRowsProgress[2][1][7,E]  // empty      // possible block if 7, unblocked if 1
winRowsProgress[2][2][8,X]  // X filledbox
winRowsProgress[2][3] = X-w1

winRowsProgress[3][0][0,X]  // X filledbox
winRowsProgress[3][1][3,E]  // empty      // possible block if 3, unblocked if 5
winRowsProgress[3][2][6,E]  // empty      // possible block if 6, unblocked if 2
winRowsProgress[3][3] = X-w1

winRowsProgress[4][0][1,E]  // empty      // possible w2
winRowsProgress[4][1][4,0]  // O filledbox
winRowsProgress[4][2][7,E]  // empty      // possible w2
winRowsProgress[4][3] = O-w1

winRowsProgress[5][0][2,E]  // empty      // possible block if 2, unblocked if 6
winRowsProgress[5][1][5,E]                // possible block if 5, unblocked if 3
winRowsProgress[5][2][8,X]  // X filledbox
winRowsProgress[5][3] = X-w1

winRowsProgress[6][0][0,X]  // X filledbox
winRowsProgress[6][1][4,O]  // O filledbox
winRowsProgress[6][2][8,X]  // X filledbox
winRowsProgress[6][3] = blocked

winRowsProgress[7][0][2,E]  // empty      // possible w2
winRowsProgress[7][1][4,O]  // O filledbox
winRowsProgress[7][2][6,E]  // empty      // possible w2
winRowsProgress[7][3] = O-w1

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
