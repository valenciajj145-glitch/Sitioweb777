export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code");

  try {
    // Intercambiar código por token
    const data = new URLSearchParams({
  client_id: process.env.DISCORD_CLIENT_ID,
  client_secret: process.env.DISCORD_CLIENT_SECRET,
  grant_type: "authorization_code",
  code,
  redirect_uri: process.env.DISCORD_REDIRECT_URI
});


    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error("Token error:", text);
      return res.status(500).send("Error obteniendo token");
    }

    const tokenJson = await tokenRes.json();

    // Obtener info del usuario
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });

    if (!userRes.ok) {
      const text = await userRes.text();
      console.error("User info error:", text);
      return res.status(500).send("Error obteniendo usuario");
    }

    const user = await userRes.json();

    // Solo tu ID puede modificar
    if (user.id !== process.env.MY_DISCORD_ID) {
      return res.status(403).send("No autorizado");
    }

    // Guardar cookie sin dependencias
    res.setHeader(
      "Set-Cookie",
      `discord_id=${user.id}; HttpOnly; Path=/; Max-Age=${60*60*24*7}`
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en callback");
  }
}
