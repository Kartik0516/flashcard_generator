export interface Term {
  id: string;
  title: string;
  definition: string;
  image?: string;
}

export interface Flashcard {
  id: string;
  title: string;
  description: string;
  image?: string;
  terms: Term[];
  createdAt: string;
}

export interface FlashcardState {
  flashcards: Flashcard[];
  currentFlashcard: Flashcard | null;
}