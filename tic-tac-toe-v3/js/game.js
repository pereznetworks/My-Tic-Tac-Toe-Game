$(document).ready(function() {

  class Game {
      constructor (playerO, playerX, $liPlayerX, $liPlayerO, $boardElmnt, $startElmnt, $finishElmnt){
          this.playerO = playerO;
          this.playerX = playerX;
          this.winRows = [  // possible winning rows
              [0,1,2,'none'],
              [3,4,5,'none'],
              [6,7,8,'none'],
              [0,3,6,'none'],
              [1,4,7,'none'],
              [2,5,8,'none'],
              [0,4,8,'none'],
              [2,4,6,'none'],
            ];
          this.$liPlayerX = $liPlayerX;
          this.$liPlayerO = $liPlayerO;
          this.$boardElmnt = $boardElmnt;
          this.$startElmnt = $startElmnt;
          this.$finishElmnt = $finishElmnt;

      }

      runGame(startButtonElement){
        startButtonElement.addEventListener('click', function(){
            tictactoe.startGame();
        });
      }

      startGame(){
          // hide start div and show game board
          this.$startElmnt.hide();
          this.$boardElmnt.show();
          // set isTurn to X player
          this.isTurn = this.playerX;
          this.$liPlayerX.attr('class', 'players active');

          // with-in playGame, toggle isTurn, place appropriate X or O's
          this.playGame($('li.box'), this)
      }

      set isTurn(isTurn){
        this._isTurn = isTurn;
      }

      get isTurn(){
        return this._isTurn;
      }

      set isWinner(winner){
        this._winner = winner;
      }

      get isWinner(){
        return this._winner;
      }

      set gameFinished(gameFinished){
        this._gameFinised = gameFinished;
      }


      get gameFinished(){
        return this._gameFinished;
      }

      finishGame(){

        $('.message')[0].textContent=this.isWinner;
        this.$boardElmnt.hide();
        this.$finishElmnt.show();
      }

      // 3rd draft of detectIfWinner() function

      detectIfWinner(game, Ofilled, Xfilled, boxesFilled){

        let blockedRows = 0;

        if (game.isTurn === game.playerO){
          const OfilledItem = Ofilled[(Ofilled.length - 1)];
            // for current box selection, last element in Ofilled array
            game.winRows.forEach(function(winRowItem, winRowIndex){
              // iterate each item of each set of possible winning rows
              let currentWinRowIndex = winRowIndex;
              winRowItem.forEach(function(rowItem, rowIndex){
                // if any match, test for row blocked,
                  // if is still a possible win or if row is a winner
                if (rowItem === OfilledItem && winRowItem[3] === 'p0-w2'){

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

        }

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
        }

        // test for how many blocked rows
          game.winRows.forEach(function(winRowItem, winRowIndex){
            // iterate each item of possible winning rows
            if (winRowItem[3] === 'blocked') {
                blockedRows += 1;
              }
          });

          if (blockedRows == 8){
              // if all rows blocked, then game is a draw
            game.isWinner = "draw";
          } 

      } // end detectIfWinner() function

      playGame($boxes, game){

        const Ofilled = [];
        const Xfilled = [];
        const filledBoxes = [];

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
                game.finishGame();
              }
            }
          }); // end click event handler

        }); // end each function for boxes

      }

      //TODO: detect a draw, when no win is possible, before all boxes filled

      /* //TODO: play against the computer
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

      /* //TODO: player's name
          // allow player's to type in a name
          // finish div will show winner's name
      */

  } // end class declaration

  // new Game 'tictactoe'
  const tictactoe = new Game( 'O', 'X', $('#player2'), $('#player1'), $('#board'), $('#start'), $('#finish') );

  tictactoe.runGame(document.getElementsByClassName('button')[0]);

});
