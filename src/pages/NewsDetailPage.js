import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsDetail.css';

const NewsDetail = () => {
  const location = useLocation();
  const { article } = location.state || {};

  if (!article) {
    return <div className="news-detail-container">No article found.</div>;
  }

  return (
    <div className="news-detail-container">
      <h1 className="news-detail-title">{article.title}</h1>
      {article.image && (
        <img src={article.image} alt={article.title} className="news-detail-image" />
      )}
      <p className="news-detail-body">{article.body}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-detail-link">Read more</a>
    </div>
  );
};

export default NewsDetail;
