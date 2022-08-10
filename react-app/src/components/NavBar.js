import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import AddTaskModal from './AddTaskModal';
import { loginDemo } from '../store/session';

const NavBar = ({setShowSidebar, showSidebar}) => {

  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDemo = () => {
    dispatch(loginDemo()).then(
      () => history.push('/app/inbox')
    )
  }

  return (
    <nav>
      <ul id='navlist'>
        <li id='navbar-nav-buttons'>
          <div >
            <i className="fa-solid fa-bars" onClick={() => setShowSidebar(!showSidebar)}/>
          </div>
          <NavLink to={currentUser ?'/app':'/'} exact={true} activeClassName='active'>
            <i className='fas fa-home' />
          </NavLink>
        </li>
        <li id='navbar-profile-buttons'>
        {!currentUser && (
        <>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <button onClick={handleDemo}>Demo</button>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </>)}
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
        {currentUser && (
        <>
          <AddTaskModal />
          <LogoutButton />
        </>)}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
