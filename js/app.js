
/**************************
 *       Variables        *
***************************/

// Cards
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
let deck = document.querySelector('.deck');
let cards = document.querySelectorAll('.card');

// Main mechanics counters
let chosenCards = [];
let pairsRemain = 8;

// Moves
let counter = document.querySelector('.moves');
let moves = 0;

// Timer
let totalTime = 0;
let timer = false;
let count;
let mins = document.querySelector('.mins');
let secs = document.querySelector('.secs');

// Star Rating
let stars = document.querySelector('.stars').childNodes;
let starsModal = document.querySelector('.modal-stars').childNodes;

// Restart
let restart = document.querySelector('.restart');

// Modal
let modal = document.getElementById('modal');
let modalClose = document.getElementById('modal-close');
let modalMoves = document.querySelector('.modal-moves');
let modalMins = document.querySelector('.modal-mins');
let modalSecs = document.querySelector('.modal-secs');

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
deck.addEventListener('click', flipCard);

// Flips a card and calls showCard and addChosenCard function
function flipCard(e) {
    let chosen = e.target;
    // Checks if clicked element is a card, is not open, and if there are already 2 open cards
    if (chosen.nodeName === "LI" && !chosen.classList.contains("open", "show", "match") && chosenCards.length !== 2) {
        chosen.classList.add('open');
        addChosenCard(chosen);
        if (timer === false && pairsRemain > 0) {
            timerOn();
        }
        setTimeout(showCard, 300, chosen);
    }
}
// Reveals the card
function showCard(card) {
    card.classList.add('show')
}

// Add clicked cards to check array and calls checkMatch function if 2 cards are clicked.
function addChosenCard(card){
    chosenCards.push(card);
    if (chosenCards.length === 2) {
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

// Cards Match: Lock cards open and call end game condition function
function match() {
    for(card of chosenCards) {
        card.classList.add("match");
    };
    pairsRemain--;
    checkWin();
    empty();
}

// Cards don't match: Flips cards down
function noMatch() {
    for (card of chosenCards) {
        card.classList.remove("open", "show");
    };
    empty();
}

// Empty the array after checks
function empty() {
    chosenCards = [];
}

// Checks for Win condition
function checkWin() {
    if (pairsRemain === 0) {
        timerOff();
        openModal();
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
      starsModal[5].classList.add('lost')
  } else if (moves === 20) {
      // Remove second star
      stars[3].classList.add('lost')
      starsModal[3].classList.add('lost')
  }
}

// Timer
function timerOn() {
    if (timer === false) {
        count = setInterval(countTime, 1000);
        timer = true;
    }
}

function timerOff() {
        clearInterval(count);
        count = 0;
        timer = false;
}

function countTime() {
    ++totalTime;
    secs.innerHTML = pad(totalTime%60);
    mins.innerHTML = pad(parseInt(totalTime/60));
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// Restart game
restart.addEventListener('click', restartGame);

function restartGame() {
    // Restart moves,totalTime and pairsRemain counter
    moves = -1;
    moveCount();
    pairsRemain = 8;
    totalTime = 0;
    // Restart stars rating
    stars[3].classList.remove('lost');
    starsModal[3].classList.remove('lost');
    stars[5].classList.remove('lost');
    starsModal[5].classList.remove('lost');
    dealCards();
    // Restart timer
    secs.innerHTML = "00";
    mins.innerHTML = "00";
    if (timer === true) {
        timerOff();
    }
}

// Update and open modal
function openModal () {
    modalMoves.innerHTML = moves;
    modalSecs.innerHTML = pad(totalTime%60);
    modalMins.innerHTML = pad(parseInt(totalTime/60));
    modal.style.display = "block";
}


// Close modal Button and restart game
modalClose.onclick = function() {
    restartGame();
    modal.style.display = "none";
}

// Close modal if anywhere outside of it is clicked
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
