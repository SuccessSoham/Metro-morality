
import React from 'react';
import { Player, PlayerChoice } from '../types';

interface EndScreenProps {
  player: Player;
  choices: PlayerChoice[];
  finalMessage: string;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ player, choices, finalMessage, onRestart }) => {
  const totalTimeSpent = choices.reduce((acc, choice) => acc + choice.timeCost, 0);

  const handleDownloadChoices = () => {
    const data = JSON.stringify(choices, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metro-morality-choices.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-black bg-opacity-50 rounded-lg p-8 shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Journey's End, {player.name}</h1>
      <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl">{finalMessage}</p>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Decisions</h2>
        <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {choices.map((choice, index) => (
            <li key={index} className="bg-gray-700 p-3 rounded-md">
              <p className="font-bold text-gray-200">{index + 1}. {choice.sceneTitle}</p>
              <p className="text-cyan-300 pl-4">"{choice.choiceText}"</p>
              <p className="text-right text-sm text-red-400">- {choice.timeCost} seconds</p>
            </li>
          ))}
        </ul>
        <div className="text-right mt-4 font-bold text-lg text-red-400 border-t border-gray-600 pt-2">
            Total Time Cost: {totalTimeSpent} seconds
        </div>
      </div>
      
      <p className="text-gray-400 mb-6 text-center">This game is a tool for psychological reflection. There are no right or wrong answers, only choices and their consequences.</p>

      <div className="flex space-x-4">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-bold text-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          Play Again
        </button>
        <button
          onClick={handleDownloadChoices}
          className="px-8 py-4 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-bold text-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Download Choices
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
