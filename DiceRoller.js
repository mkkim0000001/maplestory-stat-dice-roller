// DiceRoller.js - Core rolling engine for MapleStory stat dice

const CLASSES = {
  WARRIOR: 'Warrior',
  MAGICIAN: 'Magician',
  BOWMAN: 'Bowman',
  THIEF: 'Thief'
};

const MAIN_STATS = {
  [CLASSES.WARRIOR]: 'STR',
  [CLASSES.MAGICIAN]: 'INT',
  [CLASSES.BOWMAN]: 'DEX',
  [CLASSES.THIEF]: 'DEX'
};

const PERFECT_ROLL = 13; // Godlike perfect roll

class DiceRoller {
  constructor() {
    this.perfectRolls = {}; // Track perfect rolls per class
    this.currentRoll = null;
    this.rollHistory = [];
    
    // Initialize perfect roll counters
    Object.values(CLASSES).forEach(className => {
      this.perfectRolls[className] = 0;
    });
  }

  /**
   * Roll a single dice (1-13 range for MapleStory stats)
   */
  rollDice() {
    return Math.floor(Math.random() * 13) + 1; // 1-13
  }

  /**
   * Roll all stats for a given class
   * Returns array of rolls: [STR/INT/DEX roll, other stats...]
   */
  rollStats(mainStatRoll = null) {
    const stats = {
      HP: this.rollDice(),
      MP: this.rollDice(),
      STR: this.rollDice(),
      DEX: this.rollDice(),
      INT: this.rollDice(),
      LUK: this.rollDice()
    };

    // If mainStatRoll is provided, use it; otherwise roll normally
    if (mainStatRoll !== null) {
      stats.mainStat = mainStatRoll;
    }

    return stats;
  }

  /**
   * Simulate rolling until a perfect roll (13) on main stat
   * @param {string} className - Which class to roll for
   * @returns {object} Result with all rolls until perfect, number of attempts
   */
  rollUntilPerfect(className) {
    if (!Object.values(CLASSES).includes(className)) {
      throw new Error(`Invalid class: ${className}. Valid classes: ${Object.values(CLASSES).join(', ')}`);
    }

    const mainStat = MAIN_STATS[className];
    const rolls = [];
    let attempts = 0;
    let mainStatRoll = 0;

    // Keep rolling until we get a 13 on the main stat
    while (mainStatRoll !== PERFECT_ROLL) {
      mainStatRoll = this.rollDice();
      attempts++;

      const stats = this.rollStats();
      stats[mainStat] = mainStatRoll; // Set the main stat roll
      rolls.push({
        attempt: attempts,
        stats: stats,
        isPerfect: mainStatRoll === PERFECT_ROLL
      });
    }

    // Increment perfect roll counter for this class
    this.perfectRolls[className]++;

    const result = {
      class: className,
      mainStat: mainStat,
      totalAttempts: attempts,
      allRolls: rolls,
      perfectRoll: rolls[rolls.length - 1],
      timestamp: new Date().toISOString()
    };

    this.rollHistory.push(result);
    this.currentRoll = result;

    return result;
  }

  /**
   * Get perfect roll statistics for all classes
   */
  getPerfectRollStats() {
    return {
      totalPerfectRolls: Object.values(this.perfectRolls).reduce((a, b) => a + b, 0),
      byClass: { ...this.perfectRolls },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get the last roll result
   */
  getLastRoll() {
    return this.currentRoll;
  }

  /**
   * Get roll history
   */
  getRollHistory(limit = 10) {
    return this.rollHistory.slice(-limit);
  }

  /**
   * Reset all statistics
   */
  reset() {
    this.perfectRolls = {};
    this.currentRoll = null;
    this.rollHistory = [];

    Object.values(CLASSES).forEach(className => {
      this.perfectRolls[className] = 0;
    });
  }

  /**
   * Get available classes
   */
  getClasses() {
    return Object.values(CLASSES);
  }
}

export { DiceRoller, CLASSES, MAIN_STATS, PERFECT_ROLL };
