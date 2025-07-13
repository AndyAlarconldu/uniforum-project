const Schedule = require("../models/schedule.model");

exports.getAll = async (req, res) => {
  try {
    const result = await Schedule.findAll();
    res.json(result.rows);
  } catch (err) {
    console.error("Error en getAll:", err);
    res.status(500).json({ error: "Error fetching schedules" });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Schedule.findById(req.params.id);
    if (result.rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en getById:", err);
    res.status(500).json({ error: "Error fetching schedule by ID" });
  }
};

exports.getByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ error: "Missing courseId" });

    const result = await Schedule.findByCourseId(courseId);
    res.json(result.rows);
  } catch (err) {
    console.error("Error en getByCourse:", err);
    res.status(500).json({ error: "Error fetching schedules by course" });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await Schedule.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error en create:", err);
    res.status(500).json({ error: "Error creating schedule" });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Schedule.update(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en update:", err);
    res.status(500).json({ error: "Error updating schedule" });
  }
};

exports.remove = async (req, res) => {
  try {
    await Schedule.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("Error en remove:", err);
    res.status(500).json({ error: "Error deleting schedule" });
  }
};
