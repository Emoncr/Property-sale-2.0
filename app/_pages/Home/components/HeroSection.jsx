import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PropertySearch } from "./PropertySearch";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"
            alt="Hero background"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                🏆 #1 Property Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Find Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  {" "}
                  Dream Property
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover thousands of properties for sale and rent. Connect
              directly with owners and make your property dreams come true.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50"
                asChild
              >
                <Link href="/properties">
                  Browse Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                List Your Property
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur">
              <CardContent className="p-6">
                <PropertySearch />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
