//TODO: modify for us in TicTacToe game 

// random number vars and array to track last qoute and color displayed
let randomQuoteNumber;
let randomColorNumber;
const randomQuoteArray = [];
const randomColorArray = [];


/* The getRandomQoute function
    returns a random qoute object from the quotes array
*/
function getRandomQoute(quotes){

  // storing previous randomQuoteNumber
  randomQuoteArray.push(randomQuoteNumber);
  console.dir(randomQuoteArray);

  // getting a randomQuoteNumber
  randomQuoteNumber = Math.floor(Math.random() * quotes.length);

  if (randomQuoteArray.length > quotes.length) {
      for(let i = (randomQuoteArray.length - quotes.length); i < randomQuoteArray.length ; i++){
        // if previous randomNumber returned is EQUAL to any get a new randomNumber
        console.log("index: " + i );
        console.log("randomQuoteArray.[i]: " + randomQuoteArray[i] );
        if ( randomQuoteNumber === randomQuoteArray[i] ) {
          console.log("oops these 2 numbers match");
          console.log("randomQuoteArray[i]       : " + randomQuoteArray[i]);
          console.log("cureent randomQuoteNumber : " + randomQuoteNumber);
          randomQuoteNumber =  Math.floor(Math.random() * quotes.length);
          i = (randomQuoteArray.length - quotes.length);
        }
      }
    } else {
      for(let i = 0; i < randomQuoteArray.length ; i++){
        // if previous randomNumber returned is EQUAL to any get a new randomNumber
        console.log("index: " + i );
        console.log("randomQuoteArray.[i]: " + randomQuoteArray[i] );
        if ( randomQuoteNumber === randomQuoteArray[i] ) {
          console.log("oops these 2 numbers match");
          console.log("randomQuoteArray[i]       : " + randomQuoteArray[i]);
          console.log("cureent randomQuoteNumber : " + randomQuoteNumber);
          randomQuoteNumber =  Math.floor(Math.random() * quotes.length);
          i = 0;
        }
      }
    }

  console.log("returnning randomQuoteNumber: " + randomQuoteNumber);
  return quotes[randomQuoteNumber];
}

// the getRandomColor function
function getRandomColor(colors){

  // storing previous randomColorNumber
  randomColorArray.push(randomColorNumber);
  console.dir(randomColorArray);

  // getting a randomColorNumber
  randomColorNumber = Math.floor(Math.random() * colors.length);

  if (randomColorArray.length > colors.length) {
      for(let i = (randomColorArray.length - colors.length); i < randomColorArray.length ; i++){
        // if previous randomNumber returned is EQUAL to any get a new randomNumber
        console.log("index: " + i );
        console.log("randomColorArray[i]: " + randomColorArray[i] );
        if ( randomColorNumber === randomColorArray[i] ) {
          console.log("oops these 2 numbers match");
          console.log("randomColorArray[i]       : " + randomColorArray[i]);
          console.log("cureent randomColorNumber : " + randomColorNumber);
          randomColorNumber =  Math.floor(Math.random() * colors.length);
          i = (randomColorArray.length - colors.length);
        }
      }
    } else {
      for(let i = 0; i < randomColorArray.length ; i++){
        // if previous randomNumber returned is EQUAL to any get a new randomNumber
        console.log("index: " + i );
        console.log("randomColorArray[i]: " + randomColorArray[i] );
        if ( randomColorNumber === randomColorArray[i] ) {
          console.log("oops these 2 numbers match");
          console.log("randomColorArray[i]       : " + randomColorArray[i]);
          console.log("cureent randomColorNumber : " + randomColorNumber);
          randomColorNumber =  Math.floor(Math.random() * colors.length);
          i = 0;
        }
      }
    }

  console.log("returnning randomColorNumber: " + randomColorNumber);
  return colors[randomColorNumber];
}
