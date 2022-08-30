import {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editTask, getTasks } from '../../store/tasks'

function EditTask({task, setShowEditTask}) {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(task?.name)
    const [description, setDescription] = useState(task?.description)
    const [due, setDue] = useState(task?.due)
    const [priority, setPriority] = useState(task?.priority)
    const [projectId, setProjectId] = useState(task?.project_id )
    const [sectionId, setSectionId] = useState(task?.section_id )

    const [showProjects, setShowProjects] = useState(false)

    const currentUser = useSelector(state => state.session.user)
    const projects = useSelector(state => state.projects)
    const sections = useSelector(state => state.sections)
    const dispatch = useDispatch()
    const history = useHistory()

    const trueDue = new Date(new Date(due).setDate(new Date(due).getDate() + 1))

    const userProjects = Object.values(projects).map(project => {
        if (project.user_id == currentUser.id){
            const sectionsArr = Object.values(sections).filter(section => section.project_id == project.id)
            return {id: project.id, name: project.name, color: project.color, sections: sectionsArr}
        }
    })

    useEffect(() => {
        console.log(due, new Date(due), '!!!' , new Date(), new Date(due) < new Date())
        const tempErrors = [];

        if (name.replace(/\s+/g, '').length < 1) tempErrors.push('Name is required');
        if (name.length > 50) tempErrors.push('Name must be less than 50 characters');
        // if (description.replace(/\s+/g, '').length < 1) tempErrors.push('Please add a brief description');
        if (description.length > 500) tempErrors.push('Description must be less than 500 characters');
        // if (!due) tempErrors.push('Please add a due date');
        // if (!(trueDue >= new Date())) tempErrors.push('Due date must be in the future');

        setErrors(tempErrors);
    } , [name, description, due]);

    useEffect(() => console.log(due), [due])

    const handleSubmit = (e) => {
        e.preventDefault()

        const trueNull = (val) => {
            if( val != null) return val;
            return
        }

        const newTask = {
            id: task.id,
            name,
            description,
            // complete: false,
            due,
            priority,
            project_id: trueNull(projectId),
            section_id: trueNull(sectionId),
            userId: currentUser.id
        }
        console.log(newTask)
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
            setShowEditTask(false)
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
        <form onSubmit={handleSubmit} id='edit-task-form'>
            <ul className="errors">
                {errors.map(error => <li className='error' key={error}>{error}</li>)}
            </ul>
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
            <div id='add-task-options'>
                <div id='date-project'>
                    <div className='form-group'>
                        <input type='date' className='form-control' id='due' value={due} onChange={(e) => setDue(e.target.value)} />
                    </div>
                    <div className='form-group' id='project-show'>
                        <div
                            className='form-control'
                            id='project'
                            value={[projectId, sectionId]}
                            onClick={(e) => setShowProjects(!showProjects)}>{projects[projectId] ? projects[projectId].name : 'Inbox'}
                        </div>
                        {showProjects && <ul id='project-select'>
                            <li value='null,null' onClick={e => {
                                setProjectId(null)
                                setSectionId(null)
                                setShowProjects(false)
                            }}>Inbox</li>
                            {userProjects.map(project => project && (
                                <>
                                <li className='project-ddli' key={project?.id} value={project?.id} onClick={e => {
                                setProjectId(e.target.value)
                                setSectionId(null)
                                setShowProjects(false)
                            }}>
                                <span className='bubble' style={{color: project.color}}>&bull;</span>
                                <p>{project?.name.toUpperCase()}</p>
                            </li>
                                {project.sections.length > 0 && project.sections.map(section => (
                                    <li cid='section-ddli' value={section?.id} onClick={e => {
                                        setProjectId(sections[e.target.value].project_id)
                                        setSectionId(e.target.value)
                                        setShowProjects(false)
                                    }}>{`\t ${section.name.toLowerCase()}`}</li>
                                ))}
                                </>
                            ))}
                        </ul>}
                    </div>
                </div>
                <div className='form-group' id='priority-select'>
                        <div value={0} onClick={e => setPriority(0)}>{priority === 0 ? <i class="fa-solid fa-flag" id='none'></i>: <i class="fa-regular fa-flag" id='none'></i>}</div>
                        <div value={1} onClick={e => setPriority(1)}>{priority === 1 ? <i class="fa-solid fa-flag" id='low'></i>: <i class="fa-regular fa-flag" id='low'></i>}</div>
                        <div value={2} onClick={e => setPriority(2)}>{priority === 2 ? <i class="fa-solid fa-flag"  id='med'></i>: <i class="fa-regular fa-flag"  id='med'></i>}</div>
                        <div value={3} onClick={e => setPriority(3)}>{priority === 3 ? <i class="fa-solid fa-flag" id='high'></i>: <i class="fa-regular fa-flag" id='high'></i>}</div>
                </div>
            </div>
            <div id='add-task-buttons'>
                <button onClick={e => setShowEditTask(false)} className='cancel-btn'>Cancel</button>
                <button disabled={errors.length > 0} type='submit' className={`submit${errors.length > 0 ? '-disabled' : ''}`}>Submit</button>
            </div>
        </form>
    );
}

export default EditTask;
