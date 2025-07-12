const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedSkill: {
    type: String,
    required: true,
    trim: true
  },
  offeredSkill: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500,
    default: ''
  },
  scheduledDate: {
    type: Date,
    default: null
  },
  completedDate: {
    type: Date,
    default: null
  },
  rating: {
    fromRequester: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: 300
      },
      date: {
        type: Date,
        default: Date.now
      }
    },
    fromRecipient: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: 300
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ recipient: 1, status: 1 });
swapRequestSchema.index({ status: 1, createdAt: -1 });

// Virtual for checking if request is active
swapRequestSchema.virtual('isActive').get(function() {
  return ['pending', 'accepted'].includes(this.status);
});

// Method to update user ratings after completion
swapRequestSchema.methods.updateUserRatings = async function() {
  if (this.status !== 'completed') return;
  
  const User = mongoose.model('User');
  
  // Update requester rating
  if (this.rating.fromRecipient.rating) {
    const requester = await User.findById(this.requester);
    const newAverage = (requester.rating.average * requester.rating.count + this.rating.fromRecipient.rating) / (requester.rating.count + 1);
    await User.findByIdAndUpdate(this.requester, {
      'rating.average': newAverage,
      'rating.count': requester.rating.count + 1
    });
  }
  
  // Update recipient rating
  if (this.rating.fromRequester.rating) {
    const recipient = await User.findById(this.recipient);
    const newAverage = (recipient.rating.average * recipient.rating.count + this.rating.fromRequester.rating) / (recipient.rating.count + 1);
    await User.findByIdAndUpdate(this.recipient, {
      'rating.average': newAverage,
      'rating.count': recipient.rating.count + 1
    });
  }
};

module.exports = mongoose.model('SwapRequest', swapRequestSchema); 