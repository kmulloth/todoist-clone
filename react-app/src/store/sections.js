const ADD_SECTION = 'sections/ADD_SECTION'
const GET_SECTIONS = 'sections/GET_SECTIONS'
const EDIT_SECTION = 'sections/EDIT_SECTION'
const DELETE_SECTION = 'sections/DELETE_SECTION'

const addSection = (section) => ({
    type: ADD_SECTION,
    payload: section
})

const retrieveSections = (sections) => ({
    type: GET_SECTIONS,
    payload: sections
})

const updateSection = (section) => ({
    type: EDIT_SECTION,
    payload: section
})

const removeSection = (id) => ({
    type: DELETE_SECTION,
    payload: id
})

export const createSection = (section) => async (dispatch) => {
    const res = await fetch("/api/sections/", {
        method: "POST",
        body: JSON.stringify(section),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const section = await res.json()
        dispatch(addSection(section))
        return 'section Added'
    }
}

export const getSections = () => async (dispatch) => {
    const res = await fetch('/api/sections/')
    if (res.ok) {
        const sections = await res.json()
        dispatch(retrieveSections(sections))
        return sections
    }
}

export const getSection = (id) => async (dispatch) =>  {
    const res = await fetch(`/api/sections/${id}/`)
    if (res.ok) {
        const section= await res.json()
        dispatch(retrieveSections(section))
        return section
    }
}

export const editSection = (section) => async (dispatch) => {
    console.log("THUNK section: ", section)
    const res = await fetch(`/api/sections/${section.id}/`, {
        method: "PUT",
        body: JSON.stringify(section),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const section = await res.json()
        dispatch(updateSection(section))
        return 'section Updated'
    }
}

export const deleteSection = (id) => async (dispatch) => {
    const res = await fetch(`/api/sections/${id}/`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeSection(id))
        return 'section Deleted'
    }
}

const initialState = {}

const sectionReducer = (state = initialState, action) => {
    const newState = {};
    switch (action.type) {
        case GET_SECTIONS:
            const allSections = {}
            action.payload.forEach(section => allSections[section.id] = section)
            return { ...allSections }

        case ADD_SECTION:
            const newAddState = {
                ...state, [action.payload.id]: action.payload
            }
            return newAddState

        case EDIT_SECTION:
            const newEditState = {
                ...state, [action.payload.id]: action.payload
            }
            return newEditState

        case DELETE_SECTION:
            const newDeleteState = {
                ...state
            }
            delete newDeleteState[action.payload]
            return newDeleteState

        default:
            return state
    }
}

export default sectionReducer
