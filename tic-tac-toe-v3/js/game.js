$(document).ready(function() {

  class Game {
      constructor (playerO, playerX, $liPlayerX, $liPlayerO, $boardElmnt, $startElmnt, $finishElmnt){
          this.playerO = playerO;
          this.playerX = playerX;
          this.winner = {X:[], O:[]};
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

      set gameWinner(gameWinner){
        this._gameWinner = gameWinner;
      }

      get gameWinner(){
        return this._gameWinner;
      }

      set gameFinished(gameFinished){
        this._gameFinised = gameFinished;
      }

      get gameFinished(){
        return this._gameFinished;
      }

      finishGame(){

        $('.message')[0].textContent=this.gameWinner;
        this.$boardElmnt.hide();
        this.$finishElmnt.show();
      }

      detectIfWinner(game, Ofilled, Xfilled, filledBoxes){

        const winRows = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        Ofilled.forEach(function(OfilledItem, OfilledIndex){
          // for each OfilledItem
          winRows.forEach(function(winRowItem, winRowIndex){
            // iterate each item of possible winning rows
            winRowItem.forEach(function(rowItem, rowIndex){
              if (rowItem == OfilledItem){
                game.winner.O.push(OfilledItem);
              } // if any match, store that box's number
            });
          });
        });
         Xfilled.forEach(function(XfilledItem, XfilledIndex){
           // for each XfilledItem
           winRows.forEach(function(winRowItem, winRowIndex){
             // iterate each item of possible winning rows
             winRowItem.forEach(function(rowItem, rowIndex){
               if (rowItem == XfilledItem){
                 game.winner.X.push(XfilledItem);
               } // if any match, store that box's number
             });
           });
         });

        if (game.winner.X.length === 3){
          return "playerX";
        } else if (game.winner.O.length === 3){
          return "playerO";
        } else if (filledBoxes.length === 9){
          return "draw";
        } else {
          return "keep playing"
        }

      } // end detectIfWinner()

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
                  game.$liPlayerO.attr('class', 'players');
                  game.isTurn = game.playerX;
                  game.$liPlayerX.attr('class', 'players active');
                } else {
                  Xfilled.push(index);
                  item.setAttribute('class', 'box box-filled-2');
                  game.$liPlayerX.attr('class', 'players');
                  game.isTurn = game.playerO;
                  game.$liPlayerO.attr('class', 'players active');
                } // end if active player

              game.gameWinner = game.detectIfWinner(game, Ofilled, Xfilled, filledBoxes);
            }
          }); // end click event handler

        }); // end each function for boxes

        if (game.gameWinner === 'playerX' || game.gameWinner === 'playerO' || game.gameWinner === 'draw' ) {
          return gameFinished;
        }

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
