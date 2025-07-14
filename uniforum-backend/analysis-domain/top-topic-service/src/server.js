import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8014;
app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`🚀 Top Topics Service corriendo en http://localhost:${PORT}`);
});
