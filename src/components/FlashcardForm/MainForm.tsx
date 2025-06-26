import React from 'react';
import { Field, FormikProps } from 'formik';

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

interface MainFormProps {
  formik: FormikProps<FormValues>;
}

const MainForm: React.FC<MainFormProps> = ({ formik }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', formik.values.image);
    e.currentTarget.style.display = 'none';
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Group</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Group Title*
          </label>
          <Field
            name="title"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter group title"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Add Description*
          </label>
          <Field
            name="description"
            as="textarea"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe the flashcard..."
          />
          {formik.errors.description && formik.touched.description && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image (Optional)
          </label>
          <Field
            name="image"
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          />
          
          {/* Image Preview */}
          {formik.values.image && (
            <div className="mt-3">
              {isValidImageUrl(formik.values.image) ? (
                <div className="relative">
                  <img
                    src={formik.values.image}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                    onError={handleImageError}
                    onLoad={() => console.log('Image loaded successfully:', formik.values.image)}
                  />
                  <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                    ✓
                  </div>
                </div>
              ) : (
                <div className="w-32 h-24 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-red-500 text-xs">Invalid URL</div>
                    <div className="text-red-400 text-xs">Check format</div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Helper text */}
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPG, PNG, GIF, WebP, SVG. Use direct image URLs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainForm;