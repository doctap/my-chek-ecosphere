import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGameification } from '@/contexts/GameContext';
import { Leaf, Zap, Droplets, Recycle } from 'lucide-react';

interface MiniGameProps {
  onClose: () => void;
  onGameComplete: (score: number) => void;
}

interface EcoItem {
  id: number;
  type: 'good' | 'bad';
  icon: React.ReactNode;
  name: string;
  points: number;
  x: number;
  y: number;
  speed: number;
}

const MiniGame: React.FC<MiniGameProps> = ({ onClose, onGameComplete }) => {
  const { playMiniGame } = useGameification();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Increased from 30 to 60 seconds
  const [items, setItems] = useState<EcoItem[]>([]);
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout | null>(null);

  const ecoItems = [
    { type: 'good' as const, icon: <Leaf className="w-8 h-8 text-green-500" />, name: 'Solar Panel', points: 10 },
    { type: 'good' as const, icon: <Droplets className="w-8 h-8 text-blue-500" />, name: 'Water Conservation', points: 8 },
    { type: 'good' as const, icon: <Recycle className="w-8 h-8 text-green-600" />, name: 'Recycling', points: 12 },
    { type: 'bad' as const, icon: <Zap className="w-8 h-8 text-red-500" />, name: 'Coal Power', points: -5 },
    { type: 'bad' as const, icon: <div className="w-8 h-8 bg-gray-500 rounded"></div>, name: 'Pollution', points: -8 },
  ];

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60); // Updated to 60 seconds
    setItems([]);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });

      // Add new items randomly
      if (Math.random() < 0.3) {
        const itemTemplate = ecoItems[Math.floor(Math.random() * ecoItems.length)];
        const newItem: EcoItem = {
          id: Date.now() + Math.random(),
          ...itemTemplate,
          x: Math.random() * 300,
          y: -50,
          speed: 2 + Math.random() * 3,
        };
        
        setItems(prev => [...prev.slice(-10), newItem]);
      }

      // Move items down
      setItems(prev => 
        prev
          .map(item => ({ ...item, y: item.y + item.speed }))
          .filter(item => item.y < 400)
      );
    }, 100);

    setGameInterval(interval);
  }, []);

  const handleItemClick = (item: EcoItem) => {
    setScore(prev => prev + item.points);
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  const finishGame = () => {
    if (gameInterval) {
      clearInterval(gameInterval);
    }
    playMiniGame(Math.max(0, score));
    onGameComplete(Math.max(0, score));
  };

  useEffect(() => {
    if (gameState === 'finished') {
      finishGame();
    }
  }, [gameState]);

  useEffect(() => {
    return () => {
      if (gameInterval) {
        clearInterval(gameInterval);
      }
    };
  }, [gameInterval]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">🌱 Eco Catcher Game</DialogTitle>
        </DialogHeader>

        {gameState === 'menu' && (
          <div className="text-center space-y-4">
            <div className="text-6xl">🌍</div>
            <h3 className="text-lg font-semibold">Save the Planet!</h3>
            <p className="text-sm text-gray-600">
              Click on eco-friendly items to collect points and avoid pollution!
            </p>
            <p className="text-sm font-medium text-green-600">
              You have 60 seconds to save the planet!
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="text-sm">Good items = +Points</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5 text-red-500" />
                <span className="text-sm">Bad items = -Points</span>
              </div>
            </div>
            <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700">
              Start Game
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="outline">Score: {score}</Badge>
              <Badge variant="outline">Time: {timeLeft}s</Badge>
            </div>
            
            <div 
              className="relative bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden"
              style={{ height: '300px', width: '100%' }}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  className="absolute transform hover:scale-110 transition-transform"
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon}
                </button>
              ))}
              
              {items.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌍</div>
                    <p className="text-sm">Items will appear here!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {score >= 50 ? '🏆' : score >= 20 ? '🌟' : '🌱'}
            </div>
            <h3 className="text-lg font-semibold">Game Complete!</h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600">Score: {score}</p>
              <p className="text-sm text-gray-600">
                You earned {Math.floor(Math.max(0, score) / 10)} eco-points!
              </p>
              <p className="text-xs text-gray-500">
                Plus {(Math.max(0, score) / 100).toFixed(2)}kg CO₂ saved!
              </p>
            </div>
            <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MiniGame;
