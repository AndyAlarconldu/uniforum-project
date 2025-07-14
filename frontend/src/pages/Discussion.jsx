import React, { useState, useEffect } from "react";
import { getPosts, createPost } from "../api/discussion";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { reportPost } from "../api/moderation";
import { getPostScore, submitVote } from "../api/voting";
import { getAllTags, assignTagToPost } from "../api/tagging";
import { getTagsByPost } from "../api/tagging";
import { useAuth } from "../context/AuthContext";

/**
 * Discussion component - Main forum view for displaying and creating posts
 * Features:
 * - Post creation with tags
 * - Post voting (upvote/downvote)
 * - Post reporting
 * - Tag management
 * - Reply navigation
 */
const Discussion = () => {
  // State management
  const [posts, setPosts] = useState([]); // Stores all discussion posts
  const [scores, setScores] = useState({}); // Stores vote scores for each post
  const [availableTags, setAvailableTags] = useState([]); // All available tags
  const [selectedTag, setSelectedTag] = useState(""); // Currently selected tag for new post
  const { user } = useAuth();

  // Form state for new post creation
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    student_id: "", // Temporary fixed user - TODO: Replace with auth
  });

  useEffect(() => {
  if (user?.sub) {
    setFormData((prev) => ({
      ...prev,
      student_id: user.id,
    }));
  }
}, [user]);

  /**
   * Initial data loading effect
   * - Loads all posts with their scores and tags
   * - Loads available tags for the tag selector
   */
  useEffect(() => {
    // Fetch posts and related data
    getPosts()
      .then(async (data) => {
        if (Array.isArray(data)) {
          const scoreMap = {};
          const postsWithTags = [];
          
          // Process each post to get scores and tags
          for (const post of data) {
            try {
              const score = await getPostScore(post.id_post);
              scoreMap[post.id_post] = score;
            } catch {
              scoreMap[post.id_post] = "Error";
            }
            
            try {
              const tags = await getTagsByPost(post.id_post);
              postsWithTags.push({ ...post, tags });
            } catch {
              postsWithTags.push({ ...post, tags: [] });
            }
          }
          
          setPosts(postsWithTags);
          setScores(scoreMap);
        } else {
          console.error("Invalid posts data format:", data);
        }
      })
      .catch((err) => console.error("Error loading posts:", err));

    // Load available tags
    getAllTags()
      .then((tags) => {
        if (Array.isArray(tags)) {
          setAvailableTags(tags);
        } else {
          console.warn("Invalid tags format:", tags);
          setAvailableTags([]);
        }
      })
      .catch((err) => {
        console.warn("Failed to load tags:", err);
        setAvailableTags([]);
      });
  }, []);

  /**
   * Handles form input changes
   * @param {Object} e - The change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendMentions = async (text, origin_user_id, target_id) => {
  try {
    const res = await fetch("http://localhost:8018/mentions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin_user_id,
        text,
        target_id,
      }),
    });

    if (!res.ok) throw new Error("Mention service error");
    const data = await res.json();
    console.log("✅ Mentions sent:", data.mentioned);
  } catch (err) {
    console.error("❌ Error sending mentions:", err.message);
  }
};


  /**
   * Handles new post submission
   * @param {Object} e - The submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id_post: uuidv4(), // Generate unique ID
      title: formData.title,
      content: formData.content,
      student_id: formData.student_id || "stu001", // Fallback to test user
    };

    try {
      // Create the post
      const created = await createPost(newPost);
      await sendMentions(formData.content, newPost.student_id, created.id_post);
      // Assign tag if one was selected
      if (selectedTag) {
        try {
          await assignTagToPost(created.id_post, selectedTag);
        } catch (err) {
          console.warn("Tag assignment failed:", err.message);
        }
      }

      // Update UI with new post
      setPosts((prev) => [
        ...prev,
        { 
          ...created, 
          tags: selectedTag 
            ? [{ 
                id_tag: selectedTag, 
                name: availableTags.find(t => t.id_tag === selectedTag)?.name 
              }] 
            : [] 
        }
      ]);
      
      // Reset form
      setFormData({ title: "", content: "", student_id: "" });
      setSelectedTag("");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* New Post Form */}
      <h2 className="text-xl font-bold mb-4">Create new publication</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Form inputs */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        
        {/* Tag selector (conditionally rendered) */}
        {availableTags.length > 0 && (
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a tag</option>
            {availableTags.map((tag) => (
              <option key={tag.id_tag} value={tag.id_tag}>
                {tag.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Publish
        </button>
      </form>

      {/* Posts List */}
      <h2 className="text-xl font-bold mb-4">Recent Publications</h2>
      {posts.map((post) => {
        const score = scores[post.id_post];

        /**
         * Handles voting on a post
         * @param {string} type - Vote type ('upvote' or 'downvote')
         */
        const handleVote = (type) => {
          submitVote(post.id_post, type)
            .then(() =>
              getPostScore(post.id_post).then((newScore) =>
                setScores((prev) => ({ ...prev, [post.id_post]: newScore }))
              )
            )
            .catch((err) => alert("Vote failed: " + err.message));
        };

        return (
          <div key={post.id_post} className="border p-4 mb-2 rounded shadow">
            {/* Post content */}
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>

            {/* Post actions */}
            <div className="mt-2 flex gap-4 items-center">
              {/* Report button */}
              <button
                onClick={() =>
                  reportPost(post)
                    .then(() => alert("Post reported successfully"))
                    .catch((err) => alert("Report failed: " + err.message))
                }
                className="text-sm text-red-600 hover:underline"
              >
                Report
              </button>

              {/* Voting controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote("upvote")}
                  className="text-green-600 text-sm"
                >
                  👍
                </button>
                <span className="text-gray-700 font-semibold">
                  {score?.score ?? "..."}
                </span>
                <button
                  onClick={() => handleVote("downvote")}
                  className="text-red-600 text-sm"
                >
                  👎
                </button>
              </div>
            </div>

            {/* Post metadata */}
            <small className="text-gray-500">By: {user.sub}</small>
            
            {/* Tags display */}
            <div className="mt-2 text-sm text-gray-600">
              {post.tags?.length > 0 ? (
                <div>
                  Tags:{" "}
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id_tag}
                      className="inline-block bg-gray-200 px-2 py-1 mr-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No tags</div>
              )}
            </div>

            {/* Replies link */}
            <div className="mt-2">
              <Link
                to={`/post/${post.id_post}/replies`}
                className="text-blue-500 hover:underline"
              >
                View replies
              </Link>
            </div>
            <div className="mt-1">
  <Link
    to={`/post/${post.id_post}/history`}
    className="text-purple-600 hover:underline text-sm"
  >
    View edit history
  </Link>
</div>

          </div>
        );
      })}
    </div>
  );
};

export default Discussion;