const ADD_TASK = 'tasks/ADD_TASK'
const GET_TASKS = 'tasks/GET_TASKS'
const EDIT_TASK = 'tasks/EDIT_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'

const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})

const retrieveTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})

const updateTask = (task) => ({
    type: EDIT_TASK,
    payload: task
})

const removeTask = (id) => ({
    type: DELETE_TASK,
    payload: id
})

export const createTask = (task) => async (dispatch) => {
    const res = await fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const task = await res.json()
        dispatch(addTask(task))
        return 'Task Added'
    }
}

export const getTasks = () => async (dispatch) => {
    const res = await fetch('/api/tasks/')
    if (res.ok) {
        const tasks = await res.json()
        dispatch(retrieveTasks(tasks))
        return tasks
    }
}


const initialState = {}

const taskReducer = (state = initialState, action) => {
    const newState = {};
        switch (action.type) {
            case GET_TASKS:
                const allTasks = {}
                action.payload.forEach(task => allTasks[task.id] = task)
                return { ...allTasks }

            case ADD_TASK:
                const newAddState = {
                    ...state, [action.payload.id]: action.payload
                }
                return newAddState

            default:
                return state
        }
}

export default taskReducer
