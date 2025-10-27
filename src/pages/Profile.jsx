import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Profile
        </h2>
        <p className="text-gray-600">
          Manage your profile information and settings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👤</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {user?.name}
          </h3>
          <p className="text-gray-600 mb-4">{user?.email}</p>
          <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
            {role}
          </span>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Profile management features will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
