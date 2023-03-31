import express from "express";
import LeaderboardModel, { Leaderboard } from "../models/leaderboard.js"
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, score } = req.body;

  try {
    const leaderboard: Leaderboard = await LeaderboardModel.create({
      username,
      score,
    });
    res.status(201).json({ leaderboard });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to save score to leaderboard" });
  }
});

router.get("/", async (req, res) => {
  try {
    const leaderboard: Leaderboard[] = await LeaderboardModel.find()
      .sort("-score")
      .limit(10)
      .exec();
    res.json({ leaderboard });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to retrieve leaderboard" });
  }
});

export default router;