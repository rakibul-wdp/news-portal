import mongoose, { Document } from "mongoose";

export interface IGame extends Document {
  username: string;
  deck: string[];
  defuseCards: number;
  cardsDrawn: number;
  gameWon: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gameSchema = new mongoose.Schema<IGame>(
  {
    username: { type: String, required: true },
    deck: { type: [String], required: true },
    defuseCards: { type: Number, required: true, default: 0 },
    cardsDrawn: { type: Number, required: true, default: 0 },
    gameWon: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const GameModel = mongoose.model<IGame>("Game", gameSchema);

export default GameModel;