import { deleteProject } from "../../store/projects";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeleteTask ({project, setShowModal}) {

    const dispatch = useDispatch()
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deleteProject(project.id))
        setShowModal(false)
        history.push("/app/inbox")
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Delete project?</h2>
            <button type="submit">Yes</button>
        </form>
    )
}

export default DeleteTask
