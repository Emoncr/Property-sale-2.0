"use client";
import React, { useState, useEffect } from "react";
import {
  FiCopy,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";

const ApiKeyDisplay = ({ initialApiKey = "This is a sample API key" }) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setApiKey(initialApiKey || "");
  }, [initialApiKey]);

  const maskedKey = apiKey
    ? `${apiKey.substring(0, 6)}${"•".repeat(20)}${apiKey.substring(
        apiKey.length - 6
      )}`
    : "[no API key]";

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Your API Key</h3>
        </div>

        {!apiKey ? (
          <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-md mb-4">
            <FiAlertTriangle className="mr-2 flex-shrink-0" />
            <span>No API key generated yet. Click below to create one.</span>
          </div>
        ) : (
          <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md mb-4">
            <FiAlertTriangle className="mr-2 flex-shrink-0" />
            <span>
              <strong>Keep this secret:</strong> Never expose in client-side
              code.
            </span>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
          <div className="flex items-center p-3 bg-gray-50">
            <code className="flex-grow font-mono text-gray-800 break-all select-all">
              {isKeyVisible ? apiKey || "[empty]" : maskedKey}
            </code>
            {apiKey && (
              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => setIsKeyVisible(!isKeyVisible)}
                  className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label={isKeyVisible ? "Hide key" : "Show key"}
                >
                  {isKeyVisible ? <FiEyeOff /> : <FiEye />}
                </button>
                <button
                  onClick={handleCopy}
                  className={`p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-1 ${
                    isCopied ? "text-green-600 border-green-300" : ""
                  }`}
                  disabled={!apiKey}
                  aria-label="Copy to clipboard"
                >
                  <FiCopy className="mr-1" /> {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {apiKey && (
        <div className="bg-gray-900 p-5">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <span className="mr-2">How to use</span>
            <span className="h-px bg-gray-700 flex-grow"></span>
          </h4>
          <pre className="text-green-400 bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
            {`fetch('https://staging.squaredonations.com/api/', {
              headers: {
                'Authorization': 'Bearer ${
                  isKeyVisible ? apiKey : "apikey-xxxxxxxxxxxx"
                }',
                'Content-Type': 'application/json'
              }
            })`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiKeyDisplay;
