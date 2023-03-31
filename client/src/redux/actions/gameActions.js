import axios from "axios";
import { io } from "socket.io-client";

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

// export const endGame = (game) => {
//   return {
//     type: "END_GAME",
//     payload: {
//       game,
//     },
//   };
// };


export const endGame = (game) => async (dispatch) => {
  try {
    // Save the game progress to the backend
    await axios.post("http://localhost:4000/game/save", { game });

    // Emit a socket event to update the leaderboard
    const socket = io("http://localhost:4000");
    socket.emit("endGame", { username: game.username });

    // Save the score to the leaderboard
    await axios.post("http://localhost:4000/leaderboard", {
      username: game.username,
      score: game.score,
    });

    dispatch({ type: "END_GAME", payload: { game } });
  } catch (error) {
    console.log(error);
  }

  return {
    type: "END_GAME",
    payload: {
      game,
    },
  };
};

export const fetchLeaderboard = () => async (dispatch) => {
  try {
    // Fetch the initial leaderboard
    const response = await axios.get("http://localhost:4000/leaderboard");
    const leaderboard = response.data.leaderboard;
    dispatch({ type: "FETCH_LEADERBOARD_SUCCESS", payload: { leaderboard } });

    // Set up a socket connection to receive leaderboard updates
    const socket = io("http://localhost:4000");
    socket.on("leaderboard", (leaderboard) => {
      dispatch({ type: "FETCH_LEADERBOARD_SUCCESS", payload: { leaderboard } });
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_LEADERBOARD_FAILURE" });
  }
};