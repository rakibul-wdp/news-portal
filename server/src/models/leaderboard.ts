import mongoose from "mongoose";

export interface Leaderboard {
  username: string;
  score: number;
}

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

const LeaderboardModel = mongoose.model<Leaderboard>("Leaderboard", leaderboardSchema);

export default LeaderboardModel;