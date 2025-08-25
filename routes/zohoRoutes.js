import express from "express";
import { getAccessToken, refreshAccessToken } from "../services/zohoAuth.js";
import db from "../config/db.js";

const router = express.Router();

// Redirect user to Zoho login
router.get("/auth", (req, res) => {
    const url = `https://accounts.zoho.in/oauth/v2/auth?scope=ZohoCRM.modules.ALL,Desk.tickets.ALL&client_id=${process.env.ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${process.env.ZOHO_REDIRECT_URI}`;
    res.redirect(url);
  });
  

// Handle callback
router.get("/callback", async (req, res) => {
    try {
      const { code } = req.query;
  
      if (!code) {
        return res.status(400).json({ error: "No code returned from Zoho" });
      }
  
      const tokens = await getAccessToken(code);
  
      if (!tokens.access_token) {
        return res.status(400).json({ error: "Failed to get access token", details: tokens });
      }
  
      await db.query(
        "UPDATE zoho_tokens SET access_token = $1, refresh_token = $2 WHERE id = 1",
        [tokens.access_token, tokens.refresh_token || null]
      );
  
      res.send(`
    <html>
      <body>
        <script>
          window.opener.postMessage({ status: "connected" }, "*");
          window.close();
        </script>
        <p>You can close this window.</p>
      </body>
    </html>
  `);
    } catch (err) {
      console.error("Zoho Auth Error:", err.response?.data || err.message);
      res.status(500).json({
        error: err.message,
        details: err.response?.data || "No extra details",
      });
    }
  });
  
  
// Step 3: Test refresh
router.get("/refresh", async (req, res) => {
    try {
      // Call refreshAccessToken which handles fetching the token from DB and updating access_token
      const accessToken = await refreshAccessToken();
  
      res.json({
        success: true,
        access_token: accessToken,
      });
    } catch (err) {
      console.error("Zoho Refresh Error:", err.message, err.stack);
      res.status(500).json({
        success: false,
        error: err.message,
        details: err.response?.data || "No additional details",
      });
    }
  });
  

export default router;
