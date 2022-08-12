import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTask } from "../../store/tasks";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import Task from '../Task';
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
                return task.complete === false && <Task task={task} />
            })}
            </ul>
        </div >
    )
}

export default Inbox;
