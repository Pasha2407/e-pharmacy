import { useState } from 'react';

import { Modal } from 'components/Modal/Modal';
import s from './AddProductButton.module.scss';

export const AddProductButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className={s.button} onClick={() => setShowModal(true)}>
        <div className={s.icon}></div>
        <p>Add a new product</p>
      </div>
      {showModal && <Modal setShowModal={setShowModal} add={true} />}
    </div>
  );
};
