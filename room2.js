js/
 * Room 2 Logic - The Laboratory
 * Handles guard redirects, reagent sequence tracking, and exit door unlocking.
 */

(function () {
  'use strict';

  // State guard on load
  const state = getState();
  if (!state.room1Complete) {
    // Redirect if Room 1 is not finished
    window.location.replace('index.html');
    return;
  }

  // DOM Elements
  const greetingEl = document.getElementById('lab-greeting');
  const buttonGroup = document.getElementById('sequence-buttons');
  const reagentButtons = document.querySelectorAll('.reagent-btn');
  const feedbackEl = document.getElementById('lab-feedback');
  const exitLink = document.getElementById('exit-link');
  const dots = [
    document.getElementById('dot-1'),
    document.getElementById('dot-2'),
    document.getElementById('dot-3')
  ];

  // Sequence state
  const TARGET_SEQUENCE = ['Blue', 'Red', 'Green'];
  let currentClicks = [];
  let isLocked = false;

  /**
   * Initializes Room 2 DOM state and greeting.
   */
  function initRoom2() {
    // Requirement: Greet using textContent
    const name = state.playerName && state.playerName.trim() ? state.playerName.trim() : 'Investigator';
    greetingEl.textContent = `Welcome to the Lab, ${name}.`;

    // If already completed in this session, keep exit link accessible
    if (state.room2Complete) {
      exitLink.removeAttribute('hidden');
      feedbackEl.textContent = 'Containment locks released. Exit path is open.';
      feedbackEl.className = 'feedback-message success';
    }
  }

  /**
   * Updates visual progress dots based on current sequence length.
   */
  function updateProgressDots() {
    dots.forEach((dot, index) => {
      if (index < currentClicks.length) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Evaluates the sequence after 3 clicks have been recorded.
   */
  function evaluateSequence() {
    isLocked = true;
    const isCorrect =
      currentClicks.length === 3 &&
      currentClicks[0] === TARGET_SEQUENCE[0] &&
      currentClicks[1] === TARGET_SEQUENCE[1] &&
      currentClicks[2] === TARGET_SEQUENCE[2];

    if (isCorrect) {
      // Correct sequence: persist completion and reveal exit link
      saveState({ room2Complete: true });
      feedbackEl.textContent = 'Formula stabilized! The heavy containment hatch unlocks.';
      feedbackEl.className = 'feedback-message success';

      exitLink.removeAttribute('hidden');
      exitLink.focus();
      isLocked = false;
    } else {
      // Wrong sequence: increment attempts and give aria-live error feedback
      const currentState = getState();
      saveState({ attempts: (currentState.attempts || 0) + 1 });

      feedbackEl.textContent = 'Reaction destabilized! The sequence resets.';
      feedbackEl.className = 'feedback-message error';

      // Shake the button group
      buttonGroup.classList.remove('shake');
      void buttonGroup.offsetWidth; // Trigger reflow
      buttonGroup.classList.add('shake');

      buttonGroup.addEventListener(
        'animationend',
        () => {
          buttonGroup.classList.remove('shake');
          // Reset tracking array and progress dots
          currentClicks = [];
          updateProgressDots();
          isLocked = false;
        },
        { once: true }
      );
    }
  }

  /**
   * Handles clicks on reagent buttons.
   * @param {Event} event 
   */
  function handleReagentClick(event) {
    if (isLocked) return;

    const btn = event.currentTarget;
    const color = btn.getAttribute('data-color');
    if (!color) return;

    currentClicks.push(color);
    updateProgressDots();

    if (currentClicks.length === 3) {
      evaluateSequence();
    }
  }

  // Attach event listeners to reagent buttons
  reagentButtons.forEach((btn) => {
    btn.addEventListener('click', handleReagentClick);
  });

  // Run initialization
  initRoom2();
})();
