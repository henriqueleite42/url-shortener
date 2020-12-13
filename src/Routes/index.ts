import cors from "cors";
import express from "express";
const app = express();

app.use(cors({ origin: true }));

export const router = express.Router();

export default app;
