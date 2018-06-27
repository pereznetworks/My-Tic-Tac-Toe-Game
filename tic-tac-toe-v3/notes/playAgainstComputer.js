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

var playComputer = (function(computer){

    var exports = {
      turnComplete: false,
      player: '',
      opponent: '',
      possibleBlock1: '',
      possibleBlock2: '',
      possibleWin1: '',
      possibleWin2: '',
      cpBoxFilledClass: '',
      opponentBoxFilledClass: '',
      playerFilled: [],
      opponentFilled: []
    }

    // find out if computer is playing X or O
      // get selected arrays and values for X or O
        // set opponent player values so computer can 'see' the game board
     if (game.playerXComputer == true) {
          exports.player = playerX;
          exports.cpBoxFilledClass = 'box box-filled-2';
          exports.opponent = playerO;
          exports.playerFilled.push(game.Xfilled[(game.Xfilled.length - 1));
        } else if (game.playerOComputer == true) {
          exports.player = playerO;
          exports.cpBoxFilledClass = 'box box-filled-1';
          exports.opponent = playerX;
          exports.playerFilled.push(game.Ofilled[(game.Ofilled.length - 1));
        }

      if (game.isTurn === exports.player) {
        computerTakeTurn(game, computer);
      } // condition if true, to trigger computer to takeTurn()


      exports.turnComplete = function(game){

        if (game.computerTurnComplete) {
          game.isTurn = exports.opponent;
        }
      };

      exports.hoverAffect = function(game, computer){
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

      exports.computerTakeTurn = function(game, computer){

        // use a mouse-over hover-event
          // so it appears that computer is 'thinking'
        hoverAffect(game, computer);

       // notes on logic, functions, objects for computer choosing best move
         // slowly implementing working code
          // see notes below

        // new set of empty boxes each time computer takes turn
        const emptyBoxes = {};

        // function to 'analyze' game board
          // checking for computer's and player's possible winning rows
            // and which emoty boxes are 'targets' for best move
        function analyzeGameBoard(game, playerWno, computerWno){


          if(playerWno) {
            emptyBoxes.possibleBlocks = game.emptyArray(emptyBoxes.possibleBlocks);
            emptyBoxes.possibleBlocks.push(game.findTargetBox(game, "player", playerWno));
          }
          if (computerWno){
            emptyBoxes.possibleWins = game.emptyArray(emptyBoxes.possibleWins);
            emptyBoxes.possibleWins.push(game.findTargetBox(game, "computer", computerWno));
          }
        }:

        // based on which turn number,
          // get target empty boxes using analyzeGameBoard()
            // test for best move to block or take a winning rows
        if (firstMove) {

          analyzeGameBoard(game, 'w1');

        } else if (secondMove){

          analyzeGameBoard(game, 'w2', 'w1');

        } else if (thirdMove){

          analyzeGameBoard(game, 'w2', 'w2');

        } else if (fourthMove){

          analyzeGameBoard(game, 'w2', 'w2');

        }

        // at some point call turnComplete()

    }); //end computerTakeTurn()

  }; // end playComputer() function

}(playComputer || { }) );

    //TODO: implement following rules in code
      // TODO: do not use forever nested if/else and array.forEach functions

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
