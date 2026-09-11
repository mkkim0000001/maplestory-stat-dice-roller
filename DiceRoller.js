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

const PERFECT_ROLL = 13;
const MIN_STAT = 4;
const MAX_STAT = 13;
const MAX_TOTAL_STATS = 25; // 13 + 4 + 4 + 4

class DiceRoller {
  constructor() {
    this.perfectRolls = {}; // Track perfect rolls per class
    this.rollHistory = [];
    
    // Initialize perfect roll counters
    Object.values(CLASSES).forEach(className => {
      this.perfectRolls[className] = 0;
    });
  }

  /**
   * Roll a single stat (4-13 range for MapleStory stats)
   */
  rollStat() {
    return Math.floor(Math.random() * (MAX_STAT - MIN_STAT + 1)) + MIN_STAT; // 4-13
  }

  /**
   * Roll all stats (STR, DEX, INT, LUK)
   * Returns object with all 4 stats
   */
  rollStats() {
    const stats = {
      STR: this.rollStat(),
      DEX: this.rollStat(),
      INT: this.rollStat(),
      LUK: this.rollStat()
    };

    return stats;
  }

  /**
   * Calculate total of all stats
   */
  calculateTotal(stats) {
    return stats.STR + stats.DEX + stats.INT + stats.LUK;
  }

  /**
   * Determine which class got the perfect roll based on main stats
   * @param {object} stats - The rolled stats
   * @returns {string|null} - Class name or null if no perfect roll
   */
  getClassWithPerfectRoll(stats) {
    if (stats.STR === PERFECT_ROLL) {
      // Both Warrior and Pirate have STR, but we only have Warrior
      return CLASSES.WARRIOR;
    }
    if (stats.INT === PERFECT_ROLL) {
      return CLASSES.MAGICIAN;
    }
    if (stats.DEX === PERFECT_ROLL) {
      // Both Bowman and Thief have DEX - randomly assign
      return Math.random() < 0.5 ? CLASSES.BOWMAN : CLASSES.THIEF;
    }
    return null;
  }

  /**
   * Roll until any class gets a perfect roll (13) on their main stat
   * @returns {object} Result with stats, class, attempts, total, and timestamp
   */
  rollUntilPerfect() {
    let attempts = 0;
    let stats = null;
    let perfectClass = null;

    // Keep rolling until we get a perfect roll on any main stat
    while (!perfectClass) {
      stats = this.rollStats();
      attempts++;
      perfectClass = this.getClassWithPerfectRoll(stats);
    }

    // Increment perfect roll counter for this class
    this.perfectRolls[perfectClass]++;

    const total = this.calculateTotal(stats);

    const result = {
      stats: stats,
      class: perfectClass,
      mainStat: MAIN_STATS[perfectClass],
      attempts: attempts,
      total: total,
      maxPossible: MAX_TOTAL_STATS,
      timestamp: new Date().toISOString()
    };

    this.rollHistory.push(result);

    return result;
  }

  /**
   * Roll multiple times until target perfect rolls is reached
   * @param {number} targetPerfectRolls - Number of perfect rolls to achieve
   * @returns {array} Array of all results
   */
  rollUntilTarget(targetPerfectRolls) {
    const results = [];
    let currentPerfectCount = Object.values(this.perfectRolls).reduce((a, b) => a + b, 0);
    const targetTotal = currentPerfectCount + targetPerfectRolls;

    while (currentPerfectCount < targetTotal) {
      const result = this.rollUntilPerfect();
      results.push(result);
      currentPerfectCount++;
    }

    return results;
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
   * Get roll history
   */
  getRollHistory() {
    return this.rollHistory;
  }

  /**
   * Reset all statistics
   */
  reset() {
    this.perfectRolls = {};
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

export { DiceRoller, CLASSES, MAIN_STATS, PERFECT_ROLL, MAX_TOTAL_STATS };
