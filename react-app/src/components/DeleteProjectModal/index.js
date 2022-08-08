import { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteProject from './DeleteProject';
// import deleteButton from '../assets/delete_button.png';

function DeleteProjectModal({project}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="fas fa-trash fa-lg" onClick={() => {
        setShowModal(true)
        }}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProject project={project} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteProjectModal;
