
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Flame, Star, Award, Zap, TrendingUp, Calendar, Gamepad2 } from 'lucide-react';
import { useGameification } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import MiniGame from './MiniGame';
import AnalyticsChart from './AnalyticsChart';

const PersonalizedDashboard = () => {
  const { userStats, leaderboard, unlockAchievement } = useGameification();
  const { user } = useAuth();
  const [showMiniGame, setShowMiniGame] = React.useState(false);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Sign in to view your personalized eco-dashboard!</p>
      </div>
    );
  }

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (userStats.level - 1) * 500;
    const nextLevelPoints = userStats.level * 500;
    const progress = ((userStats.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  const userRank = leaderboard.findIndex(player => player.points <= userStats.points) + 1 || leaderboard.length + 1;

  const unlockedAchievements = userStats.achievements.filter(a => a.unlocked);
  const pendingAchievements = userStats.achievements.filter(a => !a.unlocked);

  const upcomingTasks = userStats.challenges.filter(c => !c.completed);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🌱</h1>
        <p className="text-green-50">You're making a real difference for our planet!</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.points}</div>
            <div className="text-sm text-green-100">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">#{userRank}</div>
            <div className="text-sm text-green-100">Global Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.carbonSaved.toFixed(1)}kg</div>
            <div className="text-sm text-green-100">CO₂ Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-sm text-green-100">Achievements</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level {userStats.level}</span>
                  <span>Level {userStats.level + 1}</span>
                </div>
                <Progress value={getProgressToNextLevel()} className="h-3" />
                <p className="text-sm text-gray-600">
                  {500 - (userStats.points % 500)} points to next level
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.streak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{upcomingTasks.length}</p>
                    <p className="text-sm text-gray-600">Pending Tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="w-8 h-8 text-purple-500" />
                  <div>
                    <Button 
                      onClick={() => setShowMiniGame(true)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Play Eco Game
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {unlockedAchievements.length > 0 ? (
                <div className="space-y-3">
                  {unlockedAchievements.slice(-3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">{achievement.title}</h4>
                        <p className="text-sm text-green-600">{achievement.description}</p>
                      </div>
                      <Badge className="bg-green-500 text-white">+{achievement.points}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No achievements unlocked yet. Keep going!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unlocked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Unlocked Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unlockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800">{achievement.title}</h4>
                        <p className="text-sm text-green-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500">
                          Unlocked: {achievement.unlockedAt?.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-500 text-white">+{achievement.points}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-600">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAchievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl opacity-50">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        <Badge variant="outline">+{achievement.points}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.target}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.target) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' : 'bg-gray-200'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-gray-600">Level {player.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{player.points.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </div>
                ))}
                
                {/* User's position if not in top 5 */}
                {userRank > 5 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                          #{userRank}
                        </div>
                        <div>
                          <p className="font-medium">{user.name} (You)</p>
                          <p className="text-sm text-gray-600">Level {userStats.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{userStats.points.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

 <TabsContent value="tasks" className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Upcoming Tasks
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {upcomingTasks.map((challenge) => (
          <div key={challenge.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{challenge.title}</h4>
              <Badge variant={challenge.completed ? "default" : "secondary"}>
                {challenge.type}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{challenge.progress}/{challenge.target}</span>
              </div>
              <Progress 
                value={(challenge.progress / challenge.target) * 100} 
                className="h-2" 
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-green-600 font-medium">
                +{challenge.points} points
              </span>
              <span className="text-xs text-gray-500">
                Expires: {challenge.expiresAt ? new Date(challenge.expiresAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>


        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsChart analytics={userStats.analytics} />
        </TabsContent>
      </Tabs>

      {/* Mini Game Modal */}
      {showMiniGame && (
        <MiniGame 
          onClose={() => setShowMiniGame(false)}
          onGameComplete={(score) => setShowMiniGame(false)}
        />
      )}
    </div>
  );
};

export default PersonalizedDashboard;
