
/**************************
 *       Variables        *
***************************/

const cardList = [
    "fa-github",
    "fa-github",
    "fa-youtube",
    "fa-youtube",
    "fa-codepen",
    "fa-codepen",
    "fa-html5",
    "fa-html5",
    "fa-css3",
    "fa-css3",
    "fa-code",
    "fa-code",
    "fa-book",
    "fa-book",
    "fa-podcast",
    "fa-podcast"
  ];
let slots = document.querySelectorAll('.card-icon');
let cards = document.querySelectorAll('.card');
let deck = document.querySelector('.deck');
let chosenCards = [];
let counter = document.querySelector('.moves');
let moves = 0;
let stars = document.querySelector('.stars').childNodes;
let pairsRemain = 8;
let timeStart = false;
let timer;
let restart = document.querySelector('.restart')

/* Set-up: Display cards on page
 *    - Shuffle Cards
 *    - Loop through cards
 *    - Add HTML to document
 */

 /**************************
  *         Set Up         *
  **************************
  * - Shuffle cards        *
  * - Loop through cards   *
  * - Add HTML to document *
 ***************************/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

     return array;
}

// Loop through cards and add the class to the respective element
function dealCards() {
    let shuffledList = shuffle(cardList);
    for (var i = 0; i < cardList.length; i++) {
        // Remove old cards when restarting
        slots[i].className = '';
        cards[i].classList.remove("open", "show", "match");
        // Add cards to the table
        slots[i].classList.add('fa', cardList[i]);
    }
}
dealCards();

/**************************
 *     Game Mechanics     *
***************************/

 // Call FlipCard function when a card is clicked
 for(card of cards) {
     card.addEventListener('click', flipCard);
 }

// Flips, reveals a card and calls addChosenCard function
function flipCard(e) {
    let chosen = e.target;
    if (!chosen.classList.contains("open", "show", "match")) {
        chosen.classList.add('open', 'show');
        addChosenCard(chosen);
    }
}

// Add clicked cards to check array and calls checkMatch function if 2 cards are clicked.
function addChosenCard(card){
    chosenCards.push(card);
    if (chosenCards.length === 2) {
        for(card of cards) {
            card.removeEventListener('click', flipCard);
        }
        checkMatch();
        moveCount();
    }
}

// Checks cards for matches
function checkMatch() {
    // Matching cards case
    if (chosenCards[0].innerHTML === chosenCards[1].innerHTML) {
        match();
    } else { // No match case
        setTimeout(noMatch, 800);
    }
}

// Lock card open and checks for end game condition
function match() {
    for(card of chosenCards) {
        card.classList.add("match");
    };
    pairsRemain--;
    checkWin();
    empty();
}

// Flips down in case of no match
function noMatch() {
    for (card of chosenCards) {
        card.classList.remove("open", "show");
    };
    empty();
}

// Empty the array after checks
function empty() {
    chosenCards = [];
    for(card of cards) {
        card.addEventListener('click', flipCard);
    }
}

// Checks for Win condition
function checkWin() {
    if (pairsRemain === 0) {
      alert("YOU WIN!!!");
    };
}

// Increment move counter
function moveCount() {
    moves++;
    counter.innerHTML = moves;
    checkRating();
}

// Stars rating
function checkRating() {
  if (moves === 12) {
      // Remove third star
      stars[5].classList.add('lost')
  } else if (moves === 20) {
      // Remove second star
      stars[3].classList.add('lost')
  }
}

// Restart game
restart.addEventListener('click', restartGame);

function restartGame() {
    // Restart moves counter
    moves = -1;
    moveCount();
    // Restart stars rating
    stars[3].classList.remove('lost');
    stars[5].classList.remove('lost');
    dealCards();
}
