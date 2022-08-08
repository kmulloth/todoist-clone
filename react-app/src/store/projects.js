const ADD_PROJECT = 'projects/ADD_PROJECT'
const GET_PROJECTS = 'projects/GET_PROJECTS'
const EDIT_PROJECT = 'projects/EDIT_PROJECT'
const DELETE_PROJECT = 'projects/DELETE_PROJECT'

const addProject = (project) => ({
    type: ADD_PROJECT,
    payload: project
})

const retrieveProjects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects
})

const updateProject = (project) => ({
    type: EDIT_PROJECT,
    payload: project
})

const removeProject = (id) => ({
    type: DELETE_PROJECT,
    payload: id
})

export const createProject = (project) => async (dispatch) => {
    const res = await fetch("/api/projects/", {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const project = await res.json()
        dispatch(addProject(project))
        return 'Project Added'
    }
}

export const getProjects = () => async (dispatch) => {
    const res = await fetch('/api/projects/')
    if (res.ok) {
        const projects = await res.json()
        dispatch(retrieveProjects(projects))
        return projects
    }
}

export const getProject = (id) => async (dispatch) =>  {
    const res = await fetch(`/api/projects/${id}/`)
    if (res.ok) {
        const project= await res.json()
        dispatch(retrieveProjects(project))
        return project
    }
}

export const editProject = (project) => async (dispatch) => {
    console.log("THUNK PROJECT: ", project)
    const res = await fetch(`/api/projects/${project.id}/`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const project = await res.json()
        dispatch(updateProject(project))
        return 'Project Updated'
    }
}

export const deleteProject = (id) => async (dispatch) => {
    const res = await fetch(`/api/projects/${id}/`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeProject(id))
        return 'Project Deleted'
    }
}

const initialState = {}

const projectReducer = (state = initialState, action) => {
    const newState = {};
    switch (action.type) {
        case GET_PROJECTS:
            const allProjects = {}
            action.payload.forEach(project => allProjects[project.id] = project)
            return { ...allProjects }

        case ADD_PROJECT:
            const newAddState = {
                ...state, [action.payload.id]: action.payload
            }
            return newAddState

        case EDIT_PROJECT:
            const newEditState = {
                ...state, [action.payload.id]: action.payload
            }
            return newEditState

        case DELETE_PROJECT:
            const newDeleteState = {
                ...state
            }
            delete newDeleteState[action.payload]
            return newDeleteState

        default:
            return state
    }
}

export default projectReducer
