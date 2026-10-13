/**
 * Success Page Logic - The Escape
 * Handles victory presentation, escape statistics, and game state reset.
 */

(function () {
  'use strict';

  // Guard on load: ensure Room 2 was completed
  const state = getState();
  if (!state.room2Complete) {
    window.location.replace('index.html');
    return;
  }

  // DOM Elements
  const escapeTitle = document.getElementById('escape-title');
  const attemptsDisplay = document.getElementById('attempts-display');
  const flawlessContainer = document.getElementById('flawless-container');
  const playAgainBtn = document.getElementById('play-again-btn');

  /**
   * Populates celebratory statistics using safe textContent.
   */
  function initSuccessPage() {
    const name = state.playerName && state.playerName.trim() ? state.playerName.trim() : 'Investigator';
    
    // Requirement: Show "You escaped, [Name]!" using textContent
    escapeTitle.textContent = `You escaped, ${name}!`;

    const attempts = typeof state.attempts === 'number' ? state.attempts : 0;
    
    // Requirement: Show "Total failed attempts: [attempts]"
    attemptsDisplay.textContent = `Total failed attempts: ${attempts}`;

    // Requirement: If attempts is 0, show "Flawless escape!"
    if (attempts === 0) {
      const badge = document.createElement('span');
      badge.className = 'flawless-badge';
      badge.textContent = 'Flawless escape!';
      flawlessContainer.appendChild(badge);
    }
  }

  /**
   * Resets game state and redirects to index.html
   */
  function handlePlayAgain() {
    // Calls resetState() which removes only 'escapeRoom.state'
    resetState();
    window.location.href = 'index.html';
  }

  playAgainBtn.addEventListener('click', handlePlayAgain);

  // Initialize view
  initSuccessPage();
})();
