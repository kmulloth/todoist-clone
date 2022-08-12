import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTask, getTasks } from '../../store/tasks'

function AddTask({setShowModal}) {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [due, setDue] = useState('')
    const [priority, setPriority] = useState(0)
    const [projectId, setProjectId] = useState()
    const [sectionId, setSectionId] = useState()

    const currentUser = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const sections = useSelector(state => state.sections)
    const dispatch = useDispatch()
    const history = useHistory()
    const today = new Date()

    const userProjects = Object.values(projects).map(project => {
        if (project.user_id == currentUser.id){
            const sectionsArr = Object.values(sections).filter(section => section.project_id == project.id)
            return {id: project.id, name: project.name, sections: sectionsArr}
        }
    })

    useEffect(() => {
        console.log(Date(due), '!!!' , Date(today), Date(due) < Date(today))
        const tempErrors = [];

        if (name.length < 1) tempErrors.push('Name is required');
        if (name.length > 50) tempErrors.push('Name must be less than 50 characters');
        if (description.length < 1) tempErrors.push('Please add a brief description');
        if (description.length > 500) tempErrors.push('Description must be less than 500 characters');
        if (!due) tempErrors.push('Please add a due date');
        if (Date(due) < Date(today)) tempErrors.push('Due date must be in the future');

        setErrors(tempErrors);
    } , [name, description, due]);

    useEffect(() => console.log(due), [due])

    const handleSubmit = (e) => {
        e.preventDefault()

        const trueNull = (val) => {
            if( val != null) return val;
            return
        }

        const task = {
            name,
            description,
            due,
            priority,
            project_id: trueNull(projectId),
            section_id: trueNull(sectionId),
            userId: currentUser.id
        }

        dispatch(createTask(task)).then(() => {
            setShowModal(false)
            history.push(projectId != null ? `/app/projects/${projectId}` : '/app/inbox')
            dispatch(getTasks())
        })
    }

    const handleSectionSelect = (e) => {

        const projectConfig = e.target.value.split(',')
        console.log('Project:', projectConfig[0], 'incoming Section:', projectConfig[1],'old section:', sectionId)
        setProjectId(projectConfig[0])
        setSectionId(projectConfig[1])
        // console.log(projectId, sectionId)
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul className="errors">
                {errors.map(error => <li className='error' key={error}>{error}</li>)}
            </ul>
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
                <select
                className='form-control'
                id='project'
                value={[projectId, sectionId]}
                onChange={(e) => handleSectionSelect(e)}>
                    <option value={[null, null]}>None</option>
                    {userProjects.map(project => project && (
                        <>
                        <option key={project?.id} value={[project?.id, null]}>{project?.name}</option>
                        {project.sections.length > 0 && project.sections.map(section => (
                            <option value={[project?.id, section?.id]}>{section.name}</option>
                        ))}
                        </>
                    ))}
                </select>
            </div>
            <button onClick={e => setShowModal(false)} className='cancel-btn'>Cancel</button>
            <button disabled={errors.length > 0} type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default AddTask;
