import { useEffect, useState } from "react";
import { getPendingReports, resolveReport } from "../api/moderation";

/**
 * Moderation Panel Component
 * Displays and handles pending content reports for moderators
 * Allows approving or rejecting reported content
 */
function Moderation() {
  // State for storing reports and any error messages
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  // Fetch pending reports on component mount
  useEffect(() => {
    getPendingReports()
      .then(setReports) // Update state with fetched reports
      .catch((err) => setError(err.message)); // Handle errors
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Handles report resolution (approve/reject)
   * @param {string} reportId - ID of the report to resolve
   * @param {string} action - Resolution action ('approved' or 'rejected')
   */
  const handleResolve = async (reportId, action) => {
    try {
      // Send resolution to API
      await resolveReport(reportId, {
        status: action,
        reviewed_by: "moderator01", // TODO: Replace with actual moderator ID from auth
      });
      
      // Remove resolved report from local state
      setReports((prev) => prev.filter((r) => r.id_report !== reportId));
    } catch (err) {
      alert("Resolution failed: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Reports</h2>
      
      {/* Error display */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Conditional rendering based on reports */}
      {reports.length === 0 ? (
        <p>No pending reports.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id_report} className="border p-4 rounded shadow">
              {/* Report details */}
              <p><strong>Type:</strong> {report.content_type}</p>
              <p><strong>Content ID:</strong> {report.content_id}</p>
              <p><strong>Reason:</strong> {report.reason}</p>
              
              {/* Action buttons */}
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleResolve(report.id_report, "approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleResolve(report.id_report, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Moderation;