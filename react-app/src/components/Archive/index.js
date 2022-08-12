import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTask } from "../../store/tasks";
import Task from '../Task';
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";

function Archive() {

    const currentUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks).filter(task => task.userId === currentUser.id);
    const dispatch = useDispatch()

    useEffect(() => dispatch(getTasks()), [])

    const handleComplete = (e) => {
        const taskId = e.target.id
        const task = tasks[taskId]
        const newTask = {
            id: task.id,
            name: task.name,
            description: task.description,
            complete: !task.complete,
            section_id: task.sectionId,
            project_id: task.projectId,
            due: task.due,
            priority: task.priority,
            user_id: currentUser.id
        }
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
        }).catch(err => console.log(err))
    }

    return (
        <div id='inbox'>
            <h2>Archive</h2>
            <ul id='all-tasks'>
            {userTasks.map(task => {
                return task.complete === true && <Task task={task} />
            })}
            </ul>
        </div >
    )
}

export default Archive;
