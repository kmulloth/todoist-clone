import {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editTask, getTasks } from '../../store/tasks'

function EditTask({task, setShowModal}) {
    console.log(task)
    const [name, setName] = useState(task?.name)
    const [description, setDescription] = useState(task?.description)
    const [due, setDue] = useState(task?.due )
    const [priority, setPriority] = useState(task?.priority)
    const [projectId, setProjectId] = useState(task?.project_id)
    const [sectionId, setSectionId] = useState(task?.section_id)

    const currentUser = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const sections = useSelector(state => state.sections)
    const dispatch = useDispatch()
    const history = useHistory()

    const userProjects = Object.values(projects).map(project => {
        if (project.user_id == currentUser.id){
            const sectionsArr = Object.values(sections).filter(section => section.project_id == project.id)
            return {id: project.id, name: project.name, sections: sectionsArr}
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTask = {
            id: task.id,
            name,
            description,
            // complete: false,
            section_id: sectionId,
            project_id: projectId,
            due,
            priority,
            // user_id: currentUser.id
        }
        console.log(newTask)
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
            setShowModal(false)
            history.push(projectId != null ? `/app/projects/${projectId}` : '/app/inbox')
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
            <div className='form-group'>
                <input
                type='text'
                placeholder="Name"
                className='form-control'
                id='name' value={name} onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <input
                type='text'
                placeholder='Description'
                className='form-control' id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='due'>Due</label>
                <input type='date'
                className='form-control'
                id='due' value={due}
                onChange={(e) => setDue(e.target.value)}
                required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='priority'>Priority</label>
                <select
                className='form-control'
                id='priority' value={priority}
                onChange={(e) => setPriority(e.target.value)}>
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
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    );
}

export default EditTask;
