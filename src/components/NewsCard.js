import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewsCard.css";

const NewsCard = ({ article, handleFavorite, isFavorite }) => {
  const MAX_DESCRIPTION_LINES = 2;
  const navigate = useNavigate();

  const trimDescription = (text) => {
    const lines = text.split("\n");
    if (lines.length > MAX_DESCRIPTION_LINES) {
      return lines.slice(0, MAX_DESCRIPTION_LINES).join("\n") + "...";
    }
    return text;
  };

  const handleTitleClick = () => {
    navigate(`/news/${encodeURIComponent(article.title)}`, {
      state: { article },
    });
  };

  return (
    <div className="news-card">
      {article.image && (
        <img src={article.image} className="news-card-image" alt="" />
      )}
      <div className="news-card-content">
        <span onClick={handleTitleClick} className="news-card-title">
          {article.title}
        </span>
        <p>{trimDescription(article.body)}</p>
        <button onClick={() => handleFavorite(article)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
