let count = 0; // se reinicia si redeployas

export default function handler(req, res) {
  res.json({ capitulos: count });
}
