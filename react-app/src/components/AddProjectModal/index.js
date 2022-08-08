import { useState } from "react";
import { Modal } from "../../context/Modal";
import AddProject from "./AddProject";

function AddProjectModal() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div id='project-modal-div' className='sidebar-link' onClick={() => {setShowModal(true)
            }}>
            <i className="fa fa-plus" id='add-project' />
        </div>

        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <AddProject setShowModal={setShowModal}/>
        </Modal>
        )}
        </>
    )
}

export default AddProjectModal;
