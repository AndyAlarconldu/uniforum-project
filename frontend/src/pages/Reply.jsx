import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/discussion";
import { getReplies, createReply } from "../api/reply";
import { v4 as uuidv4 } from "uuid";

/**
 * Reply Component - Displays a post and its replies with a reply form
 * Features:
 * - Shows the original post details
 * - Lists all replies to the post
 * - Form to submit new replies
 * - Handles loading states
 */
const Reply = () => {
  // Get post ID from URL parameters
  const { postId } = useParams();

  // Component state
  const [post, setPost] = useState(null); // The original post
  const [replies, setReplies] = useState([]); // All replies to the post
  const [content, setContent] = useState(""); // Reply form content
  const [studentId, setStudentId] = useState(""); // Student ID for reply author

  // 1. Load the original post when component mounts or postId changes
  useEffect(() => {
    getPosts().then((posts) => {
      const found = posts.find((p) => p.id_post === postId);
      if (found) setPost(found);
    });
  }, [postId]);

  // 2. Load replies for the post when component mounts or postId changes
  useEffect(() => {
    getReplies(postId).then((res) => {
      // Handle different API response formats
      if (Array.isArray(res)) {
        setReplies(res);
      } else if (res && typeof res === "object") {
        setReplies([res]); // Convert single reply to array
      } else {
        setReplies([]); // Fallback to empty array
      }
    });
  }, [postId]);

  /**
   * Handles reply submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new reply object
    const newReply = {
      id_comment: uuidv4(), // Generate unique ID
      post_id: postId,
      content,
      student_id: studentId || "demo-user-001", // Fallback to demo user
    };

    try {
      // Submit new reply to API
      const created = await createReply(newReply);
      
      // Update UI with new reply
      setReplies((prev) => [...prev, created]);
      
      // Reset form fields
      setContent("");
      setStudentId("");
    } catch (err) {
      console.error("Error creating reply:", err);
    }
  };

  // Show loading state while post is being fetched
  if (!post) return <p className="p-4">Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Original Post Section */}
      <h2 className="text-xl font-bold mb-2">Original Post</h2>
      <div className="border p-4 rounded shadow mb-6">
        <h3 className="font-semibold">{post.title}</h3>
        <p>{post.content}</p>
        <small className="text-gray-500">By: {post.student_id}</small>
      </div>

      {/* Replies Section */}
      <h3 className="text-lg font-bold mb-2">Replies</h3>
      {replies.length > 0 ? (
        replies.map((reply) => (
          <div key={reply.id_comment} className="border p-3 rounded mb-2 shadow-sm">
            <p>{reply.content}</p>
            <small className="text-gray-500">By: {reply.student_id}</small>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No replies yet.</p>
      )}

      {/* Reply Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mt-6">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Reply
        </button>
      </form>
    </div>
  );
};

export default Reply;