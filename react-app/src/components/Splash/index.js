import  {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import { loginDemo } from '../../store/session';
import './Splash.css'

function Splash(){
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDemo = () => {
        dispatch(loginDemo()).then(
          () => history.push('/app/inbox')
        )
      }

    if (currentUser) history.push('/app/today');
    return(
        <div id="splash-container">
            <div id="splash-content">
                <div id='action-panel'>
                    <h1>Welcome to Checkoff</h1>
                    <p>
                    Become focused, organized, and calm with Checkoff. The world’s #9999999999 task manager and to-do list app.
                    </p>
                    <NavLink className='splash-button' id='signup-action' to='/sign-up'exact={true}>Start for free</NavLink>
                    <button className='splash-button' onClick={handleDemo}>Demo</button>
                    <NavLink className='splash-button' id='login-action' to='/login' exact={true}>Login</NavLink>
                </div>
                <div id='splash-image-container'>
                    <img src='https://www.usnews.com/object/image/00000142-9262-d33c-abc6-ff770ec60006/38205Checklist.jpg?update-time=1481554088624&size=responsive970' alt='background-img' />
                </div>
            </div>
        </div>
    )
}

export default Splash;
