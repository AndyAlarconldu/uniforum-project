// Base URL for the API Gateway endpoint
const API_URL = import.meta.env.VITE_DISCUSSION_SERVICE || "http://3.211.89.67/discussions"; // API Gateway IP address

/**
 * Fetches all posts from the API
 * @returns {Promise<Array>} Array of post objects
 */
export const getPosts = async () => {
  const res = await fetch(`${API_URL}/`);
  return await res.json();
};

/**
 * Creates a new post by sending data to the API
 * @param {Object} data - Post data to create
 * @param {string} data.id_post - Unique post identifier
 * @param {string} data.title - Post title
 * @param {string} data.content - Post content
 * @param {string} data.student_id - Author's student ID
 * @returns {Promise<Object>} The created post object
 * @throws {Error} If the API request fails
 */
export const createPost = async (data) => {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" // Set content type to JSON
    },
    body: JSON.stringify({
      id_post: data.id_post,
      title: data.title,
      content: data.content,
      student_id: data.student_id
    }),
  });

  // Handle error responses
  if (!res.ok) {
    const error = await res.json();
    console.error("Error creating post:", error);
    throw new Error("Error creating post");
  }

  return await res.json();
};