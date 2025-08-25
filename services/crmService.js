const axios = require("axios");

exports.fetchContacts = async () => {
  const response = await axios.get("https://www.zohoapis.in/crm/v2/Contacts", {
    headers: {
      Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`
    }
  });
  return response.data.data;
};
