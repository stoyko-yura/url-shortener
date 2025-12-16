import cors from "cors";
import express from "express";
import urlRoutes from "./routes/url.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/url", urlRoutes);

export { app };
