import {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editTask, getTasks } from '../../store/tasks'

function EditTask({task, setShowModal}) {

    const [name, setName] = useState(task?.name)
    const [description, setDescription] = useState(task?.description)
    const [due, setDue] = useState(task?.due)
    const [priority, setPriority] = useState(task?.priority)
    const [projectId, setProjectId] = useState(task?.project_id)

    const currentUser = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTask = {
            id: task.id,
            name,
            description,
            // complete: false,
            // section_id: task.section_id,
            project_id: projectId,
            due,
            priority,
            // user_id: currentUser.id
        }
        console.log(newTask)
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
            setShowModal(false)
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
            <div className='form-group'>
                <label htmlFor='project'>Project</label>
                <select className='form-control' id='project' value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    <option value={null}>None</option>
                    {Object.values(projects).map(project => (
                        <option value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={e => setShowModal(false)} className='cancel-btn'>Cancel</button>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default EditTask;
