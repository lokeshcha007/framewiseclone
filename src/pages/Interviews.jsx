import React from 'react';
import { useSelector } from 'react-redux';

const Interviews = () => {
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Interviews
        </h2>
        <p className="text-gray-600">
          View and manage your interview schedule and history.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Interview Management
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Scheduled</h4>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Completed</h4>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pending</h4>
              <p className="text-2xl font-bold text-yellow-600">0</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Interview scheduling and management features will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
