import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEye, FiCalendar, FiHash } from 'react-icons/fi';
import { Flashcard } from '../../types';

interface FlashcardCardProps {
  flashcard: Flashcard;
  onDelete: (id: string) => void;
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({ flashcard, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      onDelete(flashcard.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {flashcard.image && (
        <div className="h-48 w-full">
          <img
            src={flashcard.image}
            alt={flashcard.title}
            className="w-full h-full object-cover rounded-t-xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {flashcard.title}
          </h3>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{flashcard.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <FiHash size={14} />
              <span>{flashcard.terms.length} terms</span>
            </span>
            <span className="flex items-center space-x-1">
              <FiCalendar size={14} />
              <span>{new Date(flashcard.createdAt).toLocaleDateString()}</span>
            </span>
          </div>
        </div>
        
        <Link
          to={`/flashcard/${flashcard.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <FiEye size={18} />
          <span>View Cards</span>
        </Link>
      </div>
    </div>
  );
};

export default FlashcardCard;