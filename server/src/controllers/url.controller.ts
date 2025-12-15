import { Request, Response } from "express";
import { createShortUrl, getUrl } from "../services/url.service";

const shortenUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required", success: false });
    }

    if (typeof url !== "string" || !url.startsWith("http")) {
      return res.status(400).json({ message: "Invalid URL format", success: false });
    }

    const existUrl = await getUrl(url);

    if (existUrl) {
      return res.status(200).json({
        shortUrl: {
          originalUrl: existUrl.originalUrl,
          shortCode: existUrl.shortCode,
        },
        message: "URL already shortened",
        success: true,
      });
    }

    const shortUrl = await createShortUrl(url);

    res.status(201).json({
      shortUrl,
      message: "URL shortened successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in shortenUrl controller:", error);

    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export { shortenUrl };
