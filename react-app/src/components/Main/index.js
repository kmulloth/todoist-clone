
import Inbox from '../Inbox';
import './Main.css'

function Main({mainContent}) {

    return (
        <>
            {/* {mainContent === 'inbox' && <Inbox />} */}
            {mainContent === 'today' && <h1>Today</h1>}
            {mainContent === 'schedule' && <h1>Schedule</h1>}
        </>
    )
}

export default Main;
