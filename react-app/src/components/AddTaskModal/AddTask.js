import {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTask, getTasks } from '../../store/tasks'

function AddTask({setShowModal}) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [due, setDue] = useState('')
    const [priority, setPriority] = useState(0)

    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        const task = {
            name,
            description,
            due,
            priority,
            user_id: currentUser.id
        }

        dispatch(createTask(task)).then(() => {
            dispatch(getTasks())
            setShowModal(false)
            history.push('/')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type='text' placeholder="Name" className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='form-group'>
                <input type='text' placeholder='Description' className='form-control' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='due'>Due</label>
                <input type='date' className='form-control' id='due' value={due} onChange={(e) => setDue(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='priority'>Priority</label>
                <select className='form-control' id='priority' value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value={0}>None</option>
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                </select>
            </div>
            <button onClick={e => setShowModal(false)} className='cancel-btn'>Cancel</button>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default AddTask;
