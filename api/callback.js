import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const code = req.query.code;
  const data = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: `${process.env.BASE_URL}/api/callback`,
    scope: "identify",
  });

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = await tokenResponse.json();
  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  const user = await userResponse.json();

  // Guardamos el usuario en una cookie sencilla (no sensible)
  res.setHeader(
    "Set-Cookie",
    `discord_user=${encodeURIComponent(JSON.stringify(user))}; Path=/; HttpOnly`
  );

  res.redirect("/");
}
