"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          {"The page you're looking for doesn't exist or has been moved."}
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
