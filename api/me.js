export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId) {
    return res.json({ logged: false });
  }

  try {
    // Obtenemos información del usuario usando token de OAuth si quieres avatar real
    // Para backend temporal, si no tienes token de bot, podemos construir avatar URL genérico
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/placeholder.png`;
    res.json({ logged: true, username: "Tú", avatar: avatarUrl });
  } catch {
    res.json({ logged: true, username: "Tú" });
  }
}

