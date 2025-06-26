import React, { useRef, useEffect } from 'react';
import { Field, FieldArray, FormikProps } from 'formik';
import { FiTrash2, FiEdit3, FiPlus } from 'react-icons/fi';
import Button from '../UI/Button';

interface Term {
  title: string;
  definition: string;
  image: string;
}

interface FormValues {
  title: string;
  description: string;
  image: string;
  terms: Term[];
}

interface TermFormProps {
  formik: FormikProps<FormValues>;
}

const TermForm: React.FC<TermFormProps> = ({ formik }) => {
  const termRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const focusOnTerm = (index: number) => {
    const input = termRefs.current[index];
    if (input) {
      input.focus();
    }
  };

  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    console.log(`Term ${index + 1} image failed to load:`, formik.values.terms[index].image);
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add Terms</h2>
        <span className="text-sm text-gray-500">{formik.values.terms.length} terms added</span>
      </div>

      <FieldArray name="terms">
        {({ push, remove }) => (
          <div className="space-y-4">
            {formik.values.terms.map((term, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Term {index + 1}</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => focusOnTerm(index)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FiEdit3 size={16} />
                    </button>
                    {formik.values.terms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Term*
                    </label>
                    <Field
                      name={`terms.${index}.title`}
                      type="text"
                      innerRef={(el: HTMLInputElement) => termRefs.current[index] = el}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter term"
                    />
                    {formik.errors.terms?.[index]?.title && formik.touched.terms?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.terms[index].title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Definition*
                    </label>
                    <Field
                      name={`terms.${index}.definition`}
                      as="textarea"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter definition"
                    />
                    {formik.errors.terms?.[index]?.definition && formik.touched.terms?.[index]?.definition && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.terms[index].definition}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image (Optional)
                  </label>
                  <Field
                    name={`terms.${index}.image`}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  />
                  
                  {/* Image Preview for Terms */}
                  {term.image && (
                    <div className="mt-2">
                      {isValidImageUrl(term.image) ? (
                        <div className="relative inline-block">
                          <img
                            src={term.image}
                            alt={`Preview for ${term.title || 'term'}`}
                            className="w-24 h-18 object-cover rounded border border-gray-200"
                            onError={(e) => handleImageError(e, index)}
                            onLoad={() => console.log(`Term ${index + 1} image loaded:`, term.image)}
                          />
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded">
                            ✓
                          </div>
                        </div>
                      ) : (
                        <div className="w-24 h-18 bg-red-50 border border-red-200 rounded flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-red-500 text-xs">Invalid</div>
                            <div className="text-red-400 text-xs">URL</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() => push({ title: '', definition: '', image: '' })}
              className="w-full flex items-center justify-center space-x-2"
            >
              <FiPlus size={18} />
              <span>Add More Terms</span>
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default TermForm;