import { createSlice } from '@reduxjs/toolkit';
import { set } from 'firebase/database';

const gptSlice = createSlice({
  name: 'gpt',
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null
  },
  reducers: {
    toggleShowGptSearch: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    }
  }
})

export const { toggleShowGptSearch, setGptMovies } = gptSlice.actions;
export default gptSlice.reducer;
