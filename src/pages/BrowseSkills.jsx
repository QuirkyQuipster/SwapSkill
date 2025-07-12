import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function BrowseSkills() {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
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
      setUsers(data.users || []);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async (recipientId, requestedSkill, offeredSkill) => {
    if (!isAuthenticated) {
      alert('Please login to send swap requests');
      navigate('/login');
      return;
    }

    try {
      setRequesting(recipientId);
      
      await api.createSwapRequest({
        recipient: recipientId,
        requested_skill: requestedSkill,
        offered_skill: offeredSkill,
        message: `I'd like to learn ${requestedSkill} from you. I can offer ${offeredSkill} in return.`
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Browse Skills</h1>
        <p className="text-white/80 text-lg">Find people with the skills you want to learn</p>
      </div>
      
      {/* Login Prompt for Non-Authenticated Users */}
      {!isAuthenticated && (
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg">Want to connect with others?</h3>
              <p className="text-white/80 text-sm mt-1">
                Login to send swap requests and manage your profile
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="glass rounded-2xl p-6 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-modern w-full mb-4"
          placeholder="Search by skill (e.g., JavaScript, Photoshop, Cooking)..."
        />
        
        {/* Popular Skills */}
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                selectedSkill === skill
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass rounded-2xl p-6 mb-8 border border-red-400/30">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="glass rounded-2xl p-8">
              <p className="text-white/60 text-lg">
                {searchTerm || selectedSkill 
                  ? 'No users found with those skills. Try a different search term.'
                  : 'No users available at the moment.'
                }
              </p>
            </div>
          </div>
        ) : (
          users.map((userData) => (
            <div key={userData.id} className="glass card-hover rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                  {userData.profile_photo ? (
                    <img src={userData.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    `${userData.first_name?.[0] || userData.username?.[0] || 'U'}`
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-white">
                    {userData.first_name && userData.last_name 
                      ? `${userData.first_name} ${userData.last_name}`
                      : userData.username
                    }
                  </div>
                  {userData.location && (
                    <div className="text-sm text-white/60">
                      📍 {userData.location}
                    </div>
                  )}
                  {userData.rating && userData.rating > 0 && (
                    <div className="text-sm text-yellow-300">
                      ⭐ {userData.rating.toFixed(1)} ({userData.rating_count} reviews)
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Offered */}
              {userData.skills_offered && userData.skills_offered.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-white/80 mb-2">Offers:</div>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills_offered.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag bg-green-500/20 text-green-300 border border-green-400/30">
                        {skill}
                      </span>
                    ))}
                    {userData.skills_offered.length > 3 && (
                      <span className="text-xs text-white/50">+{userData.skills_offered.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Skills Wanted */}
              {userData.skills_wanted && userData.skills_wanted.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-medium text-white/80 mb-2">Wants to learn:</div>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills_wanted.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag bg-purple-500/20 text-purple-300 border border-purple-400/30">
                        {skill}
                      </span>
                    ))}
                    {userData.skills_wanted.length > 3 && (
                      <span className="text-xs text-white/50">+{userData.skills_wanted.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Bio */}
              {userData.bio && (
                <div className="mb-6">
                  <p className="text-white/70 text-sm italic">"{userData.bio}"</p>
                </div>
              )}

              {/* Request Button */}
              <button
                onClick={() => {
                  const skillToRequest = userData.skills_offered?.[0] || 'their skills';
                  const userOfferedSkill = isAuthenticated ? (user.skills_offered?.[0] || 'General Help') : 'General Help';
                  handleSwapRequest(userData.id, skillToRequest, userOfferedSkill);
                }}
                disabled={requesting === userData.id}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting === userData.id ? 'Sending...' : 'Request Swap'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseSkills;
