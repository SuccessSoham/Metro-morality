
import React from 'react';

interface StatsDisplayProps {
  timeLeft: number;
  currentCheckpoint: number;
  totalCheckpoints: number;
  distanceToTrain: number;
}

const StatItem: React.FC<{ label: string; value: string | number, colorClass?: string }> = ({ label, value, colorClass = "text-cyan-400" }) => (
    <div className="flex flex-col items-center sm:items-end">
        <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
        <span className={`text-2xl font-bold font-mono ${colorClass}`}>{value}</span>
    </div>
);

const StatsDisplay: React.FC<StatsDisplayProps> = ({ timeLeft, currentCheckpoint, totalCheckpoints, distanceToTrain }) => {
    const timeColor = timeLeft <= 10 ? 'text-red-500 animate-pulse' : timeLeft <= 20 ? 'text-yellow-400' : 'text-cyan-400';
    
    return (
        <div className="absolute top-0 right-0 p-4 bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-bl-lg z-10">
            <div className="flex items-center space-x-6">
                <StatItem label="Distance to Metro" value={`${distanceToTrain.toFixed(0)}m`} />
                <StatItem label="Checkpoints" value={`${currentCheckpoint}/${totalCheckpoints}`} />
                <StatItem label="Time Remaining" value={`${timeLeft}s`} colorClass={timeColor} />
            </div>
        </div>
    );
};

export default StatsDisplay;
