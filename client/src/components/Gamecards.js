import Header from "./Header";
import "../styling/gamecards.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Gamecards = () => {
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
  const [carddata, cardSetdata] = useState(data);
  const [cardtext, cardSettext] = useState("");
  const [cardcount, setCardcount] = useState(5);
  const [defusecardcount, setDefusecardcount] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setlose] = useState(false);
  const [restart, setRestart] = useState(false);
  const [score, setscore] = useState(user.score);

  const handleCards = () => {
    const arrlength = carddata.length;
    const index = Math.floor(Math.random() * arrlength);
    const text = carddata[index];
    const count = defusecardcount;
    setFlag(true);
    cardSettext(text);

    if (cardcount === 1) {
      setCardcount(5);
      setWin(true);
      setFlag(false);
      setscore(score + 1);
    } else if (text.includes("Cat card😼")) {
      setCardcount(cardcount - 1);
      setWin(false);
      setRestart(false);
      setlose(false);

    } else if (text.includes("Defuse card🙅‍♂️")) {
      setDefusecardcount(defusecardcount + 1);
      setCardcount(cardcount - 1);
      setWin(false);
      setRestart(false);
      setlose(false);
    } else if (text.includes("Shuffle card🔀")) {
      setCardcount(5);
      setDefusecardcount(0);
      setRestart(true);
      setWin(false);
      // setRestart(false)
      setlose(false);
      cardSetdata(data);
      // setFlag(false);
    } else if (text.includes("Exploding Kitten card💣")) {
      if (count === 0) {
        setCardcount(5);
        setlose(true);
        // setFlag(false);
        setDefusecardcount(0);
        setWin(false);
        setRestart(false);
      } else {
        setDefusecardcount(defusecardcount - 1);
      }
    }
  };

  const exitGame = async () => {
    const maxscore = Math.max(score + user.score, score);
    console.log("Maxscore", maxscore);
    console.log("Maxscore", score);
    console.log("Maxscore", user.score);

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
            <div className="card-deck">{cardtext}</div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="card-count-box">
          <h5>Total Cards: 5</h5>
          <h5>Remaining Card: {cardcount}</h5>
        </div>
      </div>

      <button className="exit-game" onClick={exitGame}>
        Exit game
      </button>
    </div>
  );
}

export default Gamecards;
