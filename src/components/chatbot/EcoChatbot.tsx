
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Leaf, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const EcoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your EcoSphere AI assistant! I can help you find sustainable products, learn about eco-friendly practices, and answer questions about our sustainability ratings. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Sustainability questions
    if (lowerMessage.includes('sustainability') || lowerMessage.includes('eco') || lowerMessage.includes('green')) {
      return "Our sustainability rating system evaluates products based on 5 key factors: Carbon Footprint (25%), Resource Usage (20%), Supply Chain Ethics (20%), Packaging (15%), and Product Longevity (20%). Products with 4+ stars are considered highly sustainable!";
    }
    
    // Carbon footprint questions
    if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint') || lowerMessage.includes('co2')) {
      return "Carbon footprint measures the greenhouse gas emissions produced by a product throughout its lifecycle. Lower numbers are better! Our platform helps you choose products with minimal environmental impact.";
    }
    
    // Product recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best')) {
      return "I'd recommend looking for products with 4+ sustainability stars! Try our eco-friendly electronics, sustainable clothing, or organic food categories. Each product shows detailed sustainability metrics to help you choose wisely.";
    }
    
    // Gamification questions
    if (lowerMessage.includes('points') || lowerMessage.includes('level') || lowerMessage.includes('challenge')) {
      return "You earn points by purchasing sustainable products, completing daily challenges, and maintaining streaks! Every 500 points gets you to the next level. Check your dashboard to see active challenges and compete on the leaderboard!";
    }
    
    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can help with: 🌱 Product sustainability ratings, 🎯 Eco-friendly shopping tips, 🏆 Gamification features, 📊 Understanding our metrics, and 🛒 Finding the best sustainable products. What would you like to know more about?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! Our platform focuses on making sustainable shopping easy and rewarding. Is there a specific eco-friendly product category you're interested in?",
      "I'm here to help you make more sustainable choices! Would you like me to explain our rating system or help you find eco-friendly products?",
      "Sustainability is at the heart of everything we do! Feel free to ask about our products, ratings, or how to earn more eco-points!",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50">
      <CardHeader className="bg-green-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Leaf className="w-5 h-5" />
            EcoSphere AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-green-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about sustainable products..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoChatbot;
