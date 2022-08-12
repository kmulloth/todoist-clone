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
                console.log(Date(task?.due), '!!!' , Date(today), Date(task.due) === Date(today))
                return Date(task.due) == Date(today) && <Task task={task} />
            }).sort((a, b) => a.due > b.due)}
            </ul>
        </div >
    );
}

export default Today;
