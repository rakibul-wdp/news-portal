import express from "express";
import { FindOrCreateUser, GetAllUser, UpdateScore } from "../controllers/user.js";

const router = express.Router();

router.post("/findorcreateuser", FindOrCreateUser);
router.get("/getalluser", GetAllUser)
router.post("/updatescore", UpdateScore)

module.exports = router;