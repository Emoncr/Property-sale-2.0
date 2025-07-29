"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Home,
  Bed,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { usePropertyStore } from "@/lib/store";

export function PropertySearch({ showFilters = false, className }) {
  const { searchQuery, filters, setSearchQuery, setFilters } =
    usePropertyStore();
  const [isFiltersOpen, setIsFiltersOpen] = useState(showFilters);

  const handlePriceRangeChange = (value) => {
    setFilters({ priceRange: [value[0], value[1]] });
  };

  const clearFilters = () => {
    setFilters({
      type: undefined,
      category: undefined,
      location: undefined,
      priceRange: [0, 10000000],
      bedrooms: undefined,
      bathrooms: undefined,
    });
    setSearchQuery("");
  };

  const activeFiltersCount =
    [
      filters.type,
      filters.category,
      filters.location,
      filters.bedrooms,
      filters.bathrooms,
    ].filter(Boolean).length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000 ? 1 : 0);

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by location, property name, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant=""
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Property Type
                  </label>
                  <Select
                    value={filters.type || ""}
                    onValueChange={(value) =>
                      setFilters({ type: value === "all" ? undefined : value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={filters.category || ""}
                    onValueChange={(value) =>
                      setFilters({
                        category: value === "all" ? undefined : value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Input
                    placeholder="Enter location"
                    value={filters.location || ""}
                    onChange={(e) =>
                      setFilters({ location: e.target.value || undefined })
                    }
                  />
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Bedrooms
                  </label>
                  <Select
                    value={filters.bedrooms?.toString() || ""}
                    onValueChange={(value) =>
                      setFilters({
                        bedrooms: value === "all" ? undefined : parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </label>
                <div className="px-3">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    min={0}
                    max={10000000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${filters.priceRange[0].toLocaleString()}</span>
                    <span>${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
