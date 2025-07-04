const express = require("express");
const app = express();
const cors = require("cors");
const linkRoutes = require("./routes/linkRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/links", linkRoutes);

const PORT = process.env.PORT || 8011;
app.listen(PORT, () => {
  console.log(`Course-Forum Link Service running on port ${PORT}`);
});
