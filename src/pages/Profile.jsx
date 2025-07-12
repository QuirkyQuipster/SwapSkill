import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import api from '../services/api';

function Profile() {
  const { user, updateProfile } = useUser();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');
  const [availability, setAvailability] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setSkillsOffered(user.skillsOffered || []);
      setSkillsWanted(user.skillsWanted || []);
      setAvailability(user.availability || []);
      setIsPublic(user.isPublic !== false);
      setPhoto(user.profilePhoto || null);
    }
  }, [user]);

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillInput && !skillsOffered.includes(skillInput)) {
      setSkillsOffered([...skillsOffered, skillInput]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillsOffered(skillsOffered.filter(skill => skill !== skillToRemove));
  };

  const addWanted = () => {
    if (wantedInput && !skillsWanted.includes(wantedInput)) {
      setSkillsWanted([...skillsWanted, wantedInput]);
      setWantedInput('');
    }
  };

  const removeWanted = (skillToRemove) => {
    setSkillsWanted(skillsWanted.filter(skill => skill !== skillToRemove));
  };

  const toggleAvailability = slot => {
    setAvailability(
      availability.includes(slot)
        ? availability.filter(a => a !== slot)
        : [...availability, slot]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      await updateProfile({
        name,
        location,
        bio,
        skillsOffered,
        skillsWanted,
        availability,
        isPublic,
        profilePhoto: photo
      });
      
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-yellow-300">Edit Profile</h1>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded mb-6 ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="flex items-center gap-6 mb-6">
          <label className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 cursor-pointer overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              'Photo'
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
          <div className="flex-1">
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Your Name" 
              className="text-2xl font-bold mb-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none w-full" 
            />
            <input 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              placeholder="Location (optional)" 
              className="text-gray-600 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none w-full" 
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell others about yourself..."
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            maxLength="500"
          />
          <div className="text-xs text-gray-500 mt-1">{bio.length}/500</div>
        </div>

        {/* Skills Offered */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Skills You Offer</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            {skillsOffered.map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center gap-2">
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              value={skillInput} 
              onChange={e => setSkillInput(e.target.value)} 
              placeholder="Add skill" 
              className="px-3 py-2 border rounded flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" 
            />
            <button type="button" onClick={addSkill} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Add
            </button>
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Skills You Want to Learn</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            {skillsWanted.map((skill, i) => (
              <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded flex items-center gap-2">
                {skill}
                <button 
                  onClick={() => removeWanted(skill)}
                  className="text-purple-500 hover:text-purple-700 text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              value={wantedInput} 
              onChange={e => setWantedInput(e.target.value)} 
              placeholder="Add wanted skill" 
              className="px-3 py-2 border rounded flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600" 
            />
            <button type="button" onClick={addWanted} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Add
            </button>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Availability</h3>
          <div className="flex gap-2 flex-wrap">
            {['Weekends', 'Evenings', 'Mornings', 'Weekdays'].map(slot => (
              <button
                key={slot}
                type="button"
                className={`px-4 py-2 rounded transition ${
                  availability.includes(slot) 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                }`}
                onClick={() => toggleAvailability(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Privacy</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="text-blue-600"
              />
              <span>Public Profile</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className="text-blue-600"
              />
              <span>Private Profile</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
