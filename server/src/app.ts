import cors from "cors";
import express from "express";
import path from "path";
import urlRoutes from "./routes/url.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", urlRoutes);
app.use(express.static(path.join(__dirname, "..", "..", "client")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "client", "index.html"));
});

export { app };
