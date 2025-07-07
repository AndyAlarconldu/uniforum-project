const Notification = require('../models/notification.model');

// Crear notificación
exports.create = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const saved = await notification.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener notificaciones por user_id
exports.getByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.params.user_id }).sort({ timestamp: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marcar como leída
exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar notificación
exports.delete = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
