import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

const ErrorComponent = ({
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  showRetry = true,
  showHomeButton = false,
  onRetry,
  onHome,
  className = "",
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}
    >
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 max-w-md">{message}</p>
      </div>

      <div className="flex items-center gap-3">
        {showRetry && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}

        {showHomeButton && (
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-transparent hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
