# MapleStory Stat Dice Roller

A beautiful web-based simulator for rolling stats in classic MapleStory, tracking perfect rolls (13 on main stat) per class.

## Features

- 🎲 **Realistic Dice Rolling**: Simulates rolling stat dice (4-13 range) until achieving a perfect roll (13)
- 👥 **Auto-Class Assignment**: Automatically determines which class achieved the perfect roll based on which main stat rolled a 13
- 📊 **Perfect Roll Tracking**: Tracks and displays perfect roll counts for each class with visual progress bars
- 🎯 **Roll Until Perfect**: Keeps rolling until any class achieves a perfect roll (13) on their main stat
- 🔟 **Roll x10**: Quick mode to roll 10 perfect rolls at once
- 📱 **Beautiful UI**: Modern, responsive web interface with real-time statistics updates
- ♻️ **Reset Function**: Clear all statistics and start fresh

## How Stats Work

Only **4 stats are rolled** (HP and MP are not rolled):
- **STR** (Strength): 4-13
- **DEX** (Dexterity): 4-13
- **INT** (Intelligence): 4-13
- **LUK** (Luck): 4-13

### Class Main Stats

- **Warrior**: STR (needs 13 STR for perfect)
- **Magician**: INT (needs 13 INT for perfect)
- **Bowman**: DEX (needs 13 DEX for perfect)
- **Thief**: DEX (needs 13 DEX for perfect)*

*When DEX rolls a 13, one of Bowman or Thief is randomly selected

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

Then open your browser to:
```
http://localhost:3000
```

### How to Use

1. **Roll Once** - Rolls until the first perfect roll (13) appears on any class's main stat
2. **Roll x10** - Rolls 10 perfect rolls in succession (displays the last one)
3. **Reset** - Clears all statistics and starts fresh

## What Each Button Does

### 🎲 Roll Once
- Continuously rolls all 4 stats until any main stat hits 13
- Shows which class achieved the perfect roll
- Displays all 4 stat values
- Shows the number of attempts it took
- Increments that class's perfect roll counter

### 🔟 Roll x10
- Performs "Roll Once" 10 times automatically
- Updates the statistics with all 10 perfect rolls
- Displays the final roll result
- Great for quickly building up your statistics

### ↺ Reset
- Clears all perfect roll counters back to 0
- Clears the display
- Asks for confirmation before resetting

## Example

When you roll and get:
- STR: 13
- DEX: 8
- INT: 5
- LUK: 7

**Warrior** is awarded 1 perfect roll because they achieved a perfect 13 on their main stat (STR).

## UI Components

- **Result Display**: Shows the last perfect roll with stats and attempt count
- **Statistics Bar**: Visual progress bars showing perfect roll counts per class
- **Total Counter**: Displays total perfect rolls across all classes

## API Endpoints

- `POST /api/roll` - Roll once until perfect
- `POST /api/roll-x10` - Roll 10 perfect rolls
- `GET /api/stats` - Get current statistics
- `POST /api/reset` - Reset all statistics
- `GET /api/history` - Get roll history

## License

MIT
