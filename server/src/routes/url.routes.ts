import { Router } from "express";
import { redirectToOriginalUrl, shortenUrl } from "../controllers/url.controller";

const router = Router();

router.post("/api/url/shorten", shortenUrl);
router.get("/s/:shortCode", redirectToOriginalUrl);

export default router;
