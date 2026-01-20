
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GameState,
  BugType,
  BugInstance,
  WebInstance,
  CaughtBug
} from './types';
import { BUG_DATA, INITIAL_SETTINGS } from './constants';
import BugComponent from './components/BugComponent';
import WebComponent from './components/WebComponent';
import Encyclopedia from './components/Encyclopedia';
import { getBugFact } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_SETTINGS.duration);
  const [bugs, setBugs] = useState<BugInstance[]>([]);
  const [webs, setWebs] = useState<WebInstance[]>([]);
  const [caughtBugs, setCaughtBugs] = useState<Record<BugType, CaughtBug>>({} as any);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [lastCaughtBug, setLastCaughtBug] = useState<{ type: BugType, isNewFact: boolean } | null>(null);

  const spawnTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moveTimerRef = useRef<number | null>(null);
  const gameClockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnWeb = useCallback(() => {
    const id = Math.random().toString(36).substr(2, 9);
    const newWeb: WebInstance = {
      id,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: Math.random() * 50 + 80,
      angle: Math.random() * 360,
    };
    setWebs(prev => [...prev.slice(-6), newWeb]);
  }, []);

  const spawnBug = useCallback(() => {
    const types = Object.values(BugType);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const id = Math.random().toString(36).substr(2, 9);

    if (randomType === BugType.SPIDER && Math.random() < 0.5) {
      spawnWeb();
    }

    let baseSize = 30;
    if (randomType === BugType.HERCULES_BEETLE) baseSize = 85;
    else if (randomType === BugType.STICK_INSECT) baseSize = 120;
    else if (randomType === BugType.LEAF_INSECT) baseSize = 80;
    else if (randomType === BugType.MULLER_STAG_BEETLE) baseSize = 120;
    else if (randomType === BugType.ANT) baseSize = 15;
    else if (randomType === BugType.MOSQUITO) baseSize = 20;
    else if (randomType === BugType.EARTHWORM) baseSize = 25;
    else if (randomType === BugType.SPIDER) baseSize = 35;

    const randomSize = Math.random() * 15 + baseSize;

    let speed = Math.random() * 0.2 + 0.1;
    if (randomType === BugType.LARVA) speed = Math.random() * 0.1 + 0.05;
    else if (randomType === BugType.COCKROACH) speed = Math.random() * 0.2 + 0.4;
    else if (randomType === BugType.MOSQUITO) speed = Math.random() * 0.3 + 0.5;
    else if (randomType === BugType.HERCULES_BEETLE) speed = 0.15;
    else if (randomType === BugType.EARTHWORM) speed = 0.08;
    else if (randomType === BugType.SPIDER) speed = Math.random() * 0.15 + 0.3;

    const newBug: BugInstance = {
      id,
      type: randomType,
      emoji: BUG_DATA[randomType].emoji,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      size: randomSize,
      speed: speed,
      angle: Math.random() * 360,
    };

    setBugs(prev => [...prev.slice(-15), newBug]);
  }, [spawnWeb]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_SETTINGS.duration);
    setBugs([]);
    setWebs([]);
    setGameState(GameState.PLAYING);
  };

  const catchBug = useCallback((id: string) => {
    const bug = bugs.find(b => b.id === id);
    if (!bug) return;

    // 1. 즉시 UI 피드백 (점수, 벌레 제거, 알림 표시)
    const points = BUG_DATA[bug.type].points;
    setScore(prev => prev + points);
    setBugs(prev => prev.filter(b => b.id !== id));
    setLastCaughtBug({ type: bug.type, isNewFact: true });

    // 알림은 2초 뒤에 사라짐
    setTimeout(() => setLastCaughtBug(null), 2000);

    // 2. 즉시 카운트 데이터 업데이트
    setCaughtBugs(prev => {
      const existing = prev[bug.type];
      return {
        ...prev,
        [bug.type]: {
          type: bug.type,
          count: (existing?.count || 0) + 1,
          funFacts: existing?.funFacts || []
        }
      };
    });

    // 3. 백그라운드에서 지식 정보 가져오기 (비동기)
    getBugFact(bug.type).then(newFact => {
      setCaughtBugs(prev => {
        const existing = prev[bug.type];
        if (!existing) return prev;
        // 중복 방지
        if (existing.funFacts.includes(newFact)) return prev;
        return {
          ...prev,
          [bug.type]: {
            ...existing,
            funFacts: [newFact, ...existing.funFacts].slice(0, 10)
          }
        };
      });
    }).catch(err => console.error("Fact fetch failed", err));

  }, [bugs]);

  const clearWeb = (id: string) => {
    setWebs(prev => prev.filter(w => w.id !== id));
    setScore(prev => prev + 5);
  };

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      spawnTimerRef.current = setInterval(spawnBug, INITIAL_SETTINGS.spawnRate);
      const webInterval = setInterval(() => {
        if (Math.random() < 0.35) spawnWeb();
      }, 5000);
      gameClockRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState(GameState.GAME_OVER);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(webInterval);
      };
    } else {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameClockRef.current) clearInterval(gameClockRef.current);
    }
  }, [gameState, spawnBug, spawnWeb]);

  useEffect(() => {
    const updateBugs = () => {
      if (gameState === GameState.PLAYING) {
        setBugs(prev => prev.map(bug => {
          let newAngle = bug.angle;
          if (bug.x < 5 || bug.x > 95 || bug.y < 10 || bug.y > 85) {
            newAngle = bug.angle + 180 + (Math.random() - 0.5) * 45;
          }
          const inWeb = webs.some(web => {
            const dx = bug.x - web.x;
            const dy = bug.y - web.y;
            return Math.sqrt(dx * dx + dy * dy) < 10;
          });
          const currentSpeed = inWeb ? bug.speed * 0.35 : bug.speed;
          return {
            ...bug,
            x: bug.x + Math.sin(newAngle * (Math.PI / 180)) * currentSpeed,
            y: bug.y + Math.cos(newAngle * (Math.PI / 180)) * currentSpeed,
            angle: newAngle
          };
        }));
        moveTimerRef.current = requestAnimationFrame(updateBugs);
      }
    };
    if (gameState === GameState.PLAYING) {
      moveTimerRef.current = requestAnimationFrame(updateBugs);
    }
    return () => {
      if (moveTimerRef.current) cancelAnimationFrame(moveTimerRef.current);
    };
  }, [gameState, webs]);

  return (
    <div className="relative w-full h-screen bg-[url('https://picsum.photos/id/116/1600/900')] bg-cover bg-center overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-green-900/10 pointer-events-none"></div>

      <header className="relative z-30 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-green-600 text-white px-4 py-2 rounded-2xl shadow-inner flex flex-col items-center">
            <span className="text-xs uppercase font-bold opacity-80">Score</span>
            <span className="text-2xl font-jua">{score}</span>
          </div>
          <div className={`px-4 py-2 rounded-2xl shadow-inner flex flex-col items-center ${timeLeft < 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-400 text-amber-900'}`}>
            <span className="text-xs uppercase font-bold opacity-80">Time</span>
            <span className="text-2xl font-jua">{timeLeft}s</span>
          </div>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-jua text-green-800 hidden md:block">
          곤충 탐험대
        </h1>

        <button
          onClick={() => setShowEncyclopedia(true)}
          className="bg-white border-2 border-green-600 text-green-700 px-4 py-2 rounded-2xl font-bold hover:bg-green-50 transition-all shadow-sm flex items-center gap-2"
        >
          📖 도감 보기
        </button>
      </header>

      {lastCaughtBug && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-white/95 px-6 py-3 rounded-2xl shadow-xl border-2 border-green-400 animate-bounce text-center pointer-events-none">
          <p className="font-bold text-green-800 text-lg">{lastCaughtBug.type} 포획 성공! ✨</p>
          <p className="text-xs text-green-600">도감에 새로운 지식이 추가되었습니다!</p>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        {gameState === GameState.PLAYING && webs.map(web => (
          <WebComponent key={web.id} web={web} onClear={clearWeb} />
        ))}

        {gameState === GameState.PLAYING && bugs.map(bug => (
          <BugComponent key={bug.id} bug={bug} onCatch={catchBug} />
        ))}

        {gameState === GameState.START && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl text-center max-w-sm w-full mx-4 border-b-8 border-green-200">
              <div className="text-7xl mb-6">🦟</div>
              <h2 className="text-4xl font-jua text-green-800 mb-4">곤충 탐험대</h2>
              <div className="text-gray-600 mb-8 space-y-2 leading-relaxed">
                <p>숲속에 숨어있는 신비로운 곤충들을 찾아보세요!</p>
                <p className="text-sm">클릭 즉시 포획되며, 도감에 지식이 쌓여요!</p>
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 mt-4">
                  <p className="text-sm text-amber-700 font-bold">🕸️ 거미줄 주의!</p>
                  <p className="text-xs text-amber-600">거미줄은 곤충을 느리게 만듭니다.<br />클릭해서 제거하고 5점을 받으세요!</p>
                </div>
              </div>
              <button
                onClick={startGame}
                className="w-full bg-green-600 text-white text-2xl font-jua py-4 rounded-3xl hover:bg-green-700 hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                탐험 시작!
              </button>
            </div>
          </div>
        )}

        {gameState === GameState.GAME_OVER && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl text-center max-w-sm w-full mx-4 border-b-8 border-amber-200">
              <h2 className="text-3xl font-jua text-amber-600 mb-2">시간 종료!</h2>
              <div className="text-6xl font-jua text-green-700 my-6">{score}점</div>
              <p className="text-gray-600 mb-8">
                멋진 탐험이었어요! <br /> 도관에서 수집한 다양한 지식을 확인해 보세요.
              </p>
              <div className="space-y-3">
                <button
                  onClick={startGame}
                  className="w-full bg-green-600 text-white text-xl font-jua py-3 rounded-2xl hover:bg-green-700 transition-all shadow-lg"
                >
                  다시 도전하기
                </button>
                <button
                  onClick={() => setShowEncyclopedia(true)}
                  className="w-full bg-amber-500 text-white text-xl font-jua py-3 rounded-2xl hover:bg-amber-600 transition-all shadow-lg"
                >
                  도감 확인하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showEncyclopedia && (
        <Encyclopedia caughtBugs={caughtBugs} onClose={() => setShowEncyclopedia(false)} />
      )}
    </div>
  );
};

export default App;
