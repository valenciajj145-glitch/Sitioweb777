import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "progress.json");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ count: 0 }, null, 2));
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json(data);
}
