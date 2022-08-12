import {NavLink, useHistory} from 'react-router-dom';

function Splash(){

    return(
        <div id="splash-container">
            <div id="splash-content">
                <div id='action-panel'>
                    <h1>Welcome to Checkoff</h1>
                    <p>
                    Become focused, organized, and calm with Checkoff. The world’s #9999999999 task manager and to-do list app.
                    </p>
                    <NavLink id='signup-action' to='/sign-up'exact={true}>Start for free</NavLink>
                </div>

            </div>
        </div>
    )
}

export default Splash;
