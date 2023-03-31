import express from "express";
import GameModel from "../models/game.js";
const router = express.Router();

router.post("/save", async (req, res) => {
  const { game } = req.body;

  try {
    await GameModel.findOneAndUpdate(
      { username: game.username },
      { game },
      { upsert: true }
    );
    res.status(200).json({ message: "Game progress saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to save game progress" });
  }
});

export default router;