"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Square, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Property, usePropertyStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PropertyCard({ property, className }) {
  const { favoriteProperties, toggleFavorite } = usePropertyStore();
  const isFavorite = favoriteProperties.includes(property.id);

  const formatPrice = (price, type) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    return type === "rent" ? `${formatted}/month` : formatted;
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.type === "sale" ? "default" : "secondary"}>
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {property.images.length > 1 && (
            <Badge variant="outline" className="bg-white/90">
              <Camera className="h-3 w-3 mr-1" />
              {property.images.length}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 bg-white/90 border-white/50 hover:bg-white",
              isFavorite && "text-red-600 hover:text-red-700"
            )}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-black/70 text-white font-semibold">
            {formatPrice(property.price, property.type)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/properties/${property.id}`}>
              <h3 className="font-semibold text-lg line-clamp-1 hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
            </Link>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.bedrooms}
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.bathrooms}
                </div>
              )}
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                {property.area} sq ft
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-gray-500">
              Listed by {property.sellerName}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
