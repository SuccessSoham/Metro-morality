
import React from 'react';
import { Gender } from '../types';

interface CharacterProps {
  gender: Gender;
  position: number;
  isStatic?: boolean;
}

const Character: React.FC<CharacterProps> = ({ gender, position, isStatic = false }) => {
  const MaleCharacter = () => (
    <svg width="40" height="80" viewBox="0 0 50 100" className="transition-transform duration-300">
      {/* Head */}
      <circle cx="25" cy="15" r="10" fill="#E0A37E" />
      {/* Body */}
      <rect x="15" y="25" width="20" height="35" fill="#2C3E50" />
      {/* Legs */}
      <rect x="15" y="60" width="8" height="30" fill="#34495E" />
      <rect x="27" y="60" width="8" height="30" fill="#34495E" />
       {/* Tie */}
      <path d="M 25 25 L 22 40 L 25 45 L 28 40 Z" fill="#C0392B" />
    </svg>
  );

  const FemaleCharacter = () => (
    <svg width="40" height="80" viewBox="0 0 50 100" className="transition-transform duration-300">
      {/* Head */}
      <circle cx="25" cy="15" r="10" fill="#F3C2A3" />
      {/* Hair */}
      <path d="M 15 10 Q 25 0 35 10 L 38 20 Q 25 25 12 20 Z" fill="#4A3731"/>
      {/* Body - Dress */}
      <path d="M 15 25 L 35 25 L 40 60 L 10 60 Z" fill="#8E44AD" />
      {/* Legs */}
      <rect x="18" y="60" width="6" height="30" fill="#4A3731" />
      <rect x="26" y="60" width="6" height="30" fill="#4A3731" />
    </svg>
  );

  return (
    <div className={`relative ${isStatic ? '' : 'transform hover:scale-110'}`} style={{ willChange: 'transform' }}>
        <div className="w-10 h-20">
            {gender === Gender.MALE ? <MaleCharacter /> : <FemaleCharacter />}
        </div>
        {!isStatic && <div className="absolute -bottom-4 w-10 h-2 bg-black bg-opacity-30 rounded-full blur-sm"></div>}
    </div>
  );
};

export default Character;
