import { useEffect, useState } from 'react';

import { Modal } from 'components/Modal/Modal';
import s from './AddProductButton.module.scss';

export const AddProductButton = ({ setCreatedProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [finish, setFinish] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setCreatedProduct(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFinish(true);
  };

  useEffect(() => {
    if (finish && !showModal) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [finish, showModal, setCreatedProduct]);

  return (
    <div>
      <div className={s.button} onClick={openModal}>
        <div className={s.icon}></div>
        <p>Add a new product</p>
      </div>
      {showModal && <Modal closeModal={closeModal} add={true} />}
    </div>
  );
};
