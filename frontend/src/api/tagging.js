// src/api/tagging.js
/**
 * Tagging API service for managing post tags
 * Handles tag retrieval, assignment, and post-tag relationships
 */

// Base URL for the Tags API endpoint
const BASE_URL = "http://3.128.173.203/tags";

/**
 * Fetches all available tags from the API
 * @returns {Promise<Array>} Array of tag objects
 * @throws {Error} If the request fails
 */
export async function getAllTags() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return await res.json();
}

/**
 * Assigns a tag to a specific post
 * @param {string} postId - ID of the post to tag
 * @param {string} tagId - ID of the tag to assign
 * @returns {Promise<Object>} The assignment confirmation object
 * @throws {Error} If the assignment fails
 */
export async function assignTagToPost(postId, tagId) {
  const res = await fetch(`${BASE_URL}/assign`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ 
      id_post: postId, 
      id_tag: tagId 
    }),
  });
  if (!res.ok) throw new Error("Failed to assign tag to post");
  return await res.json();
}

/**
 * Retrieves all tags associated with a specific post
 * @param {string} postId - ID of the post to query
 * @returns {Promise<Array>} Array of tag objects
 * @throws {Error} If the request fails
 */
export async function getTagsByPost(postId) {
  // Note: Consider using BASE_URL constant for consistency
  const res = await fetch(`http://3.128.173.203/tags/post/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post tags");
  return await res.json();
}