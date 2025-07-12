import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import api from '../services/api';

function Profile() {
  const { user, updateProfile } = useUser();
  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setSkillsOffered(user.skills_offered || []);
      setSkillsWanted(user.skills_wanted || []);
      setIsAvailable(user.is_available !== false);
      setPhoto(user.profile_photo || null);
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

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage('');
      
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        location,
        bio,
        skills_offered: skillsOffered,
        skills_wanted: skillsWanted,
        is_available: isAvailable,
        profile_photo: photo
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Edit Profile</h1>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`glass rounded-2xl p-4 mb-6 ${
            message.includes('successfully') 
              ? 'border border-green-400/30'
              : 'border border-red-400/30'
          }`}>
            <p className={message.includes('successfully') ? 'text-green-300' : 'text-red-300'}>
              {message}
            </p>
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <label className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white cursor-pointer overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              'Photo'
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
          <div className="flex-1 space-y-4">
            <input 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)} 
              placeholder="First Name" 
              className="input-modern w-full" 
            />
            <input 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
              placeholder="Last Name" 
              className="input-modern w-full" 
            />
            <input 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              placeholder="Location (optional)" 
              className="input-modern w-full" 
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell others about yourself..."
            className="input-modern w-full"
            rows="3"
            maxLength="500"
          />
          <div className="text-xs text-white/50 mt-1">{bio.length}/500</div>
        </div>

        {/* Skills Offered */}
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-4">Skills You Offer</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {skillsOffered.map((skill, i) => (
              <span key={i} className="skill-tag bg-green-500/20 text-green-300 border border-green-400/30 flex items-center gap-2">
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="text-green-400 hover:text-green-200 text-sm"
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
              className="input-modern flex-1" 
            />
            <button type="button" onClick={addSkill} className="btn-secondary">
              Add
            </button>
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-4">Skills You Want to Learn</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {skillsWanted.map((skill, i) => (
              <span key={i} className="skill-tag bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-2">
                {skill}
                <button 
                  onClick={() => removeWanted(skill)}
                  className="text-purple-400 hover:text-purple-200 text-sm"
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
              className="input-modern flex-1" 
            />
            <button type="button" onClick={addWanted} className="btn-secondary">
              Add
            </button>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-4">Availability</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={e => setIsAvailable(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              Available for skill swaps
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="spinner w-6 h-6 mr-3"></div>
                Saving...
              </div>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
