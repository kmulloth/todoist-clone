import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProject, getProjects } from "../../store/projects";

function EditProject({setShowModal, project}) {


    const [name, setName] = useState(project.name)
    const [color, setColor] = useState(project.color)
    const [type, setType] = useState(project.type)

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()

        const newProject = {
            id: project.id,
            name,
            color,
            type,
            user_id: currentUser.id
        }

        dispatch(editProject(newProject)).then(() => {
            dispatch(getProjects())
            setShowModal(false)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='text' placeholder="Name" className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className='input'>
                <input type='color' placeholder='Color' className='form-control' id='color' value={color} onChange={(e) => setColor(e.target.value)} required/>
            </div>
            <div className='input' id='project-type-selct'>
                <button id='project-type-list' className='project-type-list' onClick={() => {setType('list')}}>
                    <i className="fa fa-list" />
                </button>
                <button id='project-type-board' className='project-type-board' onClick={() => {setType('board')}}>
                    <i className="fa fa-th-large" />
                </button>
            </div>
            <button onClick={e => setShowModal(false)} className='cancel-btn'>Cancel</button>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default EditProject;
