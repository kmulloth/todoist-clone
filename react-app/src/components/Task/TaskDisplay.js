

function TaskDisplay({setShowModal, task}) {

    return (
        <div className="task-display">
            <div className="task-display-header">
                <h1>{task.name}</h1>
                <p>Due: {new Date(new Date(task.due).setDate(new Date(task.due).getDate() + 1)).toLocaleDateString()}</p>
                <p>Priority: {task.priority}</p>
            </div>
            <div className="task-display-description">
                <h4>Description</h4>
                <p>{task.description}</p>
            </div>
        </div>
    )
}

export default TaskDisplay;
