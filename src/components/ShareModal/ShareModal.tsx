import React, { useState } from 'react';
import { FiCopy, FiCheck, FiShare2 } from 'react-icons/fi';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { copyToClipboard } from '../../utils/clipboard';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  flashcardId: string;
  flashcardTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, flashcardId, flashcardTitle }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/flashcard/${flashcardId}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Flashcard">
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiShare2 className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Share "{flashcardTitle}"</h3>
          <p className="text-gray-600 text-sm">Copy the link below to share this flashcard with others</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Shareable Link</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="whitespace-nowrap"
            >
              {copied ? (
                <>
                  <FiCheck size={16} className="mr-1 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy size={16} className="mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;