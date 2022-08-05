import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/tasks";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";

function Inbox () {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    useEffect(() => dispatch(getTasks()), [])

    return (
        <>
        <h2>Inbox</h2>
        <ul id='all-tasks'>
        {Object.values(tasks).map(task => {
            return (
                <li className="inbox-task">
                    <h4>NAME: {task.name}</h4>
                    <p>DESCRIPTION: {task.description}</p>
                    <p>DUE: {task.due}</p>
                    <p>PRIORITY: {task.priority}</p>
                    <EditTaskModal task={task} />
                    <DeleteTaskModal task={task} />
                </li>
            )
        })}
        </ul>
        </>
    )
}

export default Inbox;
