let count = 0;

export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId || discordId !== process.env.ADMIN_DISCORD_ID) {
    return res.status(403).send("No autorizado");
  }

  try {
    const body = await new Promise(resolve => {
      let data = "";
      req.on("data", chunk => data += chunk);
      req.on("end", () => resolve(JSON.parse(data)));
    });

    if (typeof body.capitulos === "number") {
      count = body.capitulos;
    }

    res.json({ capitulos: count });
  } catch {
    res.status(400).send("Error en save");
  }
}
