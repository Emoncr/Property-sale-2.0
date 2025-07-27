import React from "react";
import { ArrowRight, Search, Shield, MessageCircle, Star, TrendingUp, Users, MapPin } from 'lucide-react';
const StatsSection = () => {
      const stats = [
    { label: 'Properties Listed', value: '10,000+', icon: TrendingUp },
    { label: 'Happy Customers', value: '25,000+', icon: Users },
    { label: 'Cities Covered', value: '100+', icon: MapPin },
    { label: 'Success Rate', value: '95%', icon: Star },
  ];
  return (
    <>
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
