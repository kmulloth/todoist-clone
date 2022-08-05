import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditTask from './EditTask';

function EditTaskModal({task}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="fas fa-edit fa-lg" onClick={() => {
        setShowModal(true)

        }}></i>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditTask task={task} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditTaskModal;
