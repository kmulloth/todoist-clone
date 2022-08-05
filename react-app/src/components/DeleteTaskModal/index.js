import { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteTask from './DeleteTask';
// import deleteButton from '../assets/delete_button.png';


function DeleteTaskModal({task}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="fas fa-trash fa-lg" onClick={() => {
        setShowModal(true)
        }}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteTask task={task} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteTaskModal;
