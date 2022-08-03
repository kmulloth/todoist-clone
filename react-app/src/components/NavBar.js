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
        <li>
          <i class="fa-solid fa-bars" onClick={() => setShowSidebar(!showSidebar)}/>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <i className='fas fa-home' />
          </NavLink>
        </li>
        {!currentUser && (
        <>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        </>)}
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        {currentUser && (
        <>
        <li>
          <AddTaskModal />
        </li>
        <li>
          <LogoutButton />
        </li>
        </>)}
      </ul>
    </nav>
  );
}

export default NavBar;
