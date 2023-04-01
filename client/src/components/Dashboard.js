import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hero from "../assets/images/hero.png";

const Dashboard = () => {
  let location = useLocation();
  const user = location.state;
  const [allData, setAllData] = useState([]);
  const [displayData, setDisplayData] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    const handleFetch = async () => {
      await axios.get("https://card-game-server.onrender.com/api/getalluser").then(res => {
        setAllData(res.data);
        setDisplayData(
          res.data.data?.slice(0, 8).sort((a, b) => {
            return b.score - a.score;
          })
        )
      }).catch(error => {
        console.log(error);
      })
    };

    handleFetch();
  }, []);

  const exitGame = () => {
    navigate("/");
  };

  return (
    <div className="bg-cover w-screen h-full lg:h-screen" style={{ backgroundImage: `url(${Hero})` }}>
      <div className="flex flex-col md:flex-row items-center justify-center py-10">
        <Link to="/game" state={{ user: user }}>
          <button className="btn btn-wide mb-3 md:mb-0 md:mr-1 bg-white text-black">Start Game</button>
        </Link>
        <button className="btn btn-wide md:ml-1 bg-white text-black" onClick={exitGame}>
          Back
        </button>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center text-white px-12 xl:px-24 2xl:px-48">
        <div className="border-2 rounded-xl lg:basis-1/2 mb-5 lg:mb-0 lg:mr-5 h-[40rem] px-24 lg:px-0 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <h1 className="text-center text-5xl font-bold underline mt-3">Leaderboard</h1>
          <div className="">
            {displayData &&
              displayData?.map((val, ind) => {
                return (
                  <div className="flex items-center justify-between lg:mx-16 xl:mx-28 2xl:mx-48 mt-10 bg-gray-100 text-black py-3 px-5 text-lg font-medium rounded-xl" key={ind}>
                    <p>{val.username}</p><p>{val.score}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="border-2 rounded-xl lg:basis-1/2 lg:ml-5 h-[40rem] px-5 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <h1 className="text-center text-5xl font-bold underline mt-3 mb-7">Rules</h1>
          <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
            This will be an online single-player card game that consists of 4
            different types of cards.
          </div>
          <ul className="list-disc list-inside my-2 text-lg">
            <li>Cat card 😼</li>
            <li>Defuse card 🙅‍♂️</li>
            <li>Shuffle card 🔀</li>
            <li>Exploding kitten card 💣</li>
          </ul>
          <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">The rules are as follows:</div>
          <ul className="list-disc list-inside text-lg">
            <li>
              If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </li>
            <li>
              If the card is exploding kitten (bomb) then the player loses the
              game.
            </li>
            <li>
              If the card is a defusing card, then the card is removed from
              the deck. This card can be used to defuse one bomb that may come
              in subsequent cards drawn from the deck.
            </li>
            <li>
              If the card is a shuffle card, then the game is restarted and
              the deck is filled with 5 cards again.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
