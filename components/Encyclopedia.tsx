
import React from 'react';
import { CaughtBug, BugType } from '../types';
import { BUG_DATA } from '../constants';
import HerculesBeetleIcon from './HerculesBeetleIcon';
import LeafInsectIcon from './LeafInsectIcon';
import StickInsectIcon from './StickInsectIcon';

interface EncyclopediaProps {
  caughtBugs: Record<BugType, CaughtBug>;
  onClose: () => void;
}

const Encyclopedia: React.FC<EncyclopediaProps> = ({ caughtBugs, onClose }) => {
  const bugEntries = Object.values(BugType).map(type => ({
    type,
    data: BUG_DATA[type],
    caught: caughtBugs[type]
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 bg-green-600 text-white flex justify-between items-center shadow-lg">
          <div>
            <h2 className="text-3xl font-jua">탐험 도감</h2>
            <p className="text-xs opacity-80 mt-1">곤충을 잡을수록 더 많은 지식을 발견합니다!</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:rotate-90 transition-transform duration-300 text-3xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-green-50">
          {bugEntries.map((entry) => (
            <div
              key={entry.type}
              className={`flex flex-col p-5 rounded-3xl border-2 transition-all ${entry.caught ? 'bg-white border-green-200 shadow-sm' : 'bg-gray-100 border-gray-200 opacity-60'
                }`}
            >
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-6 bg-green-100 p-4 rounded-full min-w-[90px] h-[90px] flex justify-center items-center shadow-inner">
                  {entry.caught ? (
                    entry.type === BugType.HERCULES_BEETLE ? (
                      <HerculesBeetleIcon size={60} />
                    ) : entry.type === BugType.LEAF_INSECT ? (
                      <LeafInsectIcon size={60} />
                    ) : entry.type === BugType.STICK_INSECT ? (
                      <StickInsectIcon size={60} />
                    ) : (
                      entry.data.emoji
                    )
                  ) : (
                    '❓'
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {entry.caught ? entry.type : '미발견 곤충'}
                      </h3>
                      <span className="flex items-center bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg text-xs font-black border border-amber-200">
                        ⭐ {entry.data.points}P
                      </span>
                    </div>
                    {entry.caught && (
                      <div className="flex flex-col items-end">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1">
                          {entry.caught.count}회 채집
                        </span>
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                          {entry.caught.funFacts.length} Knowledge found
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {entry.caught && entry.caught.funFacts.length > 0 ? (
                <div className="space-y-3 mt-2">
                  <p className="text-xs font-bold text-green-700 border-b border-green-100 pb-1">발견한 생태 정보</p>
                  <ul className="space-y-2">
                    {entry.caught.funFacts.map((fact, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700 leading-snug items-start">
                        <span className="text-green-500 mt-1 flex-shrink-0">🌿</span>
                        <span className={`${idx === 0 ? 'font-bold text-gray-900' : 'text-gray-600 opacity-80'}`}>
                          {fact}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic ml-2 mt-2">
                  {entry.caught ? "정보를 수집하는 중입니다..." : "이 곤충을 채집하여 생태 지식을 획득하세요!"}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="bg-green-600 text-white w-full py-4 rounded-3xl font-jua text-xl hover:bg-green-700 transition-all shadow-xl active:scale-95"
          >
            숲으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Encyclopedia;
