import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/tasks";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import './Inbox.css'

function Inbox () {

    const currentUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks).filter(task => task.userId === currentUser.id);
    const dispatch = useDispatch()
    useEffect(() => dispatch(getTasks()), [])

    return (
        <div id='inbox'>
            <h2>Inbox</h2>
            <ul id='all-tasks'>
            {userTasks.map(task => {
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
        </div >
    )
}

export default Inbox;
