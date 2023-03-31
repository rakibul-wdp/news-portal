import './App.css';

function App() {

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
