export default function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error("Falta CLIENT_ID o REDIRECT_URI");
    return res.status(500).send("Server misconfigured");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify",
  });

  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
}
