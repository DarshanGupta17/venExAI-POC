const express = require("express");
const router = express.Router();
const { getContacts } = require("../controllers/crmController");

router.get("/contacts", getContacts);

module.exports = router;
