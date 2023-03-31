import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
    username: { type: String, required: true },
    deck: { type: [String], required: true },
    defuseCards: { type: Number, required: true, default: 0 },
    cardsDrawn: { type: Number, required: true, default: 0 },
    gameWon: { type: Boolean, required: true, default: false },
}, { timestamps: true });
const GameModel = mongoose.model("Game", gameSchema);
export default GameModel;
//# sourceMappingURL=game.js.map