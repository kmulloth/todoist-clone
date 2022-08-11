import { deleteSection } from "../../store/sections";
import { useDispatch } from "react-redux";

function DeleteSection ({section, setShowModal}) {

    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deleteSection(section.id))
        setShowModal(false)
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <h2>Delete section?</h2>
            <button type="submit">Yes</button>
        </form>
    )
}

export default DeleteSection
