import {useState, useEffect} from 'react';
import Sidebar from '../Sidebar';
import './Main.css'

function Main({showSidebar}) {

    const [mainContent,setMainContent] = useState('today')
    return (
        <>
        {showSidebar  && <Sidebar setMainContent={setMainContent}/>}
        {mainContent === 'inbox' && <h1>Inbox</h1>}
        {mainContent === 'today' && <h1>Today</h1>}
        {mainContent === 'schedule' && <h1>Schedule</h1>}
        </>
    )
}

export default Main;
