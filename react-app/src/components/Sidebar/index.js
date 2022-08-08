import AddProjectModal from '../AddProjectModal/';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { NavLink } from 'react-router-dom';
import {getProjects} from '../../store/projects';

function Sidebar({setMainContent}) {

    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getProjects()), [])

    return (
        <div id='sidebar'>
            <ul id='side-menu'>
                <NavLink to='/app/inbox' >Inbox</NavLink>
                <li onClick={() => setMainContent('today')}>today</li>
                <li onClick={() => setMainContent('schedule')}>schedule</li>
            </ul>
            <div id='projects'>
                <div id='project-header'>
                    <h3>Projects</h3>
                    <AddProjectModal />
                </div>
                <div id='project-list'>
                    {Object.values(projects).map(project => {
                        return (
                            <NavLink to={`/app/projects/${project.id}`} className='project-item'>
                                <h4>{project.name}</h4>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
