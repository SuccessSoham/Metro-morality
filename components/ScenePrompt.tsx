
import React, { useState, useEffect, useCallback } from 'react';
import { SceneData } from '../types';

interface ScenePromptProps {
  scene: SceneData;
  onSelectChoice: (choiceIndex: number) => void;
}

const ScenePrompt: React.FC<ScenePromptProps> = ({ scene, onSelectChoice }) => {
  const [selectedChoice, setSelectedChoice] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'ArrowUp') {
      setSelectedChoice(prev => (prev > 0 ? prev - 1 : scene.choices.length - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedChoice(prev => (prev < scene.choices.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      onSelectChoice(selectedChoice);
    }
  }, [scene.choices.length, onSelectChoice, selectedChoice]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-gray-800 border border-cyan-500 rounded-lg p-8 max-w-2xl w-full shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">{scene.title}</h2>
        <p className="text-gray-300 mb-6">{scene.description}</p>
        
        <div className="flex flex-col gap-3">
          {scene.choices.map((choice, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-md cursor-pointer transition-all duration-200 ${
                selectedChoice === index
                  ? 'border-cyan-500 bg-cyan-900/50 scale-105'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setSelectedChoice(index)}
            >
              <p className="font-semibold">{choice.text}</p>
              <p className="text-sm text-red-400 mt-1">⏱ –{choice.timeCost} seconds</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-gray-400 font-mono text-sm">
            Use <kbd className="px-2 py-1 border border-gray-600 rounded bg-gray-900">↑</kbd> <kbd className="px-2 py-1 border border-gray-600 rounded bg-gray-900">↓</kbd> to navigate, <kbd className="px-2 py-1 border border-gray-600 rounded bg-gray-900">Enter</kbd> to confirm.
        </div>
      </div>
    </div>
  );
};

export default ScenePrompt;
