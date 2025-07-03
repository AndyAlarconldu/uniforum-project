/**
 * Voting API service for handling post scores and user votes
 * Manages vote submission and post score retrieval
 */

/**
 * Retrieves the current score (vote count) for a specific post
 * @param {string} postId - The ID of the post to get the score for
 * @returns {Promise<Object>} Object containing post score data
 * @throws {Error} If the request fails
 */
export async function getPostScore(postId) {
  const res = await fetch(`http://3.128.173.203/votes/post/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post score");
  return await res.json();
}

/**
 * Submits a vote (upvote/downvote) for a specific post
 * @param {string} postId - The ID of the post being voted on
 * @param {string} type - The type of vote ('upvote' or 'downvote')
 * @returns {Promise<Object>} The vote confirmation object
 * @throws {Error} If the user has already voted or request fails
 */
export async function submitVote(postId, type) {
  const res = await fetch("http://3.128.173.203/votes/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      id_vote: `vote_${Date.now()}`, // Generate unique vote ID
      student_id: "stu001", // TODO: Replace with actual user ID from auth
      post_id: postId,
      vote_type: type, // Expected values: 'upvote' or 'downvote'
    }),
  });

  if (!res.ok) throw new Error("You have already voted for this post");
  return await res.json();
}