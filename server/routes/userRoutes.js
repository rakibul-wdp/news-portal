const express = require("express");
const { FindOrCreateUser, GetAllUser, UpdateScore } = require("../controllers/user");

const router = express.Router();

router.post("/findorcreateuser", FindOrCreateUser);
router.get("/getalluser", GetAllUser)
router.post("/updatescore", UpdateScore)

module.exports = router;