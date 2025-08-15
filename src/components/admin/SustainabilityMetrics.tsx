
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle, TrendingUp, Award } from 'lucide-react';

const SustainabilityMetrics = () => {
  const metrics = [
    {
      title: "Total Carbon Saved",
      value: "1,247.3kg",
      change: "+23%",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Eco-Friendly Orders",
      value: "89.2%",
      change: "+5.1%",
      icon: Recycle,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Avg Sustainability Score",
      value: "4.3/5.0",
      change: "+0.2",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Green Impact Growth",
      value: "+32.4%",
      change: "This month",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  const topEcoProducts = [
    { name: "Cork Yoga Mat", score: 4.9, orders: 156 },
    { name: "Bamboo Fiber T-Shirt", score: 4.8, orders: 243 },
    { name: "Reusable Glass Water Bottle", score: 4.7, orders: 189 },
  ];

  const sustainabilityGoals = [
    { goal: "Reduce avg carbon footprint by 15%", progress: 78, status: "on-track" },
    { goal: "Achieve 90% eco-friendly product ratio", progress: 89, status: "on-track" },
    { goal: "Save 2000kg CO₂ this quarter", progress: 62, status: "behind" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Top Eco-Friendly Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEcoProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.orders} orders</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {product.score}/5.0
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Sustainability Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sustainabilityGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <Badge 
                      variant={goal.status === 'on-track' ? 'default' : 'secondary'}
                      className={goal.status === 'on-track' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    >
                      {goal.progress}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        goal.status === 'on-track' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustainabilityMetrics;
