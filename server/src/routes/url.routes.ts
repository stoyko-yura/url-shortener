import { Router } from "express";

const router = Router();

router.post("/shorten", (req, res) => {
  res.json({
    message: "URL shortened successfully",
  });
});

export default router;
