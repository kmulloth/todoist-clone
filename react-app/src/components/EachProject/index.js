import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import DeleteProjectModal from "../DeleteProjectModal";
import EditProjectModal from "../EditProjectModal";

function Project() {

    const projects = useSelector(state => state.projects);
    const {projectId} = useParams();
    const project = projects[projectId];

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <EditProjectModal project={project}/>
            <DeleteProjectModal project={project}/>
        </div>
    )
}

export default Project;
