import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTask } from "../../store/tasks";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import Task from '../Task';

function Today () {

    const today = new Date();
    const currentUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks).filter(task => task.userId === currentUser.id);
    const dispatch = useDispatch()

    useEffect(() => dispatch(getTasks()), [])

    return (
        <div id='inbox'>
            <h2>Today</h2>
            <ul id='all-tasks'>
            {userTasks.map(task => {
                const trueDue = new Date(new Date(task?.due).setDate(new Date(task?.due).getDate() + 1));
                return trueDue.getDate() === today.getDate() && <Task task={task} />

            })}
            </ul>
        </div >
    );
}

export default Today;
