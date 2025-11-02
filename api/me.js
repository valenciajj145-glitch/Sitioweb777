export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId || discordId !== process.env.ADMIN_DISCORD_ID) {
    return res.json({ logged: false });
  }

  return res.json({
    logged: true,
    username: "Mack",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png"
  });
}
