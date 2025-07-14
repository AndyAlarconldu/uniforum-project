// Base URL for the Replies API endpoint
// Note: There's a trailing slash that should be consistent with other API_URL declarations
const API_URL = "http://3.211.89.67/replies/";

/**
 * Fetches all replies for a specific post
 * @param {string} postId - ID of the post to get replies for
 * @returns {Promise<Array>} Array of reply objects
 * @throws {Error} If the request fails
 */
export const getReplies = async (postId) => {
  const res = await fetch(`${API_URL}post/${postId}`);  // Note: Removed extra slash for consistency
  if (!res.ok) throw new Error("Failed to fetch replies");
  return await res.json();
};

/**
 * Creates a new reply for a post
 * @param {Object} data - Reply data to create
 * @param {string} data.id_reply - Unique reply identifier
 * @param {string} data.content - Reply content
 * @param {string} data.post_id - Parent post ID
 * @param {string} data.student_id - Author's student ID
 * @returns {Promise<Object>} The created reply object
 * @throws {Error} If the reply creation fails
 */
export const createReply = async (data) => {
  const res = await fetch(API_URL, {  // Uses base API_URL with trailing slash
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Failed to create reply:", error);
    throw new Error("Failed to create reply");
  }

  return await res.json();
};