import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const YOUR_DISCORD_ID = process.env.MY_DISCORD_ID;
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/discord_user=([^;]+)/);
  if (!match) return res.status(401).json({ error: "No autenticado" });

  const user = JSON.parse(decodeURIComponent(match[1]));
  if (user.id !== YOUR_DISCORD_ID)
    return res.status(403).json({ error: "No autorizado" });

  let body = "";
  for await (const chunk of req) body += chunk;
  const { count } = JSON.parse(body);

  const filePath = path.join(process.cwd(), "data", "progress.json");
  fs.writeFileSync(filePath, JSON.stringify({ count }, null, 2));

  res.status(200).json({ success: true });
}
