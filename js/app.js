
// Variables
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
let chosenCards = [];
let rating = 3;
let pairsRemain = 8;
let timeStart = false;
let timer;

/* Display Cards on page
 *    - Shuffle Cards
 *    - Loop through cards
 *    - Add HTML to document
 */

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
        slots[i].classList.add(cardList[i]);
    }
}
dealCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function flipCard() {
    this.classList.add('open', 'show');
    chosenCards.push(...this.firstChild.classList[2]);
    console.log(chosenCards);
}

for(card of cards) {
    card.addEventListener('click', flipCard);
};
