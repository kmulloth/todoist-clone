import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTask } from "../../store/tasks";
import { Modal } from '../../context/Modal';
import TaskDisplay from './TaskDisplay';
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import './Task.css'

function  Task ({task}) {

    const today = new Date();
    const dueDate = new Date(new Date(task.due).setDate(new Date(task.due).getDate() + 1));

    const [showModal, setShowModal] = useState(false);

    // console.log(today, dueDate, overdue)

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
            section_id: oldTask.section_id ? oldTask.section_id : '',
            project_id: oldTask.project_id ? oldTask.project_id : '',
            due: oldTask.due,
            priority: oldTask.priority,
            user_id: currentUser.id
        }
        dispatch(editTask(newTask)).then(() => {
            dispatch(getTasks())
        }).catch(err => console.log(err))
    }

    return (
        <>
        <li className="inbox-task" >
            <div className="inbox-task-title" >
                <label className='checkbox-label'>
                    <input className='checkbox' type="checkbox"checked={task.complete} value={task.complete} id={task.id} onChange={handleComplete} />
                    <span className={`checkbox-custom priority${task.priority}`} />
                </label>
                <div className="inbox-task-header" onClick={() => setShowModal(true)}>
                    <h4>{task.name}</h4>
                    <p>{new Date(new Date(task.due).setDate(new Date(task.due).getDate() + 1)).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="inbox-task-buttons">
                <EditTaskModal task={task} />
                <DeleteTaskModal task={task} />
            </div>
        </li>
        {showModal && (
            <Modal id='task-modal' onClose={() => setShowModal(false)}>
                <TaskDisplay task={task} setShowModal={setShowModal}/>
            </Modal>
        )}
        </>
    )

}

export default Task;
