const Schedule = require("../models/schedule.model");

exports.getAll = async (req, res) => {
  const result = await Schedule.findAll();
  res.json(result.rows);
};

exports.getById = async (req, res) => {
  const result = await Schedule.findById(req.params.id);
  if (result.rows.length === 0) return res.status(404).json({ message: "Not found" });
  res.json(result.rows[0]);
};

exports.create = async (req, res) => {
  const result = await Schedule.create(req.body);
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const result = await Schedule.update(req.params.id, req.body);
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  await Schedule.remove(req.params.id);
  res.status(204).send();
};
