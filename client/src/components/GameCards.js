import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../assets/images/table.jpg";
import CardBehind from "../assets/images/card_behind.png";
import CatCard from "../assets/images/special_four.png";
import DefuseCard from "../assets/images/defuse.png";
import ShuffleCard from "../assets/images/shuffle.png";
import ExplodingCard from "../assets/images/explode.png";
import { toast } from "react-toastify";

const GameCards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([
    CatCard,
    DefuseCard,
    ShuffleCard,
    ExplodingCard,
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
    } else if (text.includes(CatCard)) {
      setCardCount(cardCount - 1);
      setWin(false);
      setRestart(false);
      setLose(false);
    } else if (text.includes(DefuseCard)) {
      setDefuseCardCount(defuseCardCount + 1);
      setCardCount(cardCount - 1);
      setWin(false);
      setRestart(false);
      setLose(false);
    } else if (text.includes(ShuffleCard)) {
      setCardCount(5);
      setDefuseCardCount(0);
      setRestart(true);
      setWin(false);
      // setRestart(false)
      setLose(false);
      setCardData(data);
      // setFlag(false);
    } else if (text.includes(ExplodingCard)) {
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

  const winGame = () => toast.success("You win!🥳", { position: "top-left", autoClose: 1000 });
  const loseGame = () => toast.error("You lose!🥲", { position: "top-left", autoClose: 1000 });
  const gameRestart = () => toast.info("Game Restart!😶", { position: "top-left", autoClose: 1000 });

  return (
    <div className="bg-cover w-screen h-screen" style={{ backgroundImage: `url(${Table})` }}>
      <div className="flex flex-col md:flex-row items-center justify-center p-3">
        <h1 className="bg-white btn btn-wide text-3xl text-black">Name: &nbsp;<span className="text-lime-500">{user.username}</span></h1>
        <h1 className="bg-white btn btn-wide text-3xl text-black">Score: &nbsp;<span className="text-lime-500">{score}</span></h1>
      </div>
      <div className="relative">
        <div className="absolute -bottom-[40vh] left-[10vw]">
          {win === true ? (
            <div>{winGame()}</div>
          ) : (
            <div></div>
          )}
          {lose === true ? (
            <div>{loseGame()}</div>
          ) : (
            <div></div>
          )}
          {restart === true ? (
            <div>{gameRestart()}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="absolute -bottom-[85vh] right-[40vw] md:right-[48vw]">
          {flag === true ? (
            <div className="mb-10 md:mb-16">
              <img className="w-60 h-72 rounded" src={cardText} alt="card" />
            </div>
          ) : (
            <div></div>
          )}
          <div className="cursor-pointer" onClick={handleCards}>
            <div className="avatar">
              <div className="w-60 h-72 rounded">
                <img src={CardBehind} alt="card behind" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col absolute -bottom-[70vh] right-[1rem] md:right-[5rem] lg:right-[10rem]">
          <h3 className="btn md:btn-wide bg-white text-black text-sm md:text-lg flex items-center justify-center md:justify-around mb-1"><span>Total Cards:</span><span className="text-lime-500">5</span></h3>
          <h3 className="btn md:btn-wide bg-white text-black text-sm md:text-lg mb-1">Remaining Card: &nbsp;<span className="text-lime-500">{cardCount}</span></h3>
          <button className="btn md:btn-wide bg-white text-black text-sm md:text-lg" onClick={exitGame}>
            Exit game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCards;
