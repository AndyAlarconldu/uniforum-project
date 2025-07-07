require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/reaction.routes');

app.use(express.json());
app.use('/reaction', router);

const port = process.env.PORT || 8016;
app.listen(port, () => {
  console.log(`Reaction service running on port ${port}`);
});
