app.get("/auth", (req, res) => {
    const url = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL,Desk.tickets.ALL&client_id=${process.env.ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${process.env.ZOHO_REDIRECT_URI}`;
    res.redirect(url);
  });

  app.get("/auth/callback", async (req, res) => {
    const { code } = req.query;
    try {
      const response = await axios.post(
        "https://accounts.zoho.com/oauth/v2/token",
        null,
        {
          params: {
            code,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            redirect_uri: process.env.ZOHO_REDIRECT_URI,
            grant_type: "authorization_code",
          },
        }
      );
      res.json(response.data); // save access + refresh token in DB
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  