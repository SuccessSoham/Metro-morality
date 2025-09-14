
import React, { useState } from 'react';
import { Gender } from '../types';
import Character from './Character';

interface CharacterSelectionProps {
  onCharacterCreate: (name: string, gender: Gender) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onCharacterCreate }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCharacterCreate(name.trim(), gender);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-black bg-opacity-50 rounded-lg p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
        <h1 className="text-5xl font-bold text-cyan-400 mb-2 tracking-wider">Metro Morality</h1>
        <p className="text-gray-300 mb-8 text-lg">An experiment in ethics under pressure.</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center gap-6">
            <div className="w-full">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Enter Your Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                    placeholder="e.g., Alex"
                    required
                />
            </div>

            <div className="w-full">
                 <label className="block text-sm font-medium text-gray-400 mb-3">Select Your Character:</label>
                <div className="flex justify-around items-center gap-4">
                    {(Object.values(Gender) as Array<keyof typeof Gender>).map((key) => (
                         <div key={key} className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${gender === Gender[key] ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-600 hover:border-cyan-500'}`} onClick={() => setGender(Gender[key])}>
                            <Character gender={Gender[key]} position={50} isStatic={true} />
                            <p className="text-center mt-2 font-semibold">{Gender[key] === Gender.MALE ? "Man" : "Woman"}</p>
                         </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="w-full mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-md text-white font-bold text-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75">
                Begin Journey
            </button>
        </form>
    </div>
  );
};

export default CharacterSelection;
