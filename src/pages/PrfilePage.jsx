import React, { useContext } from 'react';
import { User, Mail, Shield, Calendar, CreditCard } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  // Your data object
 const {user} =useContext(AuthContext);
  // Format Unix timestamps to readable dates
  const formatDate = (unix) => new Date(unix * 1000).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-500">Your Profile</h1>
          <p className="text-slate-500 uppercase tracking-widest text-xs mt-1 font-semibold">
            Account Management & Identity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar / Avatar Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500 mb-6">{user.email}</p>
            <button className="w-full py-2 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
              Edit Profile
            </button>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                <h3 className="font-semibold text-slate-700">Account Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase">Unique Identifier</p>
                    <p className="text-sm font-mono text-slate-700 break-all">{user.id}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase">Primary Email</p>
                    <p className="text-sm text-slate-700">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-slate-400 mt-1" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase">Joined</p>
                      <p className="text-sm text-slate-700">{formatDate(user.iat)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CreditCard className="w-5 h-5 text-slate-400 mt-1" />
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase">Session Expiry</p>
                      <p className="text-sm text-slate-700">{formatDate(user.exp)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats / Integration */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-orange-800 font-semibold text-sm">Ready for your next mock interview?</p>
                <p className="text-orange-600 text-xs">Your data is synced with the Interview Command Center.</p>
              </div>
              <a href="/dashboard" className="text-sm font-bold text-orange-700 hover:underline">
                Go to Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;