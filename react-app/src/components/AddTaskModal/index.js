import { useState } from "react";
import { Modal } from "../../context/Modal";
import AddTask from "./AddTask";

function AddTaskModal() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div id='song-modal-div' className='sidebar-link' onClick={() => {setShowModal(true)
            }}>
            <i className="fa fa-plus" id='add-song' />
        </div>

        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <AddTask setShowModal={setShowModal}/>
        </Modal>
        )}
        </>
    )
}

export default AddTaskModal;
