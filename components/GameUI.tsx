
import React, { useState, useEffect, useRef } from 'react';
import { Player, SceneData, GameStatus } from '../types';
import Character from './Character';
import StatsDisplay from './StatsDisplay';
import ScenePrompt from './ScenePrompt';
import { PLATFORM_WIDTH_PERCENT, CHARACTER_SPEED, SCENE_DATA } from '../constants';

interface GameUIProps {
  player: Player;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  currentScene: SceneData;
  gameStatus: GameStatus;
  onChoice: (choiceIndex: number) => void;
  onSceneTrigger: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ player, timeLeft, setTimeLeft, currentScene, gameStatus, onChoice, onSceneTrigger }) => {
  const [characterX, setCharacterX] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Timer effect
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStatus, setTimeLeft]);

  // Keyboard movement effect
  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameAreaRef.current) return;
      const gameAreaWidth = gameAreaRef.current.offsetWidth;
      const characterWidth = 50; // approx width of character
      
      let newX = characterX;
      if (e.key === 'ArrowRight') {
        newX += CHARACTER_SPEED;
      } else if (e.key === 'ArrowLeft') {
        newX -= CHARACTER_SPEED;
      }
      // Clamp position within game area
      const maxPosition = gameAreaWidth - characterWidth;
      setCharacterX(Math.max(0, Math.min(newX, maxPosition)));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [characterX, gameStatus]);
  
  // Scene trigger effect
  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING || !gameAreaRef.current) return;
    
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    const triggerPx = (currentScene.triggerPosition / 100) * gameAreaWidth;
    
    if (characterX >= triggerPx) {
      onSceneTrigger();
    }
  }, [characterX, currentScene, onSceneTrigger, gameStatus]);


  const getProgress = () => {
    if (!gameAreaRef.current) return 0;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    return (characterX / gameAreaWidth) * 100;
  };

  return (
    <div className="w-full flex flex-col relative">
        <StatsDisplay
          timeLeft={timeLeft}
          currentCheckpoint={currentScene.id}
          totalCheckpoints={SCENE_DATA.length}
          distanceToTrain={timeLeft * 10} // Example calculation
        />
        {gameStatus === GameStatus.SCENE_PROMPT && <ScenePrompt scene={currentScene} onSelectChoice={onChoice} />}
        
        <div className="w-full h-[400px] bg-gray-800 border-4 border-gray-700 rounded-lg mt-20 relative overflow-hidden shadow-lg" ref={gameAreaRef}>
            {/* Background elements */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-yellow-500 to-yellow-600 border-t-8 border-yellow-400"></div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-900 to-transparent opacity-50"></div>
            <div className="absolute w-full h-full" style={{backgroundImage: 'linear-gradient(rgba(31, 41, 55, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(31, 41, 55, 0.8) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600"></div>

            {/* Train Track */}
            <div className="absolute bottom-6 w-full h-8 bg-gray-900 flex flex-col justify-around">
                <div className="h-1 bg-gray-500"></div>
                <div className="h-1 bg-gray-500"></div>
            </div>

            {/* Scene trigger visualizations */}
            {SCENE_DATA.map(scene => (
                 <div key={scene.id} className="absolute top-0 h-full w-2" style={{left: `${scene.triggerPosition}%`}}>
                    <div className={`h-full w-full ${scene.id <= currentScene.id ? 'bg-cyan-500/20' : 'bg-red-500/20'}`}></div>
                 </div>
            ))}

            <div className="absolute bottom-24 transition-all duration-300 ease-linear" style={{ left: `${characterX}px` }}>
                <Character gender={player.gender} position={characterX} />
            </div>
        </div>

         <div className="w-full mt-4">
            <p className="text-center text-gray-400 font-mono">Use Arrow Keys to Move</p>
         </div>
    </div>
  );
};

export default GameUI;
