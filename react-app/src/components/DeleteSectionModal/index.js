import { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSection from './DeleteSection';
// import deleteButton from '../assets/delete_button.png';


function DeleteSectionModal({section}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="fas fa-trash fa-lg" onClick={() => {
        setShowModal(true)
        }}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSection section={section} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSectionModal;
