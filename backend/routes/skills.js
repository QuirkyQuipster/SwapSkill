const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get all available skills
router.get('/available', auth, async (req, res) => {
  try {
    const { skill, location, availability } = req.query;
    const query = { isPublic: true, _id: { $ne: req.user._id } };

    if (skill) {
      query.$or = [
        { skillsOffered: { $regex: skill, $options: 'i' } },
        { skillsWanted: { $regex: skill, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (availability) {
      query.availability = { $in: [availability] };
    }

    const users = await User.find(query)
      .select('name location skillsOffered skillsWanted availability rating profilePhoto')
      .limit(50);

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get popular skills
router.get('/popular', auth, async (req, res) => {
  try {
    const users = await User.find({ isPublic: true })
      .select('skillsOffered skillsWanted');

    const skillCount = {};
    
    users.forEach(user => {
      [...user.skillsOffered, ...user.skillsWanted].forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const popularSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    res.json({ popularSkills });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get skill categories
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = [
      { name: 'Technology', skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'HTML/CSS', 'SQL', 'Git', 'Docker'] },
      { name: 'Design', skills: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX Design', 'Graphic Design', 'Web Design', 'Logo Design', 'Typography'] },
      { name: 'Business', skills: ['Excel', 'PowerPoint', 'Project Management', 'Marketing', 'Sales', 'Accounting', 'Business Strategy', 'Data Analysis'] },
      { name: 'Creative', skills: ['Photography', 'Video Editing', 'Music Production', 'Writing', 'Drawing', 'Painting', 'Crafts', 'Cooking'] },
      { name: 'Languages', skills: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Portuguese', 'Italian'] },
      { name: 'Fitness', skills: ['Yoga', 'Weight Training', 'Running', 'Swimming', 'Martial Arts', 'Dance', 'Pilates', 'Nutrition'] },
      { name: 'Education', skills: ['Tutoring', 'Teaching', 'Curriculum Development', 'Online Learning', 'Academic Writing', 'Research'] },
      { name: 'Other', skills: ['Driving', 'Gardening', 'Home Repair', 'Pet Care', 'Event Planning', 'Public Speaking'] }
    ];

    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 