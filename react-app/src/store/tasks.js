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

export const editTask = (task) => async (dispatch) => {
    // console.log("THUNK TASK: ", task)
    const res = await fetch(`/api/tasks/${task.id}/`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // console.log('RES::', res.json())
    if (res.ok) {
        const newTask = await res.json()
        console.log('NEW TASK: ', newTask)
        dispatch(updateTask(newTask))
    }
}

export const deleteTask = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeTask(id))
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

            case EDIT_TASK:
                const newEditState = {
                    ...state, [action.payload.id]: action.payload
                }
                return newEditState

            case DELETE_TASK:
                const newDeleteState = {
                    ...state
                }
                delete newDeleteState[action.payload]
                return newDeleteState

            default:
                return state
        }
}

export default taskReducer
