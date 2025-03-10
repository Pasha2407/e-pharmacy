import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Formik, Form } from 'formik';

import { addProductThunk } from '../../redux/products/productsServices';
import { selectProductsError } from '../../redux/products/productsSelectors';
import s from './Modal.module.scss';

export const Modal = ({ closeModal, add }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectProductsError);
  const [buttonClick, setButtonClick] = useState(false);

  const initialValues = {
    name: '',
    category: '',
    stock: '',
    suppliers: '',
    price: '',
  };

  const categories = [
    'Medicine',
    'Heart',
    'Head',
    'Hand',
    'Leg',
    'Dental Care',
    'Skin Care',
  ];

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(addProductThunk(values))
      .unwrap()
      .then(() => {
        resetForm();
        closeModal();
      })
      .catch(error => console.error('error:', error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal}>
        <div className={s.exit}>
          <div onClick={closeModal}>X</div>
        </div>
        {add ? <h2>Add a new product</h2> : <h2>Edit product</h2>}

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, resetForm }) => (
            <div className={s.content}>
              <Form className={s.form}>
                <Field
                  className={s.formLabel}
                  name="name"
                  type="text"
                  placeholder="Product info"
                />
                <Field as="select" name="category" className={s.select}>
                  <option value="" disabled>
                    Category
                  </option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <Field
                  className={s.formLabel}
                  name="stock"
                  type="text"
                  placeholder="Stock"
                />
                <Field
                  className={s.formLabel}
                  name="suppliers"
                  type="text"
                  placeholder="Suppliers"
                />
                <Field
                  className={s.formLabel}
                  name="price"
                  type="text"
                  placeholder="Price"
                />
                <div className={s.buttons}>
                  <button
                    onClick={() => setButtonClick(true)}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {add ? 'Add' : 'Save'}
                  </button>
                  <button onClick={() => resetForm()}>Cancel</button>
                </div>
              </Form>
              {buttonClick && error && (
                <div className={s.error}>
                  <p>Error!</p>
                  <small>Maybe incorrect data entered</small>
                </div>
              )}
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};
