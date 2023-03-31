import Header from "./Header";
import "../styling/gamecards.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GameCards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([
    "Cat card😼",
    "Defuse card🙅‍♂️",
    "Shuffle card🔀",
    "Exploding Kitten card💣",
  ]);

  const [cardData, setCardData] = useState(data);
  const [cardText, setCardText] = useState("");
  const [cardCount, setCardCount] = useState(5);
  const [defuseCardCount, setDefuseCardCount] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [restart, setRestart] = useState(false);
  const [score, setScore] = useState(user.score);

  const handleCards = () => {
    const arrLength = cardData.length;
    const index = Math.floor(Math.random() * arrLength);
    const text = cardData[index];
    const count = defuseCardCount;
    setFlag(true);
    setCardText(text);

    if (cardCount === 1) {
      setCardCount(5);
      setWin(true);
      setFlag(false);
      setScore(score + 1);
    } else if (text.includes("Cat card😼")) {
      setCardCount(cardCount - 1);
      setWin(false);
      setRestart(false);
      setLose(false);
    } else if (text.includes("Defuse card🙅‍♂️")) {
      setDefuseCardCount(defuseCardCount + 1);
      setCardCount(cardCount - 1);
      setWin(false);
      setRestart(false);
      setLose(false);
    } else if (text.includes("Shuffle card🔀")) {
      setCardCount(5);
      setDefuseCardCount(0);
      setRestart(true);
      setWin(false);
      // setRestart(false)
      setLose(false);
      setCardData(data);
      // setFlag(false);
    } else if (text.includes("Exploding Kitten card💣")) {
      if (count === 0) {
        setCardCount(5);
        setLose(true);
        // setFlag(false);
        setDefuseCardCount(0);
        setWin(false);
        setRestart(false);
      } else {
        setDefuseCardCount(defuseCardCount - 1);
      }
    }
  };

  const exitGame = async () => {
    const maxScore = Math.max(score + user.score, score);

    await axios.post("http://localhost:5000/api/updatescore", {
      username: user.username,
      score: score,
    }).then(res => {
      navigate("/dashboard", { state: { username: user.username, score: score } });
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="game-body">
      <Header />
      <div className="score-board">
        <div className="score">
          Name:
          <h4 style={{ color: "white", marginLeft: "8px" }}>{user.username}</h4>
        </div>
        <div className="score">
          Score:<h4 style={{ color: "white", marginLeft: "8px" }}>{score}</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="game-status">
          {win === true ? (
            <div className="winning">You win!🥳</div>
          ) : (
            <div></div>
          )}
          {lose === true ? (
            <div className="loosing">You lose!🥲</div>
          ) : (
            <div></div>
          )}
          {restart === true ? (
            <div className="restart">Game Restart!😶</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="card-deck-box">
          <div className="card-deck" onClick={handleCards}>
            Deck of Cards
          </div>
          {flag === true ? (
            <div className="card-deck">{cardText}</div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="card-count-box">
          <h5>Total Cards: 5</h5>
          <h5>Remaining Card: {cardCount}</h5>
        </div>
      </div>

      <button className="exit-game" onClick={exitGame}>
        Exit game
      </button>
    </div>
  );
}

export default GameCards;
