import axios from "axios";

export async function getAccessToken(code) {
  const response = await axios.post("https://accounts.zoho.in/oauth/v2/token", null, {
    params: {
      grant_type: "authorization_code",
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      redirect_uri: process.env.ZOHO_REDIRECT_URI,
      code,
    },
  });
  return response.data;
}

export async function refreshAccessToken() {
  const refreshToken = "YOUR_SAVED_REFRESH_TOKEN"; // fetch from DB
  const response = await axios.post("https://accounts.zoho.in/oauth/v2/token", null, {
    params: {
      grant_type: "refresh_token",
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      refresh_token: refreshToken,
    },
  });
  return response.data.access_token;
}
