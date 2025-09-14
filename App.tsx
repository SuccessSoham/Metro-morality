
import React, { useState, useCallback, useEffect } from 'react';
import { Gender, Player, GameStatus, PlayerChoice } from './types';
import { INITIAL_TIME, SCENE_DATA } from './constants';
import CharacterSelection from './components/CharacterSelection';
import GameUI from './components/GameUI';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.CHARACTER_SELECTION);
  const [player, setPlayer] = useState<Player | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [playerChoices, setPlayerChoices] = useState<PlayerChoice[]>([]);
  const [finalMessage, setFinalMessage] = useState<string>("");

  const handleCharacterCreate = useCallback((name: string, gender: Gender) => {
    setPlayer({ name, gender });
    setGameStatus(GameStatus.PLAYING);
  }, []);
  
  const handleGameOver = useCallback((message: string) => {
      setFinalMessage(message);
      setGameStatus(GameStatus.FINISHED);
  }, []);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING && timeLeft <= 0) {
      handleGameOver("You ran out of time and missed the metro. Your journey ends here.");
    }
  }, [timeLeft, gameStatus, handleGameOver]);

  const handleChoice = useCallback((choiceIndex: number) => {
    const scene = SCENE_DATA[currentSceneIndex];
    const choice = scene.choices[choiceIndex];
    
    setTimeLeft(prev => Math.max(0, prev - choice.timeCost));
    setPlayerChoices(prev => [...prev, { sceneTitle: scene.title, choiceText: choice.text, timeCost: choice.timeCost }]);

    if (currentSceneIndex >= SCENE_DATA.length - 1) {
        handleGameOver("You navigated the challenges and made it onto the metro just in time!");
    } else {
        setCurrentSceneIndex(prev => prev + 1);
        setGameStatus(GameStatus.PLAYING);
    }
  }, [currentSceneIndex, handleGameOver]);

  const triggerScene = useCallback(() => {
    if (gameStatus === GameStatus.PLAYING) {
        setGameStatus(GameStatus.SCENE_PROMPT);
    }
  }, [gameStatus]);

  const restartGame = useCallback(() => {
    setGameStatus(GameStatus.CHARACTER_SELECTION);
    setPlayer(null);
    setTimeLeft(INITIAL_TIME);
    setCurrentSceneIndex(0);
    setPlayerChoices([]);
    setFinalMessage("");
  }, []);

  const renderGameContent = () => {
    switch (gameStatus) {
      case GameStatus.CHARACTER_SELECTION:
        return <CharacterSelection onCharacterCreate={handleCharacterCreate} />;
      case GameStatus.PLAYING:
      case GameStatus.SCENE_PROMPT:
        if (!player) return null;
        return (
          <GameUI
            player={player}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            currentScene={SCENE_DATA[currentSceneIndex]}
            gameStatus={gameStatus}
            onChoice={handleChoice}
            onSceneTrigger={triggerScene}
          />
        );
      case GameStatus.FINISHED:
        if (!player) return null;
        return <EndScreen player={player} choices={playerChoices} finalMessage={finalMessage} onRestart={restartGame} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {renderGameContent()}
      </div>
    </div>
  );
};

export default App;
