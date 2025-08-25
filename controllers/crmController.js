const crmService = require("../services/crmService");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await crmService.fetchContacts();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
