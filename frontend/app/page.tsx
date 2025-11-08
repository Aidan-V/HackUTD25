"use client";

import { useState } from 'react';

export default function Home() {
  const [meetingData, setMeetingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLastMeeting = async () => {
    setIsLoading(true);
    setError(null);
    setMeetingData(null);

    try {
      // Call Spring Boot backend
      const response = await fetch('http://localhost:8080/api/fathom/latest-meeting');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch meeting: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMeetingData(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Fathom Meeting Importer</h1>
        <p className="mt-2 text-gray-600">
          Click the button to fetch the latest meeting data from Fathom via Spring Boot backend.
        </p>
        
        <button 
          onClick={fetchLastMeeting} 
          disabled={isLoading}
          className="mt-6 py-2 px-4 text-base font-semibold text-white bg-blue-600 rounded-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors duration-200
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Fetching...' : 'Get Last Meeting'}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline whitespace-pre-wrap">{error}</span>
          </div>
        )}

        {meetingData && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">JSON Structure Result:</h2>
            <pre className="mt-2 p-4 bg-gray-100 border border-gray-200 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(meetingData, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
