// Shuffle deck
let deck = document.querySelector('.deck'); // Get the deck ul
let temp = deck.cloneNode(true); // Clone list

    // Shuffle cloned list
function shuffle() {
    for (var i = temp.children.length + 1; i--; ) {
        temp.appendChild(temp.children[Math.random() * i |0]);
    };
    deck.parentNode.replaceChild(temp, deck); // Replace clone with original
}
shuffle();





const cards = document.querySelectorAll('.card');

function flipCard () {
  this.classList.toggle('open')
}
cards.forEach(card => card.addEventListener('click', flipCard))
