const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  avatar: {
    type: String,
    default: function() {
      // Generate avatar based on fullName if not provided
      const colors = [
        ['#667eea', '#764ba2'],
        ['#f093fb', '#f5576c'],
        ['#4facfe', '#00f2fe'],
        ['#43e97b', '#38f9d7'],
      ];
      const size = 100;
      const name = this.fullName || 'User';
      const nameValue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const colorPair = colors[nameValue % colors.length];
      const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
      
      return `data:image/svg+xml,${encodeURIComponent(`<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad-${nameValue}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#grad-${nameValue})" /><text x="50" y="50" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">${initials}</text></svg>`)}`;
    }
  },
  coverPhoto: {
    type: String,
    default: ''
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
