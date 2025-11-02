// Contador temporal en memoria
let count = 0;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método no permitido");
  }

  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/discord_id=([^;]+)/);
  const discordId = match?.[1];

  if (!discordId || discordId !== process.env.MY_DISCORD_ID) {
    return res.status(403).send("No autorizado");
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => data += chunk);
      req.on("end", () => resolve(JSON.parse(data)));
      req.on("error", reject);
    });

    if (typeof body.capitulos === "number") {
      count = body.capitulos;
      res.status(200).json({ capitulos: count });
    } else {
      res.status(400).send("Datos inválidos");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar");
  }
}
