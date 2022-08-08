import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject, getProjects } from "../../store/projects";

function AddProject({setShowModal}) {


    const [name, setName] = useState('')
    const [color, setColor] = useState('#db4b3f')
    const [type, setType] = useState('list')

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()

        const project = {
            name,
            color,
            type,
            user_id: currentUser.id
        }

        dispatch(createProject(project)).then(() => {
            dispatch(getProjects())
            setShowModal(false)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='input'>
                <input type='text' placeholder="Name" className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='input'>
                <input type='color' placeholder='Color' className='form-control' id='color' value={color} onChange={(e) => setColor(e.target.value)} />
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

export default AddProject;
