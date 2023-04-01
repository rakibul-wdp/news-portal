import React, { useEffect, useState } from "react";
import Header from "./Header";
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
      await axios.get("http://localhost:5000/api/getalluser").then(res => {
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
    <div className="bg-cover w-screen h-screen" style={{ backgroundImage: `url(${Hero})` }}>
      <div className="flex flex-col md:flex-row items-center justify-center py-10">
        <Link to="/game" state={{ user: user }}>
          <button className="btn btn-wide mb-3 md:mb-0 md:mr-1 bg-white text-black">Start Game</button>
        </Link>
        <button className="btn btn-wide md:ml-1 bg-white text-black" onClick={exitGame}>
          Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center text-white px-12 md:px-48">
        <div className="border-2 rounded-xl md:basis-1/2 mb-5 md:mb-0 md:mr-5 h-[75vh] px-24 md:px-0">
          <h1 className="text-center text-5xl font-bold underline mt-3">Leaderboard</h1>
          <div className="">
            {displayData &&
              displayData?.map((val, ind) => {
                return (
                  <div className="flex items-center justify-between md:mx-16 lg:mx-48 mt-10 bg-gray-100 text-black py-3 px-5 text-lg font-medium rounded-xl" key={ind}>
                    <p>{val.username}</p><p>{val.score}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="border-2 rounded-xl md:basis-1/2 md:ml-5 h-[75vh] px-12">
          <h1 className="text-center text-5xl font-bold underline mt-3 mb-7">Rules</h1>
          <div className="text-3xl font-bold">
            This will be an online single-player card game that consists of 4
            different types of cards.
          </div>
          <ul className="list-disc list-inside my-2 text-lg">
            <li>Cat card 😼</li>
            <li>Defuse card 🙅‍♂️</li>
            <li>Shuffle card 🔀</li>
            <li>Exploding kitten card 💣</li>
          </ul>
          <div className="text-3xl font-bold mb-2">The rules are as follows:</div>
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
