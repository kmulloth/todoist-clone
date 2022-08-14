

function TaskDisplay({setShowModal, task}) {

    const priorities = ['None', 'Low', 'Medium', 'High'];

    return (
        <div className="task-display">
            <div className="task-display-header">
                <div className='task-title-container'>
                    <h1>{task.name}</h1>
                </div>
                <div className="task-display-info">
                    <p>Due: {new Date(new Date(task.due).setDate(new Date(task.due).getDate() + 1)).toLocaleDateString()}</p>
                    <p>Priority: {priorities[task.priority]}</p>
                </div>
            </div>
            <div className="task-display-description">
                <h4>Description</h4>
                <p>{task.description}</p>
            </div>
        </div>
    )
}

export default TaskDisplay;
