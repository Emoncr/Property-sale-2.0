"use client";
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState } from "react";

export default function ApiDocumentation() {
  const [expandedEndpoint, setExpandedEndpoint] = useState("get-user");
  const [expandedSection, setExpandedSection] = useState({
    "get-user": {
      description: true,
      parameters: true,
      response: false,
      examples: false,
    },
  });

  // Add state to track which buttons are in "copied" state
  const [copiedStates, setCopiedStates] = useState({});

  const copyToClipboard = (text, id) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Set this specific button to "copied" state
        setCopiedStates((prev) => ({ ...prev, [id]: true }));
        // Reset the "copied" state after 2 seconds
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [id]: false }));
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const toggleEndpoint = (endpointId) => {
    setExpandedEndpoint(expandedEndpoint === endpointId ? null : endpointId);
  };

  const toggleSection = (endpointId, section) => {
    setExpandedSection({
      ...expandedSection,
      [endpointId]: {
        ...expandedSection[endpointId],
        [section]: !expandedSection[endpointId]?.[section],
      },
    });
  };

  const endpoints = [
    {
      id: "get-user",
      method: "GET",
      path: "/profiles/user/me",
      title: "Get Current User",
      description: "Retrieves the current authenticated user's profile information including organization details and subscription plan.",
      parameters: [],
      response: {
        status: 200,
        type: "application/json",
        schema: {
          success: "boolean",
          statusCode: "integer",
          message: "string",
          timestamp: "string",
          requestId: "string",
          data: "object"
        },
      },
      examples: [
        {
          request: "GET /profiles/user/me",
          response: `{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2025-05-17T16:20:52.249Z",
  "requestId": "5ee5ce0e-42c6-44af-8293-d0967a580c58",
  "data": {
    "_id": "67c6cd3ca56a6713bd4a2ffc",
    "user": {
      "isEmailVerified": false,
      "_id": "67c6cd3ca56a6713bd4a2ffa",
      "email": "faiyazrahman03@gmail.com",
      "role": "organizer",
      "stripeAccountId": "acct_1RHhDqGhkwhmB6xR",
      "subscribedPlan": {
        "_id": "677a6f8a8b2f18699e0a7d1c",
        "name": "pro",
        "price": 239.88,
        "stripePriceId": "price_1RLUNQFaRrNjITn5wlrdnNBO",
        "planType": "annual"
      }
    },
    "firstName": "Faiyaz",
    "lastName": "Rahman",
    "organizationName": "KindBridge",
    "defaultCurrency": "USD"
  }
}`,
        },
      ],
    },
    {
      id: "get-campaigns",
      method: "GET",
      path: "/campaigns",
      title: "Get Campaigns",
      description: "Retrieves a paginated list of campaigns for the authenticated user.",
      parameters: [
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination (default: 1)",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of records per page (default: 10)",
        },
      ],
      response: {
        status: 200,
        type: "application/json",
        schema: {
          success: "boolean",
          statusCode: "integer",
          message: "string",
          data: "object",
          pagination: "object"
        },
      },
      examples: [
        {
          request: "GET /campaigns?page=1&limit=10",
          response: `{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2025-06-02T17:10:21.880Z",
  "requestId": "d321e00e-2b14-428b-9a98-3159add793af",
  "data": {
    "items": [
      {
        "_id": "6833036cfe57a909e32755d1",
        "user": {
          "_id": "681e6f73a515aa649497251e",
          "email": "faiyazrahman03@gmail.com"
        },
        "website": "681dcae4f83614ee1596cde7",
        "type": "donations",
        "name": "Animals Campaign",
        "goal": 2000,
        "amountRaised": 0,
        "startDate": null,
        "endDate": null,
        "isActive": true,
        "createdAt": "2025-05-25T11:47:56.733Z",
        "updatedAt": "2025-05-25T11:47:56.733Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}`,
        },
      ],
    },
    {
      id: "get-donations",
      method: "GET",
      path: "/donations",
      title: "Get Donations",
      description: "Retrieves a paginated list of donations with optional filtering by status.",
      parameters: [
        {
          name: "filters[status]",
          type: "string",
          required: false,
          description: "Filter donations by status (e.g., 'succeeded', 'pending', 'failed')",
        },
        {
          name: "page",
          type: "integer",
          required: false,
          description: "Page number for pagination (default: 1)",
        },
        {
          name: "limit",
          type: "integer",
          required: false,
          description: "Number of records per page (default: 10)",
        },
      ],
      response: {
        status: 200,
        type: "application/json",
        schema: {
          success: "boolean",
          statusCode: "integer",
          message: "string",
          data: "object",
          pagination: "object"
        },
      },
      examples: [
        {
          request: "GET /donations?filters[status]=succeeded&page=1&limit=5",
          response: `{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2025-05-24T19:16:52.549Z",
  "requestId": "a30002e9-5ddc-4c31-9239-d391379a4364",
  "data": {
    "items": [
      {
        "_id": "68207027f2777b39b832a2c7",
        "campaign": {
          "_id": "68206f4d9de30fb055de5ee7",
          "name": "Widget campaign",
          "goal": 2000
        },
        "paymentIntentId": "pi_3RNWLLGhkwhmB6xR1v1jJrXt",
        "amount": 30,
        "totalFees": 1.47,
        "stripeFee": 1.17,
        "platformFee": 0.3,
        "donorCharged": 30,
        "netAmount": 28.53,
        "currency": "USD",
        "transactionId": "SQDON-1746956327877-H149ER",
        "donationType": "one-time",
        "donor": {
          "type": "individual",
          "firstName": "Faiyaz",
          "lastName": "Rahman",
          "email": "faiyazrahman03@gmail.com",
          "country": "Bangladesh",
          "city": "Dhaka",
          "state": "Dhaka",
          "phone": "01799096753"
        },
        "status": "succeeded",
        "createdAt": "2025-05-11T09:38:47.879Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 5,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}`,
        },
      ],
    },
    {
      id: "get-campaign-by-id",
      method: "GET",
      path: "/campaigns/{id}",
      title: "Get Campaign by ID",
      description: "Retrieves a specific campaign by its unique identifier.",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "The unique identifier of the campaign",
        },
      ],
      response: {
        status: 200,
        type: "application/json",
        schema: {
          success: "boolean",
          statusCode: "integer",
          message: "string",
          data: "object"
        },
      },
      examples: [
        {
          request: "GET /campaigns/680e062d11302a4e0a8116a2",
          response: `{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2025-05-17T16:20:52.249Z",
  "requestId": "5ee5ce0e-42c6-44af-8293-d0967a580c58",
  "data": {
    "_id": "680e062d11302a4e0a8116a2",
    "name": "Flood Campaign",
    "goal": 3000,
    "amountRaised": 1250,
    "type": "donations",
    "isActive": true,
    "startDate": null,
    "endDate": null,
    "createdAt": "2025-04-24T10:30:00.000Z",
    "updatedAt": "2025-04-24T10:30:00.000Z"
  }
}`,
        },
      ],
    },
    {
      id: "get-donation-by-id",
      method: "GET",
      path: "/donations/{id}",
      title: "Get Donation by ID",
      description: "Retrieves detailed information about a specific donation including campaign, donor, and payment details.",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "The unique identifier of the donation",
        },
      ],
      response: {
        status: 200,
        type: "application/json",
        schema: {
          success: "boolean",
          statusCode: "integer",
          message: "string",
          data: "object"
        },
      },
      examples: [
        {
          request: "GET /donations/681ded237d5c55d613a285a7",
          response: `{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "timestamp": "2025-05-18T11:30:47.028Z",
  "requestId": "653918a2-64b6-4322-992f-75e89f745d08",
  "data": {
    "_id": "681ded237d5c55d613a285a7",
    "campaign": {
      "_id": "681b29d544f605bad76cece1",
      "name": "Animals Campaign",
      "goal": 2000,
      "amountRaised": 1043
    },
    "paymentIntentId": "pi_3RMpWaGhkwhmB6xR0KIEddNn",
    "amount": 861,
    "totalFees": 33.88,
    "stripeFee": 25.27,
    "platformFee": 8.61,
    "donorCharged": 861,
    "netAmount": 827.12,
    "currency": "INR",
    "transactionId": "SQDON-1746791715874-IU1HOU",
    "donationType": "one-time",
    "donor": {
      "type": "individual",
      "firstName": "Faiyaz",
      "lastName": "Rahman",
      "email": "faiyazrahman03@gmail.com",
      "country": "Afghanistan",
      "city": "Dhaka",
      "state": "Dhaka",
      "phone": "01799096753"
    },
    "isAnonymousDonation": true,
    "isRefunded": false,
    "status": "succeeded",
    "createdAt": "2025-05-09T11:55:15.879Z",
    "website": {
      "_id": "681b266955228a1ab8b3a77e",
      "domain": "www.fcb.com"
    },
    "organizer": {
      "_id": "67c6cd3ca56a6713bd4a2ffc",
      "firstName": "Faiyaz",
      "lastName": "Rahman",
      "organizationName": "KindBridge",
      "defaultCurrency": "USD"
    }
  }
}`,
        },
      ],
    },
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800";
      case "POST":
        return "bg-blue-100 text-blue-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Introduction
        </h2>
        <p className="text-gray-600">
          Welcome to the Square Donations API documentation. Use the endpoints below to interact
          with our donation platform services. All requests require authentication using an API
          key in the header.
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Base URL</span>
            <button
              onClick={() =>
                copyToClipboard(
                  "https://staging.squaredonations.com/api",
                  "baseUrl"
                )
              }
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors duration-200"
            >
              {copiedStates["baseUrl"] ? (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="text-xs text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </button>
          </div>
          <code className="text-sm bg-gray-100 p-2 rounded block text-gray-800">
            https://staging.squaredonations.com/api
          </code>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Endpoints</h2>
        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  expandedEndpoint === endpoint.id ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => toggleEndpoint(endpoint.id)}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${getMethodColor(
                      endpoint.method
                    )}`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-gray-700">
                    {endpoint.path}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {endpoint.title}
                  </span>
                </div>
                {expandedEndpoint === endpoint.id ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </div>

              {expandedEndpoint === endpoint.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-4">
                    {/* Description Section */}
                    <div>
                      <div
                        className="flex items-center justify-between cursor-pointer mb-2"
                        onClick={() =>
                          toggleSection(endpoint.id, "description")
                        }
                      >
                        <h3 className="font-medium text-gray-800">
                          Description
                        </h3>
                        {expandedSection[endpoint.id]?.description ? (
                          <ChevronUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-500" />
                        )}
                      </div>
                      {expandedSection[endpoint.id]?.description && (
                        <p className="text-gray-600 text-sm">
                          {endpoint.description}
                        </p>
                      )}
                    </div>

                    {/* Parameters Section */}
                    {endpoint.parameters.length > 0 && (
                      <div>
                        <div
                          className="flex items-center justify-between cursor-pointer mb-2"
                          onClick={() => toggleSection(endpoint.id, "parameters")}
                        >
                          <h3 className="font-medium text-gray-800">
                            Parameters
                          </h3>
                          {expandedSection[endpoint.id]?.parameters ? (
                            <ChevronUp size={16} className="text-gray-500" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-500" />
                          )}
                        </div>
                        {expandedSection[endpoint.id]?.parameters && (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Required
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {endpoint.parameters.map((param, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 text-sm font-mono text-gray-900">
                                      {param.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                      {param.type}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                      {param.required ? (
                                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                                          Required
                                        </span>
                                      ) : (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                          Optional
                                        </span>
                                      )}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Response Section */}
                    <div>
                      <div
                        className="flex items-center justify-between cursor-pointer mb-2"
                        onClick={() => toggleSection(endpoint.id, "response")}
                      >
                        <h3 className="font-medium text-gray-800">Response</h3>
                        {expandedSection[endpoint.id]?.response ? (
                          <ChevronUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-500" />
                        )}
                      </div>
                      {expandedSection[endpoint.id]?.response && (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                              Status: {endpoint.response.status}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                              Content-Type: {endpoint.response.type}
                            </span>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-md">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Schema
                            </p>
                            <code className="block text-sm bg-gray-100 p-3 rounded text-gray-800">
                              {Object.entries(endpoint.response.schema).map(
                                ([key, type], idx) => (
                                  <div key={idx} className="font-mono">
                                    {key}: {type}
                                  </div>
                                )
                              )}
                            </code>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Examples Section */}
                    <div>
                      <div
                        className="flex items-center justify-between cursor-pointer mb-2"
                        onClick={() => toggleSection(endpoint.id, "examples")}
                      >
                        <h3 className="font-medium text-gray-800">Examples</h3>
                        {expandedSection[endpoint.id]?.examples ? (
                          <ChevronUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-500" />
                        )}
                      </div>
                      {expandedSection[endpoint.id]?.examples && (
                        <div className="space-y-4">
                          {endpoint.examples.map((example, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium text-gray-700">
                                  Request
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      example.request,
                                      `${endpoint.id}-req-${idx}`
                                    )
                                  }
                                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors duration-200"
                                >
                                  {copiedStates[`${endpoint.id}-req-${idx}`] ? (
                                    <>
                                      <Check
                                        size={14}
                                        className="text-green-600"
                                      />
                                      <span className="text-xs text-green-600">
                                        Copied!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={14} />
                                      <span className="text-xs">Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="bg-gray-100 p-3 rounded">
                                <code className="text-sm font-mono text-gray-800">
                                  {example.request}
                                </code>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Response
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      example.response,
                                      `${endpoint.id}-res-${idx}`
                                    )
                                  }
                                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors duration-200"
                                >
                                  {copiedStates[`${endpoint.id}-res-${idx}`] ? (
                                    <>
                                      <Check
                                        size={14}
                                        className="text-green-600"
                                      />
                                      <span className="text-xs text-green-600">
                                        Copied!
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={14} />
                                      <span className="text-xs">Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="bg-gray-100 p-3 rounded">
                                <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                                  {example.response}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
