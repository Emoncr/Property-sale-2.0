"use client";
import { PropertyCard } from "@/components/common/PropertyCard";
import { Button } from "@/components/ui/button";
import { sampleProperties } from "@/data/data";
import { usePropertyStore } from "@/lib/store";
import { ArrowRight, MessageCircle, Search, Shield } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const FeaturedSection = () => {
  const { properties, setProperties } = usePropertyStore();

  useEffect(() => {
    // Initialize with sample data
    setProperties(sampleProperties);
  }, [setProperties]);

  const featuredProperties = properties.slice(0, 6);

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
      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties available
              for sale and rent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <div key={property.id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedSection;
