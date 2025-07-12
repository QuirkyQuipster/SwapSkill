import { useState } from 'react';

function Profile() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');
  const [availability, setAvailability] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillInput) setSkillsOffered([...skillsOffered, skillInput]);
    setSkillInput('');
  };
  const addWanted = () => {
    if (wantedInput) setSkillsWanted([...skillsWanted, wantedInput]);
    setWantedInput('');
  };
  const toggleAvailability = slot => {
    setAvailability(
      availability.includes(slot)
        ? availability.filter(a => a !== slot)
        : [...availability, slot]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          <label className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 cursor-pointer overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              'Photo'
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
          <div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="text-2xl font-bold mb-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (optional)" className="text-gray-600 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none" />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Skills Offered</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            {skillsOffered.map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded">{skill}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill" className="px-2 py-1 border rounded" />
            <button type="button" onClick={addSkill} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Skills Wanted</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            {skillsWanted.map((skill, i) => (
              <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded">{skill}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={wantedInput} onChange={e => setWantedInput(e.target.value)} placeholder="Add wanted skill" className="px-2 py-1 border rounded" />
            <button type="button" onClick={addWanted} className="bg-purple-600 text-white px-3 py-1 rounded">Add</button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Availability</h3>
          <div className="flex gap-2">
            {['Weekends', 'Evenings', 'Mornings'].map(slot => (
              <button
                key={slot}
                type="button"
                className={`px-3 py-1 rounded ${availability.includes(slot) ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}
                onClick={() => toggleAvailability(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <label className="font-medium">Profile:</label>
          <button type="button" className={`px-3 py-1 rounded ${isPublic ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'}`} onClick={() => setIsPublic(true)}>Public</button>
          <button type="button" className={`px-3 py-1 rounded ${!isPublic ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'}`} onClick={() => setIsPublic(false)}>Private</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
