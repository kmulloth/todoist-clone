import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { createSection, getSections } from '../../store/sections';

function AddSection({projectId, setShowAddSection}) {

    const [name, setName] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const section = {
            name,
            project_id: projectId,
        }

        console.log('section: ', section);

        dispatch(createSection(section)).then(() => {
            dispatch(getSections())
            setShowAddSection(false)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Section Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="form-group">
                <button id='cancel' className='btn btn-secondary' onClick={() => setShowAddSection(false)}>Cancel</button>
                <button type="submit" disabled={name.length < 1}className="btn btn-primary">Add Section</button>
            </div>
        </form>
    )
}

export default AddSection;
