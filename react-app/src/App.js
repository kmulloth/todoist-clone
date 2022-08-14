import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Splash from './components/Splash';
import Inbox from './components/Inbox';
import Today from './components/Today';
import Project from './components/EachProject';
import Archive from './components/Archive';

function App() {
  const tasks = useSelector(state => state.tasks)
  const currentUser = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true)
  const [mainContent,setMainContent] = useState('today')
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      {currentUser && <NavBar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>}
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <div id='main'>
        <Route path='/app' >
            {showSidebar  && <Sidebar setMainContent={setMainContent}/>}
        </Route>
        <Route path='/app/projects/:projectId'>
            <Project />
        </Route>
        <Route path='/app/inbox'>
          <Inbox />
        </Route>
        <Route path='/app/today'>
          <Today />
        </Route>
        <Route path='/app/archive'>
          <Archive />
        </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
