
function Sidebar({setMainContent}) {
    return (
        <div id='sidebar'>
            <ul id='side-menu'>
                <li onClick={() => setMainContent('inbox')}>inbox</li>
                <li onClick={() => setMainContent('today')}>today</li>
                <li onClick={() => setMainContent('schedule')}>schedule</li>
            </ul>
            <div id='projects'>
                Projects
                <div id='ADD PROJECT MODAL GOES HERE'><i className='fa fa-plus' /></div>
            </div>
        </div>
    )
}

export default Sidebar;
