const redirectUri = process.env.DISCORD_REDIRECT_URI;

const params = new URLSearchParams({
  client_id: process.env.DISCORD_CLIENT_ID,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "identify",
});

res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
