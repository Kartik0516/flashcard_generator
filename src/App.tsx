import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import MyFlashcards from './pages/MyFlashcards';
import CreateFlashcard from './pages/CreateFlashcard';
import FlashcardDetails from './pages/FlashcardDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MyFlashcards />} />
            <Route path="/create" element={<CreateFlashcard />} />
            <Route path="/flashcard/:id" element={<FlashcardDetails />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;