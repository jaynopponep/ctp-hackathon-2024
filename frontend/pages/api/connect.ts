import { NextApiRequest, NextApiResponse } from "next";
import db from "../../config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT 1", (err: any, results: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log("Database connection successful:", results);
      res
        .status(200)
        .json({ message: "Database connection successful", results });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        message: "Error connecting to the database",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
