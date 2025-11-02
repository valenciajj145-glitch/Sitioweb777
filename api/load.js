let count = 0; // memoria temporal, se reinicia al redeploy

export default function handler(req, res) {
  res.json({ capitulos: count });
}
