import {useState, useEffect} from 'react';
import Sidebar from '../Sidebar';
import Inbox from '../Inbox';
import './Main.css'

function Main({showSidebar}) {

    const [mainContent,setMainContent] = useState('today')
    return (
        <div id='main'>
        {showSidebar  && <Sidebar setMainContent={setMainContent}/>}
        {mainContent === 'inbox' && <Inbox />}
        {mainContent === 'today' && <h1>Today</h1>}
        {mainContent === 'schedule' && <h1>Schedule</h1>}
        </div>
    )
}

export default Main;
