const initialState = {
  isStarted: false,
  username: "",
  score: 0,
  deck: ["cat", "cat", "cat", "defuse", "shuffle", "explosion"],
  defuse: 1,
  exploded: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        isStarted: true,
        username: action.payload.username,
      };
    case "DRAW_CARD":
      const { game } = action.payload;
      const cardIndex = Math.floor(Math.random() * game.deck.length);
      const card = game.deck[cardIndex];
      const newDeck = game.deck.filter((_, index) => index !== cardIndex);
      let defuse = game.defuse;
      let exploded = game.exploded;
      let score = game.score;

      if (card === "cat") {
        // Remove the cat card from the deck
        score += 1;
      } else if (card === "explosion") {
        // The player loses if they draw an exploding kitten and don't have a defuse card
        if (defuse === 0) {
          exploded = true;
        } else {
          // Remove a defuse card from the player's hand
          defuse -= 1;
        }
      } else if (card === "defuse") {
        // Remove a defuse card from the player's hand
        defuse -= 1;
      } else if (card === "shuffle") {
        // Restart the game with a new deck
        return {
          ...initialState,
          username: game.username,
          score,
        };
      }

      // Check if the game is over
      const isGameOver = newDeck.length === 0 || exploded;

      return {
        ...state,
        deck: newDeck,
        defuse,
        exploded,
        score,
        isGameOver,
      };
    case "END_GAME":
      const { score: finalScore } = action.payload.game;
      // TODO: save the score to the leaderboard in the backend
      return {
        ...initialState,
        score: finalScore,
      };
    default:
      return state;
  }
};

export default gameReducer;