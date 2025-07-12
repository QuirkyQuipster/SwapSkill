import React from 'react';

export default function SkillList({ skills, color }) {
  if (!skills || !Array.isArray(skills)) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap mb-2">
      {skills.map((skill, i) => (
        <span key={i} className={`skill-tag px-3 py-1 rounded ${color}`}>
          {skill}
        </span>
      ))}
    </div>
  );
}
