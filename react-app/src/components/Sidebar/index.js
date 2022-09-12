import AddProjectModal from '../AddProjectModal/';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { NavLink, useHistory } from 'react-router-dom';
import {getProjects} from '../../store/projects';
import './Sidebar.css'

function Sidebar({setMainContent, showSidebar}) {

    const currentUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects);
    const userProjects = Object.values(projects).filter(project => project.user_id === currentUser?.id);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => dispatch(getProjects()), [])

    if (!currentUser) history.push('/')

    return userProjects  &&(
        <div id={`sidebar-${showSidebar ? 'open'  : 'close'}`}>
            {showSidebar && <>
            <ul id='side-menu'>
                <li><NavLink to='/app/inbox'>Inbox</NavLink></li>
                <li><NavLink to='/app/today'>Today</NavLink></li>
                {/* <li onClick={() => setMainContent('schedule')}>schedule</li> */}
            </ul>
            <div id='projects'>
                <div id='project-header'>
                    <h3>Projects</h3>
                    <AddProjectModal />
                </div>
                <div id='project-list'>
                    {userProjects.map(project => {
                        return (
                            <NavLink to={`/app/projects/${project.id}`} className='project-item'>
                                <span className='bubble' style={{color: project.color}}>&bull;</span>
                                <h4>{project.name}</h4>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <div id='archive'>
                <NavLink to='/app/archive'>Archive</NavLink>
            </div>
            <div id='dev-links'>
                <a
					href="https://github.com/kmulloth"
					target="_blank"
					className="about-github"
				>
					<i class="about-github fa-brands fa-github fa-xl"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/krishna-mulloth-461ab9230/"
					target="_blank"
					className="about-linkedin"
				>
					<i class="fa-brands fa-linkedin fa-xl"></i>
				</a>
            </div>
            </>}
        </div>
    )
}

export default Sidebar;
