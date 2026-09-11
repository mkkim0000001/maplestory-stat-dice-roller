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
const TOTAL_STAT_POOL = 25; // Total points to distribute

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
   * Roll a single stat from the remaining pool
   * Takes into account stats that still need to be rolled
   * @param {number} remainingPool - Points left to distribute
   * @param {number} statsLeft - Number of stats still to be rolled (including this one)
   * @returns {number} Rolled stat value
   */
  rollStat(remainingPool, statsLeft) {
    // Reserve minimum 4 points for each stat that hasn't been rolled yet
    const minForRemaining = (statsLeft - 1) * MIN_STAT;
    const availableForThisStat = remainingPool - minForRemaining;
    
    // This stat can be between MIN_STAT and min(13, availableForThisStat)
    const maxRoll = Math.min(13, availableForThisStat);
    const minRoll = Math.min(MIN_STAT, availableForThisStat);
    
    if (minRoll > maxRoll) {
      return remainingPool; // Shouldn't happen, but safety check
    }
    
    return Math.floor(Math.random() * (maxRoll - minRoll + 1)) + minRoll;
  }

  /**
   * Roll all stats from a shared pool (total 25)
   * Stats are rolled in random order to avoid bias
   * Each stat is guaranteed to be at least 4
   */
  rollStats() {
    let remainingPool = TOTAL_STAT_POOL;
    const stats = {
      STR: 0,
      DEX: 0,
      INT: 0,
      LUK: 0
    };

    // Randomize order to avoid any stat getting advantage
    const statNames = ['STR', 'DEX', 'INT', 'LUK'];
    const shuffledStats = statNames.sort(() => Math.random() - 0.5);

    // Roll stats in random order
    for (let i = 0; i < shuffledStats.length; i++) {
      const statName = shuffledStats[i];
      const statsLeft = shuffledStats.length - i;
      
      if (i === shuffledStats.length - 1) {
        // Last stat gets whatever is left
        stats[statName] = remainingPool;
      } else {
        stats[statName] = this.rollStat(remainingPool, statsLeft);
        remainingPool -= stats[statName];
      }
    }

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
      maxPossible: TOTAL_STAT_POOL,
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

export { DiceRoller, CLASSES, MAIN_STATS, PERFECT_ROLL, TOTAL_STAT_POOL };
