import { useDispatch } from 'react-redux';

import { deleteProductThunk } from '../../redux/products/productsServices';
import s from './DeleteModal.module.scss';

export const DeleteModal = ({ setShowModal, id }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(deleteProductThunk(id));
    setShowModal(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal}>
        <h2>Do you really want to delete this product?</h2>
        <div className={s.buttons}>
          <button onClick={() => deleteProduct()}>Delete</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
