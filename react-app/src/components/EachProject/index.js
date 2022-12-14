import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink, useParams} from 'react-router-dom';
import { getTasks } from "../../store/tasks";
import { getProjects } from "../../store/projects";
import { getSections } from "../../store/sections";
import DeleteProjectModal from "../DeleteProjectModal";
import EditProjectModal from "../EditProjectModal";
import AddTask from '../AddTaskModal/AddTask'
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import DeleteSectionModal from "../DeleteSectionModal";
import AddSection from "../AddSection";
import Task from "../Task";
import './EachProject.css'

function Project() {

    const currentUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects);
    const sections = useSelector(state => state.sections);
    const tasks = useSelector(state => state.tasks);
    const {projectId} = useParams();
    const project = projects[projectId];
    const projectTasks = Object.values(tasks).filter(task => task.project_id == projectId);
    const projectSections = Object.values(sections).filter(section => section.project_id == projectId);
    const dispatch = useDispatch();

    console.log('Sections: ', projectSections, 'Tasks: ', projectTasks);

    const [showAddSection, setShowAddSection] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        dispatch(getTasks())
        dispatch(getProjects())
        dispatch(getSections())
    }, [dispatch]);

    if (project?.user_id !== currentUser.id) {
        return <NavLink to='/app/inbox' > Invalid URL Click here to return to inbox</NavLink>;
    }
    return (
        <div className='project'>
            <div className="project-header">
                <h1>{project?.name}</h1>
                <div>
                <EditProjectModal project={project}/>
                <DeleteProjectModal project={project}/>
            </div>
            </div>
            <div className="project-tasks">
                {projectTasks.map(task => {
                    if (task.section_id == null && task.complete === false) {
                        return <Task task={task} />
                    }
                })}
                {showAddTask != 'none' && <button onClick={() => setShowAddTask('none')}>Add Task</button>}
                {showAddTask == 'none' && <AddTask project_id={project.id} setShowAddTask={setShowAddTask} />}
            </div>
            <div className='section-form'>
                {!showAddSection && <button className='add-section-buttons' onClick={() => setShowAddSection(true)}>Add Section</button>}
                {showAddSection && <AddSection projectId={projectId} setShowAddSection={setShowAddSection}/>}
            </div>
            <div className="project-sections">
                {projectSections.map(section => (
                    <div className='section'>
                        <div className="section-header">
                            <h3>{section.name}</h3>
                            <DeleteSectionModal section={section} />
                        </div>
                        <div className="section-tasks">
                        {projectTasks.map(task => {
                            if (task.section_id == section.id && task.complete === false) {
                                return <Task task={task} />
                            }
                        })}
                        {showAddTask != section.id && <button onClick={() => setShowAddTask(section.id)}>Add Task</button>}
                        {showAddTask == section.id && <AddTask project_id={project.id} section_id={section.id} setShowAddTask={setShowAddTask} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project;
