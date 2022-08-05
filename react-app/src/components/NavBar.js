import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import AddTaskModal from './AddTaskModal';


const NavBar = ({setShowSidebar, showSidebar}) => {

  const currentUser = useSelector(state => state.session.user);

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
