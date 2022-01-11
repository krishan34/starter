'use strict';

// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// SwitchPalyer funtion.

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// add remove class

// const addClass = function () {

// };

// const removeClass = function () {
//   classList.remove('hidden');
// };

// ROLLING DICE FUNCTIONALITY.

btnRoll.addEventListener('click', function () {
  // generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // check if dice is rolled to one.
  if (dice !== 1) {
    // ADD dice score to current player
    currentScore += dice;
    // Dynamic active player selection
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch player
    // Dynamic active player selection
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // add currentscore to active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // check player >=100
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    //Finish the game
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
  } else {
    // Switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
