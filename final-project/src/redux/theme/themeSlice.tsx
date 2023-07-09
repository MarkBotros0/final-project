import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  themeMode: string;
}

const initialState: ThemeState = {
  themeMode: "light",
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light"
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
