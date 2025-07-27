import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { ArrowRight, MessageCircle, Search, Shield } from "lucide-react";
const WhyChooseUs = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Advanced filters to find your perfect property match quickly and easily.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Safe and secure platform with verified listings and trusted sellers.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description:
        "Chat directly with property owners and agents in real-time.",
    },
  ];

  return (
    <>
      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Property Sale?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the tools and platform you need to buy, sell, or rent
              properties with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
