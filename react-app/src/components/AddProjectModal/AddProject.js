import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject, getProjects } from "../../store/projects";

function AddProject({setShowModal}) {

    const [name, setName] = useState('')
    const [color, setColor] = useState('#696969')
    const [type, setType] = useState('list')

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const colors = [
        { name: 'Charcoal', value: '#686868' },
        { name: 'Red', value: '#db4b3f' },
        { name: 'Orange', value: '#f9a825' },
        { name: 'Yellow', value: '#f9e821' },
        { name: 'Green', value: '#b0d851' },
        { name: 'Blue', value: '#4b9dd8' },
        { name: 'Purple', value: '#8f8fd8' },
        { name: 'Pink', value: '#f9c0c5' },
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#ffffff' },
    ]

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
                {name.replace(/\s+/g, '').length < 1 ? <p className='error'>Name is required</p> : null}
            </div>
            <div className='input'>
                <select placeholder='Color' className='form-control' id='color' value={color} onChange={(e) => setColor(e.target.value)} >
                    {colors.map(color => <option key={color.name} value={color.value}>{color.name}</option>)}
                </select>
            </div>
            {/* <div className='input' id='project-type-selct'>
                <button id='project-type-list' className='project-type-list' onClick={() => {setType('list')}}>
                    <i className="fa fa-list" />
                </button>
                <button id='project-type-board' className='project-type-board' onClick={() => {setType('board')}}>
                    <i className="fa fa-th-large" />
                </button>
            </div> */}
            <button onClick={e => setShowModal(false)} className='cancel-btn'>Cancel</button>
            <button disabled={name.replace(/\s+/g, '').length < 1} type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default AddProject;
