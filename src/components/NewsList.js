import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  fetchEventRegistryArticles,
  removeFavorite,
  setCategory,
  setPage,
  setQuery,
  toggleFavoriteView,
} from "../redux/newsSlice";
import NewsCard from "./NewsCard";
import "./NewsList.css";

const NewsList = () => {
  const dispatch = useDispatch();
  const {
    articles,
    favorites,
    isFav,
    status,
    error,
    currentPage,
    currentQuery,
    currentCategory,
  } = useSelector((state) => state.news);
  const [query, setquery] = useState(currentQuery);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(
      fetchEventRegistryArticles({
        query: currentQuery,
        page: currentPage,
        category: currentCategory,
      })
    );
  }, [dispatch, currentPage, currentCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setQuery(query));
    dispatch(
      fetchEventRegistryArticles({ query, page: 1, category: currentCategory })
    );
  };

  const handleFavorite = (article) => {
    if (favorites.find((fav) => fav.uri === article.uri)) {
      dispatch(removeFavorite(article.uri));
    } else {
      dispatch(addFavorite(article));
    }
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(
      fetchEventRegistryArticles({
        query: currentQuery,
        page,
        category: currentCategory,
      })
    );
  };

  const handleCategorySelect = (category) => {
    dispatch(setCategory(category));
    setShowDropdown(false);
    dispatch(
      fetchEventRegistryArticles({ query: currentQuery, page: 1, category })
    );
  };

  if (status === "loading") {
    return (
      <div class="loadPage">
        <div>Loading Your News</div>
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-list-container">
      <h1 className="headTag">{isFav ? "FAVORITE NEWS" : "NEWS"}</h1>
      <div className="toolbar">
        <button
          className="favToggler"
          onClick={() => dispatch(toggleFavoriteView())}
        >
          {isFav ? "Show All Articles" : "Show Favorites"}
        </button>
        <button
          className="categoryDropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Select Category
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={() => handleCategorySelect("all")}>All</button>
            <button onClick={() => handleCategorySelect("business")}>
              Business
            </button>
            <button onClick={() => handleCategorySelect("technology")}>
              Technology
            </button>
            <button onClick={() => handleCategorySelect("entertainment")}>
              Entertainment
            </button>
            <button onClick={() => handleCategorySelect("politics")}>
              Politics
            </button>
            <button onClick={() => handleCategorySelect("crime")}>Crime</button>
          </div>
        )}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            placeholder="Search for news..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="news-list">
        {(isFav ? favorites : articles).map((article) => (
          <NewsCard
            key={article.uri}
            article={article}
            handleFavorite={handleFavorite}
            isFavorite={favorites.some((fav) => fav.uri === article.uri)}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default NewsList;
