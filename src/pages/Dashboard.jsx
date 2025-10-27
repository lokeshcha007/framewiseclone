import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, getInterviews, getAnalytics } from '../redux/slices/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const { profile, interviews, analytics, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getInterviews());
    dispatch(getAnalytics());
  }, [dispatch]);

  const renderUserDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{profile?.name || user?.name}</h3>
            <p className="text-sm text-gray-500">{profile?.email || user?.email}</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
              profile?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {profile?.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Interviews</span>
            <span className="font-semibold">{analytics?.totalInterviews || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-semibold text-green-600">{analytics?.completedInterviews || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Average Score</span>
            <span className="font-semibold text-blue-600">{analytics?.averageScore || 0}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {interviews.length > 0 ? (
            interviews.slice(0, 3).map((interview, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{interview.title}</p>
                  <p className="text-xs text-gray-500">{interview.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                  interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {interview.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderManagerDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Groups</h3>
            <p className="text-sm text-gray-500">Create and manage interview groups</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Manage Groups
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Schedules</h3>
            <p className="text-sm text-gray-500">Manage interview schedules</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          View Schedules
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
            <p className="text-sm text-gray-500">View performance reports</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          View Reports
        </button>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-500">Manage all users in the system</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Manage Users
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👨‍💼</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manager Management</h3>
            <p className="text-sm text-gray-500">Manage managers and their permissions</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Manage Managers
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚙️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
            <p className="text-sm text-gray-500">Configure system-wide settings</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          System Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {role === 'user' && renderUserDashboard()}
          {role === 'manager' && renderManagerDashboard()}
          {role === 'admin' && renderAdminDashboard()}
        </>
      )}
    </div>
  );
};

export default Dashboard;