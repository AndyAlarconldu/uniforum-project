// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import CourseManagement from "./admin/CourseManagement";
import SyncLogs from "./admin/SyncLogs";
import Metrics from "./admin/Metrics"; // <-- 👈 Asegúrate que la ruta es correcta
import TopTopics from "./admin/TopTopics";
import Heatmap from "./admin/Heatmap";
import ConfigManagement from "./admin/ConfigManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "courses" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          Course Management
        </button>
        {/* <button
          className={`px-4 py-2 rounded ${
            activeTab === "sync" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("sync")}
        >
          LMS Sync Logs
        </button> */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "metrics" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("metrics")}
        >
          Platform Metrics
        </button>
        <button
  className={`px-4 py-2 rounded ${
    activeTab === "topics" ? "bg-blue-600 text-white" : "bg-gray-200"
  }`}
  onClick={() => setActiveTab("topics")}
>
  Top Tags
</button>
  <button onClick={() => setActiveTab("heatmap")} className={`px-4 py-2 rounded ${activeTab === "heatmap" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Heatmap</button>
  <button
  className={`px-4 py-2 rounded ${activeTab === "config" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
  onClick={() => setActiveTab("config")}
>
  System Config
</button>
      </div>

      <div className="bg-white rounded shadow p-4">
        {activeTab === "courses" && <CourseManagement />}
        {/* {activeTab === "sync" && <SyncLogs />} */}
        {activeTab === "metrics" && <Metrics />}
        {activeTab === "topics" && <TopTopics />}
         {activeTab === "heatmap" && <Heatmap />}
         {activeTab === "config" && <ConfigManagement />}

      </div>
    </div>
  );
};

export default AdminDashboard;
