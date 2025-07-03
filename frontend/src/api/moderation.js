// Base URL for the Reports API endpoint
const API_URL = "http://3.128.173.203/reports";

/**
 * Fetches all pending reports from the API
 * @returns {Promise<Array>} Array of pending report objects
 * @throws {Error} If the request fails
 */
export async function getPendingReports() {
  const res = await fetch(`${API_URL}/pending`);
  if (!res.ok) throw new Error("Failed to fetch pending reports");
  return await res.json();
}

/**
 * Resolves a specific report by ID
 * @param {string} reportId - ID of the report to resolve
 * @param {Object} data - Resolution data to send
 * @returns {Promise<Object>} The resolved report object
 * @throws {Error} If the resolution fails
 */
export async function resolveReport(reportId, data) {
  const res = await fetch(`${API_URL}/${reportId}/resolve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to resolve report");
  return await res.json();
}

/**
 * Reports a post by creating a new report entry
 * @param {Object} post - The post object to report
 * @param {string} post.id_post - ID of the post being reported
 * @returns {Promise<Object>} The created report object
 * @throws {Error} If the report creation fails
 */
export async function reportPost(post) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_report: `rep_${Date.now()}`, // Generate unique report ID
      content_type: "post",           // Type of content being reported
      content_id: post.id_post,       // ID of the reported content
      reason: "Inappropriate content", // Default reason
      reported_by: "stu001",          // Hardcoded reporter ID (should be dynamic)
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to report post");
  }

  return await res.json();
}