'use client';

import { useSession } from "next-auth/react";

const User = () => {
    const {data:session} = useSession();
    // return <pre>{session?.user.name}</pre>
    return (
        
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col items-center py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl transform hover:scale-105 transition-transform duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Profile Image */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative w-40 h-40">
                  <img
                    className="rounded-full border-4 border-blue-500 object-cover w-full h-full"
                    src="/images/avatar.png" // Update with your image path
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div> {/* Status Indicator */}
                </div>
              </div>
    
              {/* Profile Info */}
              <div className="flex flex-col justify-center text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {session?.user.name}
                </h2>
                <p className="text-lg text-gray-500">Email: {session?.user.email}</p>
                <p className="text-lg text-gray-500">Name: {session?.user.name}</p>
                <div className="mt-4">
                  <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow hover:bg-blue-600 transition-colors duration-300">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
    
            {/* Additional Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    Recent Activity
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Logged in 2 hours ago</li>
                    <li>Updated profile settings</li>
                    <li>Completed a survey</li>
                  </ul>
                </div>
    
                {/* Column 2 */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    Notifications
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>2 unread messages</li>
                    <li>Profile update pending</li>
                    <li>System maintenance notice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default User;
