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
import Inbox from './components/Inbox';
import Project from './components/EachProject';

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
      <NavBar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      <Switch>
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
        <Route path='/' exact={true} >

        </Route>
        <div id='main'>
        <Route path='/app' >
            {showSidebar  && <Sidebar setMainContent={setMainContent}/>}
            {/* <Main mainContent={mainContent}/> */}
        </Route>
        <Route path='/app/projects/:projectId'>
            <Project />
        </Route>
        <Route path='/app/inbox'>
          <Inbox />
        </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
