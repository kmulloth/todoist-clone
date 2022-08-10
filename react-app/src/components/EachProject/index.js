import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import { getTasks } from "../../store/tasks";
import { getProjects } from "../../store/projects";
import DeleteProjectModal from "../DeleteProjectModal";
import EditProjectModal from "../EditProjectModal";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import AddSection from "../AddSection";

function Project() {

    const projects = useSelector(state => state.projects);
    const tasks = useSelector(state => state.tasks);
    console.log('Tasks: ', Object.values(tasks));
    const {projectId} = useParams();
    const project = projects[projectId];
    const projectTasks = Object.values(tasks).filter(task => task.project_id == projectId);
    const dispatch = useDispatch();

    const [showAddSection, setShowAddSection] = useState(false);

    useEffect(() => {
        dispatch(getTasks())
        dispatch(getProjects())
    }, [dispatch]);

    return (
        <div>
            <div className="project-header">
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
                <EditProjectModal project={project}/>
                <DeleteProjectModal project={project}/>
            </div>
            <div className='section-form'>
                <button onClick={() => setShowAddSection(true)}>Add Section</button>
                {showAddSection && <AddSection projectId={projectId} setShowAddSection={setShowAddSection}/>}
            </div>
            <div className="project-tasks">
                {projectTasks.map(task => (
                    <div key={task.id} className="task">
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                        <EditTaskModal task={task}  />
                        <DeleteTaskModal task={task} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project;
