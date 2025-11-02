export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId) {
    return res.json({ logged: false });
  }

  // Opcional: si quieres mostrar avatar y username
  try {
    const userRes = await fetch(`https://discord.com/api/users/${discordId}`, {
      headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` } // si tienes un bot, o usa info que guardaste
    });
    // si no tienes bot, solo retorna logged y nombre genérico
    res.json({ logged: true, username: "Tú" }); 
  } catch {
    res.json({ logged: true, username: "Tú" });
  }
}
