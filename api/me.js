export default async function handler(req, res) {
  // Verifica si existe la cookie con los datos del login
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/discord_id=([^;]+)/);

  if (!match) {
    return res.json({ logged: false });
  }

  // En un caso real, deberías guardar el username/avatar en la sesión.
  // Para este ejemplo, devolvemos datos simulados:
  const discordId = match[1];

  // Solo tú (ADMIN_DISCORD_ID) tienes acceso de edición
  const isAdmin = discordId === process.env.MY_DISCORD_ID;

  return res.json({
    logged: true,
    isAdmin,
    username: "Mack",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png", // avatar por defecto
  });
}
