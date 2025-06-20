import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addFlashcard } from '../store/flashcardSlice';
import { Flashcard } from '../types';
import MainForm from '../components/FlashcardForm/MainForm';
import TermForm from '../components/FlashcardForm/TermForm';
import Button from '../components/UI/Button';

const validationSchema = Yup.object({
  title: Yup.string().required('Group title is required'),
  description: Yup.string().required('Description is required'),
  terms: Yup.array().of(
    Yup.object({
      title: Yup.string().required('Term title is required'),
      definition: Yup.string().required('Term definition is required'),
    })
  ).min(1, 'At least one term is required'),
});

const CreateFlashcard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    description: '',
    image: '',
    terms: [{ title: '', definition: '', image: '' }],
  };

  const handleSubmit = (values: typeof initialValues) => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      image: values.image || undefined,
      terms: values.terms.map((term, index) => ({
        id: `${Date.now()}-${index}`,
        title: term.title,
        definition: term.definition,
        image: term.image || undefined,
      })),
      createdAt: new Date().toISOString(),
    };

    dispatch(addFlashcard(newFlashcard));
    navigate('/', { state: { message: 'Flashcard created successfully!' } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Flashcard</h1>
        <p className="text-gray-600">Build your flashcard with terms and definitions</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-8">
            <MainForm formik={formik} />
            <TermForm formik={formik} />
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="px-8"
              >
                Create Flashcard
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFlashcard;