import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiBookOpen } from 'react-icons/fi';
import { RootState } from '../store';
import { deleteFlashcard } from '../store/flashcardSlice';
import FlashcardCard from '../components/FlashcardCard/FlashcardCard';
import Button from '../components/UI/Button';

const MyFlashcards: React.FC = () => {
  const flashcards = useSelector((state: RootState) => state.flashcard.flashcards);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeleteFlashcard = (id: string) => {
    dispatch(deleteFlashcard(id));
  };

  useEffect(() => {
    if (location.state?.message) {
      // Show success message (you could implement a toast notification here)
      console.log(location.state.message);
    }
  }, [location.state]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Flashcards</h1>
          <p className="text-gray-600">
            {flashcards.length === 0 
              ? 'No flashcards created yet. Create your first flashcard to get started!' 
              : `You have ${flashcards.length} flashcard${flashcards.length > 1 ? 's' : ''}`
            }
          </p>
        </div>
        <Link to="/create">
          <Button className="flex items-center space-x-2">
            <FiPlus size={18} />
            <span>Create Flashcard</span>
          </Button>
        </Link>
      </div>

      {flashcards.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBookOpen className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No flashcards yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first flashcard. Add terms, definitions, and images to make learning engaging and effective.
          </p>
          <Link to="/create">
            <Button size="lg" className="px-8">
              Create Your First Flashcard
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard) => (
            <FlashcardCard
              key={flashcard.id}
              flashcard={flashcard}
              onDelete={handleDeleteFlashcard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFlashcards;