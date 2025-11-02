let count = 0;

export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId || discordId !== process.env.ADMIN_DISCORD_ID) {
    return res.status(403).send("No autorizado");
  }

  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    try {
      const { capitulos } = JSON.parse(body);
      if (typeof capitulos === "number") count = capitulos;
      res.json({ capitulos: count });
    } catch {
      res.status(400).send("Error guardando contador");
    }
  });
}
