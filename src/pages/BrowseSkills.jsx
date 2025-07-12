import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import api from '../services/api';

function BrowseSkills() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [requesting, setRequesting] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, selectedSkill]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.skill = searchTerm;
      if (selectedSkill) params.skill = selectedSkill;
      
      const data = await api.getAvailableSkills(params);
      setUsers(data.users);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async (recipientId, requestedSkill, offeredSkill) => {
    try {
      setRequesting(recipientId);
      
      // Find a skill that the current user offers and the recipient wants
      const recipient = users.find(u => u._id === recipientId);
      const userOfferedSkill = user.skillsOffered[0] || 'General Help';
      
      await api.createSwapRequest({
        recipientId,
        requestedSkill,
        offeredSkill: userOfferedSkill,
        message: `I'd like to learn ${requestedSkill} from you. I can offer ${userOfferedSkill} in return.`
      });
      
      alert('Swap request sent successfully!');
    } catch (err) {
      alert('Failed to send swap request: ' + err.message);
    } finally {
      setRequesting(null);
    }
  };

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Photoshop', 'Excel', 
    'Design', 'Cooking', 'Spanish', 'Yoga', 'Photography'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-yellow-300">Browse Skills</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search by skill (e.g., JavaScript, Photoshop, Cooking)..."
          />
          
          {/* Popular Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {popularSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedSkill === skill
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || selectedSkill 
                  ? 'No users found with those skills. Try a different search term.'
                  : 'No users available at the moment.'
                }
              </p>
            </div>
          ) : (
            users.map((userData) => (
              <div key={userData._id} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 p-6 rounded-lg shadow-lg transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
                    {userData.profilePhoto ? (
                      <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      userData.name[0]
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{userData.name}</div>
                    {userData.location && (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        📍 {userData.location}
                      </div>
                    )}
                    {userData.rating && userData.rating.average > 0 && (
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        ⭐ {userData.rating.average.toFixed(1)} ({userData.rating.count} reviews)
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills Offered */}
                {userData.skillsOffered && userData.skillsOffered.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Offers:</div>
                    <div className="flex flex-wrap gap-1">
                      {userData.skillsOffered.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {userData.skillsOffered.length > 3 && (
                        <span className="text-xs text-gray-500">+{userData.skillsOffered.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills Wanted */}
                {userData.skillsWanted && userData.skillsWanted.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Wants to learn:</div>
                    <div className="flex flex-wrap gap-1">
                      {userData.skillsWanted.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {userData.skillsWanted.length > 3 && (
                        <span className="text-xs text-gray-500">+{userData.skillsWanted.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Request Button */}
                <button
                  onClick={() => {
                    const skillToRequest = userData.skillsOffered[0] || 'their skills';
                    handleSwapRequest(userData._id, skillToRequest, user.skillsOffered[0] || 'General Help');
                  }}
                  disabled={requesting === userData._id}
                  className="w-full bg-blue-600 dark:bg-yellow-400 text-white dark:text-black px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {requesting === userData._id ? 'Sending...' : 'Request Swap'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseSkills;
