import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice'
import modalReducer from './modal/modalSlice'
import boardsReducer from './boards/boardsSlice'
import listsReducer from './lists/listsSlice'
import cardsReducer from './cards/cardsSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal : modalReducer,
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store