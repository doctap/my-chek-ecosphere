
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

interface Analytics {
  weeklyPoints: number[];
  monthlyPurchases: number;
  carbonSavedThisMonth: number;
  streakRecord: number;
  achievementsUnlocked: number;
  rankImprovement: number;
}

interface AnalyticsChartProps {
  analytics: Analytics;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ analytics }) => {
  const weeklyData = analytics.weeklyPoints.map((points, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    points,
  }));

  const impactData = [
    { name: 'Carbon Saved', value: analytics.carbonSavedThisMonth, color: '#22c55e' },
    { name: 'Remaining Goal', value: Math.max(0, 100 - analytics.carbonSavedThisMonth), color: '#e5e7eb' },
  ];

  const chartConfig = {
    points: {
      label: 'Points',
      color: '#22c55e',
    },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.weeklyPoints.reduce((a, b) => a + b, 0)}</p>
                <p className="text-sm text-gray-600">Weekly Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.monthlyPurchases}</p>
                <p className="text-sm text-gray-600">Monthly Purchases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.achievementsUnlocked}</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{analytics.streakRecord}</p>
                <p className="text-sm text-gray-600">Best Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Points Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Points Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="var(--color-points)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-points)', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {analytics.carbonSavedThisMonth.toFixed(1)}kg
                </div>
                <p className="text-sm text-gray-600">CO₂ Saved This Month</p>
              </div>
              
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 shadow-lg rounded border">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-green-600">{data.value.toFixed(1)}kg CO₂</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-center space-y-2">
                <Badge className="bg-green-100 text-green-800">
                  Monthly Goal: 100kg CO₂
                </Badge>
                <p className="text-xs text-gray-500">
                  Equivalent to {(analytics.carbonSavedThisMonth * 2.2).toFixed(0)} trees planted! 🌳
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {analytics.rankImprovement > 0 ? '+' : ''}{analytics.rankImprovement}
              </div>
              <p className="text-sm text-gray-600">Rank Change</p>
              <Badge variant={analytics.rankImprovement > 0 ? "default" : "secondary"}>
                {analytics.rankImprovement > 0 ? 'Improved!' : 'Keep Going!'}
              </Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {((analytics.achievementsUnlocked / 5) * 100).toFixed(0)}%
              </div>
              <p className="text-sm text-gray-600">Achievement Progress</p>
              <Badge variant="outline">
                {analytics.achievementsUnlocked}/5 Unlocked
              </Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {analytics.streakRecord}
              </div>
              <p className="text-sm text-gray-600">Record Streak</p>
              <Badge className="bg-orange-100 text-orange-800">
                🔥 Personal Best
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;
