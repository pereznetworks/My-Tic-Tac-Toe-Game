// TODO: basic steps and logic
  // to add functionality for "playing against the computer"

  // computer selects a box, uses game.playgame or similar code to
    // place fill selected box with o.svg

  // computerPlayer() set game.isTurn back to "playerX"
  // computerPlayer passed updated arrays, object back to tictactoe()
      // i.e, Xfilled array, filledBoxes array and winRow

  // add to playGame()
    // if choosing to play against computer
      // execute computerPlayer()

var playAgainstComputer = (function(exports, tictactoe){

    var playComputer = {
      turnComplete: false,
      moveNo: '',
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
    }

      exports.turnComplete = function(game){

        if (game.computerTurnComplete) {
          game.isTurn = playComputer.opponent;
        }
      };

      exports.hoverAffect = function(game, playComputer){
        // to make it appear that computer player is thinking
          // x-svg or o-svg appears to hover (appear and disappear )
            // over several of the empty boxes,
              // with 1000 millisecond time intervals

              // get a random numbert to use for "hovering" affect
              let randomBoxNumber = Math.floor(Math.random() * 9);

                // for each function to hover X or O over random empty boxes
                  // so computer appears to be 'thinking' inorder 'taking turn'
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

      }

      // function to 'analyze' game board
      exports.analyzeGameBoard = function(game, playComputer, playerWno, computerWno){

        // new set of empty boxes each time computer 'analyzes' gameBoard
        const emptyBoxes = {};

          // checking for computer's and player's possible winning rows
            // and which emoty boxes are 'targets' for best move

        if(playerWno) {
          emptyBoxes.possibleBlocks = game.emptyArray(emptyBoxes.possibleBlocks);
          emptyBoxes.possibleBlocks.push(game.findTargetBox(game, "player", playerWno));
        }
        if (computerWno){
          emptyBoxes.possibleWins = game.emptyArray(emptyBoxes.possibleWins);
          emptyBoxes.possibleWins.push(game.findTargetBox(game, "computer", computerWno));
        }
      }; // end analyzeGameBoard() function

      exports.computerTakeTurn = function(game, playComputer){

        // use a mouse-over hover-event
          // so it appears that computer is 'thinking'
        playComputer.hoverAffect(game, playComputer);

        // based on which move number,
          // get target empty boxes using analyzeGameBoard()
            // TODO: of possible targets
              // test for best move to block or win
        if (playComputer.moveNo == 'firstMove') {

          analyzeGameBoard(game, playComputer, 'w1');

        } else if (playComputer.moveNo == 'secondMove'){

          analyzeGameBoard(game, playComputer, 'w2', 'w1');

        } else if (playComputer.moveNo == 'thirdMove'){

          analyzeGameBoard(game, playComputer, 'w2', 'w2');

        } else if (playComputer.moveNo == 'fourthMove'){

          analyzeGameBoard(game, playComputer, 'w2', 'w2');

        }

        // at some point call turnComplete()

    }; //end computerTakeTurn()

}(playAgainstComputer || { }) );


    //TODO: implement following rules in code
    // notes on logic, functions, objects for computer choosing best move
      // slowly implementing working code

      // TODO: try not to use crazy forever nested
         // if/else and array.forEach functions

      // RULE 1: 4th move strategy
        // go for the win
          // if computer has 2 boxes in a winning row,
            // with 3rd box in that winning row still empty
              // select that box for a win

      // RULE 2: 3rd move or 4th move :
       //if comoputer does yet have any possible wins
         // block opponent from a future w2
           // if possible
             // selecting a 2nd box in computer's a possible winning row

      // RULE 3: 2nd move straegy:
        //offensive postor with defensive balance
          // get 2 in a row, blocking opponent at the same time...

      // RULE 4: first move strategy
        // take center box if empty
          // center box is 4
        // else take any corner box that is empty,
          // corner boxes are 0,2,6,8

      // IDEA: implement an object-array or array table that.....
       // is updated after each computer and player's turn
        // each row represents set of 3 in a row
          // each element of row : box #, empty or filled by whom,
            // 4th element is a string: labeling which player has 1 or 2 filled

       // IDEA: "analyze" this table after each player's turn
          // return which empty boxes are targets for best move

      // const possibleWinners = {
      //   rank4: [4],
      //   rank3: [0,2,6,8],
      //   rank2: [1,3,5,7]
      // }
      //
      // const computerPossibleWinners = { //start of game
      //   //p:[0,1,2,3,4,5,6,7,8],
      //   //b:[]
      //                   // after first move, O chooses right corner, box 2
      //   //p:[0,1,3,5,6,7,8],
      //   //b:[4]
      // }
      //
      // const opponentPossibleWinners = { //start of game
      //   //p:[0,1,3,5,6,7,8],
      //   //b:[2]
      //                  // after first move, X chooses center, box 4
      //   //p:[1,2,3,4,6,8],
      //   //b:[0,5,7]
      // }
