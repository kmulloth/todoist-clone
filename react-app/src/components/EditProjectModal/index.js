import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProject from './EditProject';

function EditProjectModal({project}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="fas fa-edit fa-lg" onClick={() => {
        setShowModal(true)

        }}></i>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProject project={project} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditProjectModal;
