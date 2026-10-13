/**
 * The Escape Room - Storage & State Management
 * 
 * SECURITY NOTICE:
 * Client-side guards and validation can be bypassed via DevTools.
 * They are designed for gameplay flow, narrative progression, and UX only, not security.
 */

(function () {
  'use strict';

  // Namespaced localStorage key
  const STORAGE_KEY = 'escapeRoom.state';

  // Default initial game state
  const DEFAULT_STATE = {
    playerName: '',
    room1Complete: false,
    room2Complete: false,
    attempts: 0
  };

  /**
   * Retrieves the current game state from localStorage.
   * Gracefully falls back to DEFAULT_STATE if parsing fails or data is corrupt.
   * @returns {Object} Current validated game state
   */
  function getState() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return { ...DEFAULT_STATE };
      }
      const parsed = JSON.parse(serialized);
      if (typeof parsed !== 'object' || parsed === null) {
        return { ...DEFAULT_STATE };
      }
      return {
        playerName: typeof parsed.playerName === 'string' ? parsed.playerName : DEFAULT_STATE.playerName,
        room1Complete: Boolean(parsed.room1Complete),
        room2Complete: Boolean(parsed.room2Complete),
        attempts: typeof parsed.attempts === 'number' && !isNaN(parsed.attempts) ? parsed.attempts : DEFAULT_STATE.attempts
      };
    } catch (err) {
      console.warn('Corrupt or inaccessible game state in localStorage. Falling back to default state.', err);
      return { ...DEFAULT_STATE };
    }
  }

  /**
   * Merges partial state updates into existing state and persists to localStorage.
   * @param {Object} patch - Partial state object to merge
   * @returns {Object} Newly saved state
   */
  function saveState(patch) {
    try {
      const current = getState();
      const updated = { ...current, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Failed to save game state to localStorage:', err);
      return getState();
    }
  }

  /**
   * Resets game progress by removing ONLY 'escapeRoom.state' from localStorage.
   * Never clears entire storage so other domain data remains intact.
   */
  function resetState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to reset game state:', err);
    }
  }

  // Export helpers as globals for non-module script tags
  window.getState = getState;
  window.saveState = saveState;
  window.resetState = resetState;
})();
