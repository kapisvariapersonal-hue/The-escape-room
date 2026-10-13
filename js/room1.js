/**
 * Room 1 Logic - The Library
 * Handles player name registration, clue reveal interactions, and door passcode verification.
 */

(function () {
  'use strict';

  // DOM Elements
  const greetingEl = document.getElementById('player-greeting');
  const nameSection = document.getElementById('name-section');
  const nameForm = document.getElementById('name-form');
  const nameInput = document.getElementById('player-name-input');
  const nameError = document.getElementById('name-error');

  const puzzleSection = document.getElementById('puzzle-section');
  const hiddenWordEl = document.getElementById('hidden-clue-word');
  const revealBtn = document.getElementById('reveal-clue-btn');

  const doorForm = document.getElementById('door-form');
  const passcodeInput = document.getElementById('passcode-input');
  const doorFeedback = document.getElementById('door-feedback');

  let clueTimer = null;

  /**
   * Updates greeting and reveals puzzle section when a player name is set.
   * @param {string} name - Player name
   */
  function showPuzzleForPlayer(name) {
    greetingEl.textContent = `Welcome, ${name}.`;
    greetingEl.removeAttribute('hidden');

    nameSection.hidden = true;
    puzzleSection.removeAttribute('hidden');
    passcodeInput.focus();
  }

  /**
   * Initializes page state from localStorage on load.
   */
  function initRoom1() {
    const state = getState();
    if (state.playerName && state.playerName.trim().length > 0) {
      showPuzzleForPlayer(state.playerName.trim());
    } else {
      nameSection.removeAttribute('hidden');
      puzzleSection.hidden = true;
      nameInput.focus();
    }
  }

  /**
   * Validates and submits the player name form.
   */
  function handleNameSubmit(event) {
    event.preventDefault();
    nameError.textContent = '';

    const trimmedName = nameInput.value.trim();

    // Acceptance Criteria: 1-20 characters required
    if (trimmedName.length < 1 || trimmedName.length > 20) {
      nameError.textContent = 'Please enter a name between 1 and 20 characters.';
      nameInput.focus();
      return;
    }

    // Persist name to localStorage and update DOM
    saveState({ playerName: trimmedName });
    showPuzzleForPlayer(trimmedName);
  }

  /**
   * Touch fallback: reveals the hidden word for 3 seconds.
   */
  function handleRevealClue() {
    if (clueTimer) {
      clearTimeout(clueTimer);
    }

    hiddenWordEl.classList.add('revealed');
    revealBtn.setAttribute('aria-expanded', 'true');

    clueTimer = setTimeout(() => {
      hiddenWordEl.classList.remove('revealed');
      revealBtn.setAttribute('aria-expanded', 'false');
      clueTimer = null;
    }, 3000);
  }

  /**
   * Handles passcode submission for Room 1 door.
   */
  function handleDoorSubmit(event) {
    event.preventDefault();
    doorFeedback.textContent = '';
    doorFeedback.className = 'feedback-message';

    const inputVal = passcodeInput.value.trim().toUpperCase();

    // Correct passcode check (case-insensitive, trimmed)
    if (inputVal === 'LANTERN') {
      doorFeedback.textContent = 'The passcode clicks into place. The oak door swings open!';
      doorFeedback.classList.add('success');

      // Update state and navigate to Room 2
      saveState({ room1Complete: true });
      setTimeout(() => {
        window.location.href = 'room2.html';
      }, 500);
      return;
    }

    // Wrong answer: increment failed attempts
    const currentState = getState();
    saveState({ attempts: (currentState.attempts || 0) + 1 });

    // Show aria-live error feedback
    doorFeedback.textContent = "The door doesn't budge.";
    doorFeedback.classList.add('error');

    // Trigger shake animation and remove on animationend for replayability
    passcodeInput.classList.remove('shake');
    // Force DOM reflow to allow immediate re-trigger if already shaking
    void passcodeInput.offsetWidth;
    passcodeInput.classList.add('shake');

    passcodeInput.addEventListener(
      'animationend',
      () => {
        passcodeInput.classList.remove('shake');
      },
      { once: true }
    );

    passcodeInput.select();
  }

  // Event Listeners
  nameForm.addEventListener('submit', handleNameSubmit);
  revealBtn.addEventListener('click', handleRevealClue);
  doorForm.addEventListener('submit', handleDoorSubmit);

  // Initialize on load
  initRoom1();
})();
