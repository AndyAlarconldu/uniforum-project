import { useState, useEffect } from "react";
import { fetchLinks, createLink } from "../api/courseForumLinkService";

export const useCourseForumLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLinks = async () => {
    try {
      const data = await fetchLinks();
      setLinks(data);
    } catch (error) {
      console.error("Error al cargar enlaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const addLink = async (linkData) => {
    try {
      const newLink = await createLink(linkData);
      setLinks((prev) => [...prev, newLink]);
    } catch (error) {
      console.error("Error al crear enlace:", error);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return { links, loading, addLink };
};
