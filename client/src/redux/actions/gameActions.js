export const startGame = (username) => {
  return {
    type: "START_GAME",
    payload: {
      username,
    },
  };
};

export const drawCard = (game) => {
  return {
    type: "DRAW_CARD",
    payload: {
      game,
    },
  };
};

export const endGame = (game) => {
  return {
    type: "END_GAME",
    payload: {
      game,
    },
  };
};