import axios from "axios";

const API_URL = "http://localhost:8011/links"; // Usa tu IP pública o localhost según el entorno

export const fetchLinks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createLink = async (linkData) => {
  const response = await axios.post(API_URL, linkData);
  return response.data;
};
