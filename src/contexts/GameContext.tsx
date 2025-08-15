
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'shopping' | 'carbon' | 'streak' | 'social';
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: Date;
}

interface Analytics {
  weeklyPoints: number[];
  monthlyPurchases: number;
  carbonSavedThisMonth: number;
  streakRecord: number;
  achievementsUnlocked: number;
  rankImprovement: number;
}

interface UserStats {
  points: number;
  level: number;
  streak: number;
  totalPurchases: number;
  carbonSaved: number;
  badges: Badge[];
  challenges: Challenge[];
  achievements: Achievement[];
  analytics: Analytics;
}

interface GameContextType {
  userStats: UserStats;
  addPoints: (points: number, reason: string) => void;
  completeChallenge: (challengeId: string) => void;
  updateProgress: (challengeId: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  playMiniGame: (score: number) => void;
  leaderboard: Array<{ name: string; points: number; level: number; rank: number }>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    level: 1,
    streak: 0,
    totalPurchases: 0,
    carbonSaved: 0,
    badges: [],
    challenges: [],
    achievements: [],
    analytics: {
      weeklyPoints: [50, 120, 80, 200, 150, 300, 250],
      monthlyPurchases: 0,
      carbonSavedThisMonth: 0,
      streakRecord: 0,
      achievementsUnlocked: 0,
      rankImprovement: 0,
    }
  });

  const [leaderboard] = useState([
    { name: 'EcoWarrior', points: 2500, level: 5, rank: 1 },
    { name: 'GreenThumb', points: 2100, level: 4, rank: 2 },
    { name: 'SustainableSam', points: 1800, level: 4, rank: 3 },
    { name: 'EcoFriendly', points: 1500, level: 3, rank: 4 },
    { name: 'GreenGuru', points: 1200, level: 3, rank: 5 },
  ]);

  const defaultAchievements: Achievement[] = [
    {
      id: 'first_purchase',
      title: 'First Step',
      description: 'Make your first sustainable purchase',
      icon: '🌱',
      points: 50,
      category: 'shopping',
      progress: 0,
      target: 1,
      unlocked: false
    },
    {
      id: 'eco_shopper',
      title: 'Eco Shopper',
      description: 'Buy 10 sustainable products',
      icon: '🛒',
      points: 100,
      category: 'shopping',
      progress: 0,
      target: 10,
      unlocked: false
    },
    {
      id: 'carbon_saver',
      title: 'Carbon Saver',
      description: 'Save 50kg of CO2',
      icon: '🌍',
      points: 200,
      category: 'carbon',
      progress: 0,
      target: 50,
      unlocked: false
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      points: 150,
      category: 'streak',
      progress: 0,
      target: 7,
      unlocked: false
    },
    {
      id: 'level_up',
      title: 'Level Up',
      description: 'Reach level 5',
      icon: '⭐',
      points: 300,
      category: 'social',
      progress: 0,
      target: 5,
      unlocked: false
    }
  ];

  useEffect(() => {
    if (user) {
      const storedStats = localStorage.getItem(`ecoSphereStats_${user.id}`);
      if (storedStats) {
        const parsed = JSON.parse(storedStats);
        setUserStats({
          ...parsed,
          achievements: parsed.achievements || defaultAchievements
        });
      } else {
        // Initialize with default challenges and achievements
        const defaultChallenges: Challenge[] = [
          {
            id: '1',
            title: 'Eco Shopping Spree',
            description: 'Buy 5 sustainable products',
            points: 100,
            type: 'daily',
            progress: 0,
            target: 5,
            completed: false,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
          {
            id: '2',
            title: 'Carbon Footprint Reducer',
            description: 'Save 10kg of CO2 this week',
            points: 200,
            type: 'weekly',
            progress: 0,
            target: 10,
            completed: false,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
          {
            id: '3',
            title: 'Green Streak',
            description: 'Login for 3 consecutive days',
            points: 75,
            type: 'daily',
            progress: 0,
            target: 3,
            completed: false,
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          },
        ];
        
        setUserStats(prev => ({ 
          ...prev, 
          challenges: defaultChallenges,
          achievements: defaultAchievements
        }));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`ecoSphereStats_${user.id}`, JSON.stringify(userStats));
    }
  }, [userStats, user]);

  const calculateLevel = (points: number) => {
    return Math.floor(points / 500) + 1;
  };

  const addPoints = (points: number, reason: string) => {
    setUserStats(prev => {
      const newPoints = prev.points + points;
      const newLevel = calculateLevel(newPoints);
      const levelUp = newLevel > prev.level;
      
      if (levelUp) {
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${newLevel}!`,
        });
      }
      
      toast({
        title: `+${points} points`,
        description: reason,
      });
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setUserStats(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId && !achievement.unlocked
          ? { 
              ...achievement, 
              unlocked: true, 
              unlockedAt: new Date(),
              progress: achievement.target 
            }
          : achievement
      )
    }));

    const achievement = userStats.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      addPoints(achievement.points, `Achievement unlocked: ${achievement.title}`);
    }
  };

  const playMiniGame = (score: number) => {
    const points = Math.floor(score / 10);
    addPoints(points, `Mini-game completed! Score: ${score}`);
    
    // Update carbon saved based on game performance
    setUserStats(prev => ({
      ...prev,
      carbonSaved: prev.carbonSaved + (score / 100)
    }));
  };

  const completeChallenge = (challengeId: string) => {
    setUserStats(prev => ({
      ...prev,
      challenges: prev.challenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      )
    }));
  };

  const updateProgress = (challengeId: string, progress: number) => {
    setUserStats(prev => ({
      ...prev,
      challenges: prev.challenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, progress: Math.min(progress, challenge.target) }
          : challenge
      )
    }));
  };

  return (
    <GameContext.Provider value={{
      userStats,
      addPoints,
      completeChallenge,
      updateProgress,
      unlockAchievement,
      playMiniGame,
      leaderboard,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameification = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameification must be used within a GameProvider');
  }
  return context;
};
