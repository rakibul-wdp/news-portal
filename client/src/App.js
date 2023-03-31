import './App.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, drawCard, endGame } from "./redux/actions/gameActions";

function App() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);

  const handleStartGame = () => {
    dispatch(startGame(username));
  };

  const handleDrawCard = () => {
    dispatch(drawCard(game));
  };

  const handleEndGame = () => {
    dispatch(endGame(game));
  };

  return (
    <div>
      {game.isStarted ? (
        <>
          <h2>{`Player: ${game.username} Score: ${game.score}`}</h2>
          <div>
            {game.deck.map((card, index) => (
              <div key={index}>{card}</div>
            ))}
          </div>
          <button onClick={handleDrawCard}>Draw Card</button>
          <button onClick={handleEndGame}>End Game</button>
        </>
      ) : (
        <>
          <h2>Enter your username to start the game:</h2>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleStartGame}>Start Game</button>
        </>
      )}
    </div>
  );
}

export default App;
