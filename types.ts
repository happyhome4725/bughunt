
export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export enum BugType {
  SCORPION = '전갈',
  BEETLE = '풍이',
  LEAF_INSECT = '잎사귀벌레',
  EARTHWORM = '지렁이',
  LADYBUG = '무당벌레',
  GRASSHOPPER = '메뚜기',
  BEE = '꿀벌',
  HERCULES_BEETLE = '헤라클레스장수풍뎅이',
  STICK_INSECT = '대벌레',
  LARVA = '유충',
  COCKROACH = '바퀴벌레',
  ANT = '개미',
  MOSQUITO = '모기',
  SPIDER = '거미'
}

export interface BugInstance {
  id: string;
  type: BugType;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  emoji: string;
}

export interface WebInstance {
  id: string;
  x: number;
  y: number;
  size: number;
  angle: number;
}

export interface CaughtBug {
  type: BugType;
  count: number;
  funFacts: string[];
}

export interface GameSettings {
  duration: number;
  spawnRate: number;
}
