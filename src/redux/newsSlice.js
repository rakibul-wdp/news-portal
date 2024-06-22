import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_API_URL;

export const fetchEventRegistryArticles = createAsyncThunk(
  "news/fetchEventRegistryArticles",
  async ({ query, page, category }) => {
    try {
      const response = await fetch(`${baseUrl}/getArticles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getArticles",
          keyword: [category, query],
          articlesPage: page,
          articlesCount: 20,
          articlesSortBy: "date",
          articlesSortByAsc: false,
          articlesArticleBodyLen: -1,
          resultType: "articles",
          dataType: ["news"],
          apiKey: apiKey,
          lang: ["eng"],
          forceMaxDataTimeWindow: 31,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      return { articles: data.articles.results, page };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    favorites: [],
    isFav: false,
    status: "idle",
    error: null,
    currentPage: 1,
    currentQuery: "tesla",
    currentCategory: "all",
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.uri !== action.payload
      );
    },
    toggleFavoriteView: (state) => {
      state.isFav = !state.isFav;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventRegistryArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventRegistryArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
      })
      .addCase(fetchEventRegistryArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavoriteView,
  setPage,
  setQuery,
  setCategory,
} = newsSlice.actions;

export default newsSlice.reducer;
