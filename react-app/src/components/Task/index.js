import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTask } from "../../store/tasks";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";

function  Task ({task}) {

    const currentUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => dispatch(getTasks()), [])

    const handleComplete = (e) => {
        const taskId = e.target.id
        const oldTask = tasks[taskId]
        const newTask = {
            id: oldTask.id,
            name: oldTask.name,
            description: oldTask.description,
            complete: !oldTask.complete,
            section_id: oldTask.sectionId,
            project_id: oldTask.projectId,
            due: oldTask.due,
            priority: oldTask.priority,
            user_id: currentUser.id
        }
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
        }).catch(err => console.log(err))
    }

    return (
        <li className="inbox-task">
            <div className="inbox-task-title">
                <input type="checkbox"checked={task.complete} value={task.complete} id={task.id} onChange={handleComplete} />
                <div className="inbox-task-header">
                    <h4>{task.name}</h4>
                    <p>{task.due}</p>
                </div>
            </div>
            <div className="inbox-task-buttons">
                <EditTaskModal task={task} />
                <DeleteTaskModal task={task} />
            </div>
        </li>
    )

}

export default Task;
