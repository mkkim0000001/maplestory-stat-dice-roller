# MapleStory Stat Dice Roller

A simulator for rolling stats in classic MapleStory, tracking perfect rolls (13 on main stat) per class.

## Features

- 🎲 **Realistic Dice Rolling**: Simulates rolling stat dice (1-13 range) until achieving a perfect roll
- 👥 **Multi-Class Support**: Roll for Warrior, Magician, Bowman, Thief, or Pirate
- 📊 **Perfect Roll Tracking**: Automatically tracks and counts perfect rolls (13) on each class's main stat
- 📜 **Roll History**: View detailed history of all attempts and rolls
- 🎯 **Main Stat Focus**: Each class has a designated main stat:
  - **Warrior**: STR
  - **Magician**: INT
  - **Bowman**: DEX
  - **Thief**: DEX
  - **Pirate**: STR

## Installation

```bash
npm install
```

## Usage

Run the application:

```bash
npm start
```

### Commands

| Command | Description |
|---------|-------------|
| `roll <class>` | Roll the specified class until a perfect roll (13) on main stat |
| `stats` | Display perfect roll statistics for all classes |
| `last` | View the last roll result with all attempts |
| `history` | View recent roll history |
| `classes` | List all available classes |
| `reset` | Reset all statistics |
| `help` | Display the help menu |
| `exit` | Quit the program |

### Examples

```
> roll warrior
> roll magician
> stats
> history
> reset
```

## How It Works

1. **Rolling Process**: When you request a roll for a class, the roller continuously rolls the main stat (and all other stats) until it gets a 13 on the main stat.
2. **Perfect Roll**: Once a 13 is achieved, the perfect roll counter for that class increments by 1.
3. **Tracking**: All attempts are recorded and can be viewed to see how many tries it took.

## Example Output

```
🎲 Warrior - PERFECT ROLL ACHIEVED!
Main Stat: STR
Total Attempts: 47
═══════════════════════════════════════════════════════════

📜 Roll History:
  Attempt 1: HP: 8, MP: 6, STR: 3, DEX: 11, INT: 5, LUK: 9
  Attempt 2: HP: 12, MP: 4, STR: 7, DEX: 8, INT: 10, LUK: 2
  ...
  Attempt 47: HP: 5, MP: 9, STR: 13, DEX: 12, INT: 4, LUK: 7 ✨ PERFECT!
```

## Statistics Example

```
📊 PERFECT ROLL STATISTICS
Total Perfect Rolls: 12
───────────────────────────────────────────────────────────
  Warrior     : ████████ 8
  Magician    : ██ 2
  Bowman      : ██ 2
  Thief       : 0
  Pirate      : 0
```

## License

MIT
