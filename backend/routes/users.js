const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      name,
      location,
      bio,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
      profilePhoto
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (skillsOffered) updateData.skillsOffered = skillsOffered;
    if (skillsWanted) updateData.skillsWanted = skillsWanted;
    if (availability) updateData.availability = availability;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ user: updatedUser.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search users
router.get('/search', auth, async (req, res) => {
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
      .limit(20);

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user by ID (public profile)
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password -email -role -isVerified');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isPublic && user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Profile is private' });
    }

    res.json({ user: user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 