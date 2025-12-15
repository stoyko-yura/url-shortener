import { db } from "../db";
import { ShortUrl } from "../types";

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

const getUrl = async (url: string): Promise<ShortUrl | null> => {
  const query = "SELECT * FROM urls WHERE original_url = ?";

  return new Promise((resolve, reject) => {
    db.get(query, [url], (err, row: any) => {
      if (err) {
        return reject(new Error("Error retrieving URL: " + err.message));
      }

      if (!row) return resolve(null);

      resolve({
        id: row["id"],
        originalUrl: row["original_url"],
        shortCode: row["short_code"],
        createdAt: row["created_at"],
      });
    });
  });
};

const createShortUrl = async (originalUrl: string) => {
  const code = generateCode();

  const query = "INSERT INTO urls (original_url, short_code) VALUES (?, ?)";

  return new Promise((resolve, reject) => {
    db.run(query, [originalUrl, code], (err) => {
      if (err) {
        return reject(new Error("Error creating short URL: " + err.message));
      }

      resolve({
        originalUrl,
        shortCode: code,
      });
    });
  });
};

export { createShortUrl, getUrl };
