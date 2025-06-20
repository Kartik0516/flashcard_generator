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
            placeholder="Enter image URL"
          />
          {formik.values.image && (
            <div className="mt-3">
              <img
                src={formik.values.image}
                alt="Preview"
                className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainForm;