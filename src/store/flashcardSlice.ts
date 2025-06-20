import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard, FlashcardState } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const initialState: FlashcardState = {
  flashcards: loadFromStorage('flashcards') || [],
  currentFlashcard: null,
};

const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState,
  reducers: {
    addFlashcard: (state, action: PayloadAction<Flashcard>) => {
      state.flashcards.push(action.payload);
      saveToStorage('flashcards', state.flashcards);
    },
    deleteFlashcard: (state, action: PayloadAction<string>) => {
      state.flashcards = state.flashcards.filter(card => card.id !== action.payload);
      saveToStorage('flashcards', state.flashcards);
    },
    setCurrentFlashcard: (state, action: PayloadAction<string>) => {
      state.currentFlashcard = state.flashcards.find(card => card.id === action.payload) || null;
    },
    clearCurrentFlashcard: (state) => {
      state.currentFlashcard = null;
    },
  },
});

export const { addFlashcard, deleteFlashcard, setCurrentFlashcard, clearCurrentFlashcard } = flashcardSlice.actions;
export default flashcardSlice.reducer;