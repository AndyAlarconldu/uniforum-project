const express = require("express");
const cors = require("cors");
const scheduleRoutes = require("./routes/schedule.routes");

const app = express();
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],

}));app.use(express.json());

app.use("/api/schedules", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("Academic Schedule Service is up and running");
});

module.exports = app;
