import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Main from './components/Main';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const tasks = useSelector(state => state.tasks)
  const currentUser = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true)
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
          {/* <button onClick={() => console.log(tasks)} >PRINT TASKS</button> */}
        </Route>
        <Route path='/app'>
          <Main showSidebar={showSidebar}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
