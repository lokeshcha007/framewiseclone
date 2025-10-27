import React from 'react';
import { useSelector } from 'react-redux';

const Analytics = () => {
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analytics
        </h2>
        <p className="text-gray-600">
          View detailed analytics and performance metrics.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📈</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Analytics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Total Score</h4>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accuracy</h4>
              <p className="text-2xl font-bold text-green-600">0%</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Avg Time</h4>
              <p className="text-2xl font-bold text-yellow-600">0m</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
              <p className="text-2xl font-bold text-red-600">0%</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Detailed analytics and reporting features will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
