import React from 'react';

export default function SkillList({ skills, color }) {
  return (
    <div className="flex gap-2 flex-wrap mb-2">
      {skills.map((skill, i) => (
        <span key={i} className={`px-3 py-1 rounded ${color}`}>{skill}</span>
      ))}
    </div>
  );
}
