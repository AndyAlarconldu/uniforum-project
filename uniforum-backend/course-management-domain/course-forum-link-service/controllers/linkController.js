const { createLink, getAllLinks } = require("../models/linkModel");

const addLink = async (req, res) => {
  const { id_link, course_id, forum_id } = req.body;
  try {
    const newLink = await createLink(id_link, course_id, forum_id);
    res.status(201).json(newLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el enlace" });
  }
};

const listLinks = async (req, res) => {
  try {
    const links = await getAllLinks();
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener enlaces" });
  }
};

module.exports = { addLink, listLinks };
