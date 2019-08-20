
/**************************
 *       Variables        *
***************************/

// Cards
const cardList = [
		'fa-github',
		'fa-github',
		'fa-youtube',
		'fa-youtube',
		'fa-codepen',
		'fa-codepen',
		'fa-html5',
		'fa-html5',
		'fa-css3',
		'fa-css3',
		'fa-code',
		'fa-code',
		'fa-book',
		'fa-book',
		'fa-podcast',
		'fa-podcast'
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

// Modals
let modal = document.getElementById('modal-score');
let modalKeys = document.getElementById('modal-keys');
let modalClose = document.getElementById('modal-close');
let modalKeysClose = document.getElementById('modal-keys-close');
let modalKeysOpen = document.querySelector('.keys');
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
				cards[i].classList.remove('open', 'show', 'match');
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
		if (chosen.nodeName === 'LI' && !chosen.classList.contains('open', 'show', 'match') && chosenCards.length !== 2) {
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
				setTimeout(function() {
						for(card of chosenCards){
								card.classList.add('wrong');
						}
						setTimeout(noMatch, 1000);
				}, 300);

		}
}

// Cards Match: Lock cards open and call end game condition function
function match() {
		for(card of chosenCards) {
				card.classList.add('match');
				gotRight(card);
		};
		pairsRemain--;
		checkWin();
		empty();
}

// Match pair animation
function gotRight(card) {
		card.classList.add('right');
}

// Cards don't match: Flips cards down
function noMatch() {
		for (card of chosenCards) {
				card.classList.remove('open', 'show');
		};
		empty();
}

// Empty the array after checks
function empty() {
		chosenCards = [];
		for(card of cards) {
			card.classList.remove('wrong');
		}
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

/**************************
 *     		 Timer  	 	    *
***************************/

// Turn timer on
function timerOn() {
		if (timer === false) {
				count = setInterval(countTime, 1000);
				timer = true;
		}
}

// Turn timer off
function timerOff() {
		clearInterval(count);
		timer = false;
}

// Main timer function
function countTime() {
		++totalTime;
		secs.innerHTML = pad(totalTime%60);
		mins.innerHTML = pad(parseInt(totalTime/60));
}

// Formatting function for '00'
function pad(val) {
		let valString = val + '';
		if (valString.length < 2) {
				return '0' + valString;
		} else {
				return valString;
		}
}

/**************************
 *      Restart Game      *
***************************/
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
		secs.innerHTML = '00';
		mins.innerHTML = '00';
		if (timer === true) {
				timerOff();
		}
}

/**************************
 *          Modal         *
***************************/

// Update and open modal
function openModal () {
		modalMoves.innerHTML = moves;
		modalSecs.innerHTML = pad(totalTime%60);
		modalMins.innerHTML = pad(parseInt(totalTime/60));
		modal.style.display = 'block';
}

// Close modal Button and restart game
modalClose.onclick = function() {
		restartGame();
		modal.style.display = 'none';
}

// Open Keys Modals
modalKeysOpen.onclick = function() {
		modalKeys.style.display = 'block';
}

// Close Keys modal
modalKeysClose.onclick = function() {
		modalKeys.style.display = 'none';
}

// Close modal if anywhere outside of it is clicked
window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		} else if (event.target == modalKeys) {
			modalKeys.style.display = 'none';
		}
}

/**************************
 *   Keyboard Shortcuts   *
***************************/

document.onkeyup = function(e) {
		if (e.which == 49) {        // 1
				flipCardKeyboard(0);
		} else if (e.which == 50) { // 2
				flipCardKeyboard(1);
		} else if (e.which == 51) { // 3
				flipCardKeyboard(2);
		} else if (e.which == 52) { // 4
				flipCardKeyboard(3);
		} else if (e.which == 81) { // Q
				flipCardKeyboard(4);
		} else if (e.which == 87) { // W
				flipCardKeyboard(5);
		} else if (e.which == 69) { // E
				flipCardKeyboard(6);
		} else if (e.which == 82) { // R
				flipCardKeyboard(7);
		} else if (e.which == 65) { // A
				flipCardKeyboard(8);
		} else if (e.which == 83) { // S
				flipCardKeyboard(9);
		} else if (e.which == 68) { // D
				flipCardKeyboard(10);
		} else if (e.which == 70) { // F
				flipCardKeyboard(11);
		} else if (e.which == 90) { // Z
				flipCardKeyboard(12);
		} else if (e.which == 88) { // X
				flipCardKeyboard(13);
		} else if (e.which == 67) { // C
				flipCardKeyboard(14);
		} else if (e.which == 86) { // V
				flipCardKeyboard(15);
		}
}

// Flips the card with the keyboard
function flipCardKeyboard(card) {
		if (!cards[card].classList.contains('open', 'show', 'match') && chosenCards.length !== 2) {
				cards[card].classList.add('open');
				addChosenCard(cards[card]);
				if (timer === false && pairsRemain > 0) {
						timerOn();
				}
				setTimeout(showCard, 300, cards[card]);
		}
}
