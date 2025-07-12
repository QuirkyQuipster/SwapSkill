const express = require('express');
const { auth } = require('../middleware/auth');
const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

const router = express.Router();

// Create swap request
router.post('/', auth, async (req, res) => {
  try {
    const { recipientId, requestedSkill, offeredSkill, message, scheduledDate } = req.body;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    // Check if recipient is public
    if (!recipient.isPublic) {
      return res.status(403).json({ error: 'Cannot send request to private profile' });
    }

    // Check if there's already a pending request
    const existingRequest = await SwapRequest.findOne({
      requester: req.user._id,
      recipient: recipientId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'You already have an active request with this user' });
    }

    const swapRequest = new SwapRequest({
      requester: req.user._id,
      recipient: recipientId,
      requestedSkill,
      offeredSkill,
      message,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null
    });

    await swapRequest.save();

    // Populate user details
    await swapRequest.populate('requester', 'name profilePhoto');
    await swapRequest.populate('recipient', 'name profilePhoto');

    res.status(201).json({ swapRequest });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's swap requests (incoming and outgoing)
router.get('/', auth, async (req, res) => {
  try {
    const { status, type } = req.query;
    const query = {};

    if (type === 'incoming') {
      query.recipient = req.user._id;
    } else if (type === 'outgoing') {
      query.requester = req.user._id;
    } else {
      query.$or = [
        { requester: req.user._id },
        { recipient: req.user._id }
      ];
    }

    if (status) {
      query.status = status;
    }

    const swapRequests = await SwapRequest.find(query)
      .populate('requester', 'name profilePhoto')
      .populate('recipient', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json({ swapRequests });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update swap request status
router.patch('/:requestId', auth, async (req, res) => {
  try {
    const { status, rating, comment } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.requestId);

    if (!swapRequest) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // Check if user is authorized to update this request
    if (swapRequest.requester.toString() !== req.user._id.toString() && 
        swapRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update status
    if (status) {
      swapRequest.status = status;
      
      if (status === 'completed') {
        swapRequest.completedDate = new Date();
      }
    }

    // Add rating
    if (rating && comment) {
      const isRequester = swapRequest.requester.toString() === req.user._id.toString();
      const ratingField = isRequester ? 'fromRequester' : 'fromRecipient';
      
      swapRequest.rating[ratingField] = {
        rating: parseInt(rating),
        comment,
        date: new Date()
      };

      // Update user ratings if both parties have rated
      if (swapRequest.rating.fromRequester.rating && swapRequest.rating.fromRecipient.rating) {
        await swapRequest.updateUserRatings();
      }
    }

    await swapRequest.save();

    // Populate user details
    await swapRequest.populate('requester', 'name profilePhoto');
    await swapRequest.populate('recipient', 'name profilePhoto');

    res.json({ swapRequest });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get swap request by ID
router.get('/:requestId', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.requestId)
      .populate('requester', 'name profilePhoto')
      .populate('recipient', 'name profilePhoto');

    if (!swapRequest) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // Check if user is authorized to view this request
    if (swapRequest.requester.toString() !== req.user._id.toString() && 
        swapRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({ swapRequest });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete swap request
router.delete('/:requestId', auth, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.requestId);

    if (!swapRequest) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // Only requester can delete pending requests
    if (swapRequest.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Can only delete pending requests' });
    }

    await SwapRequest.findByIdAndDelete(req.params.requestId);
    res.json({ message: 'Swap request deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 