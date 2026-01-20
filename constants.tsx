import { BugType } from './types';

export const BUG_DATA: Record<BugType, { emoji: string; points: number; rarity: number }> = {
  [BugType.SCORPION]: { emoji: '🦂', points: 10, rarity: 1 },
  [BugType.BEETLE]: { emoji: '🪲', points: 25, rarity: 3 },
  [BugType.LEAF_INSECT]: { emoji: '🍃', points: 15, rarity: 2 },
  [BugType.EARTHWORM]: { emoji: '🪱', points: 20, rarity: 2 },
  [BugType.LADYBUG]: { emoji: '🐞', points: 5, rarity: 1 },
  [BugType.GRASSHOPPER]: { emoji: '🦗', points: 20, rarity: 2 },
  [BugType.BEE]: { emoji: '🐝', points: 12, rarity: 1 },
  [BugType.HERCULES_BEETLE]: { emoji: '🪲', points: 150, rarity: 6 },
  [BugType.STICK_INSECT]: { emoji: '🎋', points: 35, rarity: 4 },
  [BugType.LARVA]: { emoji: '🐛', points: 10, rarity: 1 },
  [BugType.COCKROACH]: { emoji: '🪳', points: 15, rarity: 2 },
  [BugType.ANT]: { emoji: '🐜', points: 5, rarity: 1 },
  [BugType.MOSQUITO]: { emoji: '🦟', points: 40, rarity: 4 },
  [BugType.SPIDER]: { emoji: '🕷️', points: 25, rarity: 3 },
  [BugType.MULLER_STAG_BEETLE]: { emoji: '🪲', points: 70, rarity: 4 },
  [BugType.STAG_BEETLE]: { emoji: '🪲', points: 90, rarity: 5 },
  [BugType.BORNEO_FLOWER_BEETLE]: { emoji: '🪲', points: 80, rarity: 4 },
  [BugType.JEJU_PYGMY_STAG_BEETLE]: { emoji: '🪲', points: 60, rarity: 3 },
  [BugType.MANTIS]: { emoji: '🦗', points: 50, rarity: 3 },
  [BugType.EMERALD_WASP]: { emoji: '🐝', points: 120, rarity: 5 },
};

export const INITIAL_SETTINGS = {
  duration: 45, // seconds
  spawnRate: 1000, // ms
};