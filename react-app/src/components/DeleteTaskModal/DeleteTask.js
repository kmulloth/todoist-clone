import { deleteTask, getTasks } from "../../store/tasks";
import { useDispatch } from "react-redux";

function DeleteTask ({task, setShowModal}) {

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deleteTask(task.id))
        setShowModal(false)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Delete task?</h2>
            <button type="submit">Yes</button>
        </form>
    )
}

export default DeleteTask
