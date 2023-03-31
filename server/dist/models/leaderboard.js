import mongoose from "mongoose";
const leaderboardSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
});
const LeaderboardModel = mongoose.model("Leaderboard", leaderboardSchema);
export default LeaderboardModel;
//# sourceMappingURL=leaderboard.js.map