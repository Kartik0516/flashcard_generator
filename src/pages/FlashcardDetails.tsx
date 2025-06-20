import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RootState } from '../store';
import { setCurrentFlashcard } from '../store/flashcardSlice';
import Button from '../components/UI/Button';
import ShareModal from '../components/ShareModal/ShareModal';

const FlashcardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const flashcard = useSelector((state: RootState) => 
    state.flashcard.flashcards.find(card => card.id === id)
  );
  
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentFlashcard(id));
    }
  }, [id, dispatch]);

  if (!flashcard) {
    return <Navigate to="/\" replace />;
  }

  const currentTerm = flashcard.terms[currentTermIndex];

  const nextTerm = () => {
    setCurrentTermIndex((prev) => (prev + 1) % flashcard.terms.length);
  };

  const prevTerm = () => {
    setCurrentTermIndex((prev) => (prev - 1 + flashcard.terms.length) % flashcard.terms.length);
  };

  const selectTerm = (index: number) => {
    setCurrentTermIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to My Flashcards</span>
        </Link>
        <Button
          onClick={() => setShowShareModal(true)}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <FiShare2 size={18} />
          <span>Share</span>
        </Button>
      </div>

      {/* Flashcard Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          {flashcard.image && (
            <div className="w-full md:w-48 h-32 md:h-24 mb-4 md:mb-0">
              <img
                src={flashcard.image}
                alt={flashcard.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{flashcard.title}</h1>
            <p className="text-gray-600 mb-4">{flashcard.description}</p>
            <div className="text-sm text-gray-500">
              {flashcard.terms.length} terms • Created {new Date(flashcard.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Terms List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {flashcard.terms.map((term, index) => (
                <button
                  key={term.id}
                  onClick={() => selectTerm(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    index === currentTermIndex
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm truncate">{term.title}</div>
                  <div className="text-xs text-gray-500 mt-1 truncate">
                    {term.definition.substring(0, 50)}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Term Details */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 min-h-96">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-500">
                  Term {currentTermIndex + 1} of {flashcard.terms.length}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevTerm}
                    disabled={flashcard.terms.length <= 1}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextTerm}
                    disabled={flashcard.terms.length <= 1}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentTerm.title}</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{currentTerm.definition}</p>
                  </div>
                </div>

                {currentTerm.image && (
                  <div className="mt-6">
                    <img
                      src={currentTerm.image}
                      alt={currentTerm.title}
                      className="max-w-full h-64 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="px-8 pb-6">
              <div className="flex justify-center space-x-2">
                {flashcard.terms.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectTerm(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTermIndex
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        flashcardId={flashcard.id}
        flashcardTitle={flashcard.title}
      />
    </div>
  );
};

export default FlashcardDetails;