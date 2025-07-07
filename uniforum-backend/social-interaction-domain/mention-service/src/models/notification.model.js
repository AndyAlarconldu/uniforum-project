const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  origin_user_id: { type: String, required: true },
  type: { type: String, enum: ['mention', 'like', 'reply'], required: true },
  target_id: { type: String, required: true },
  message: { type: String },
  is_read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
