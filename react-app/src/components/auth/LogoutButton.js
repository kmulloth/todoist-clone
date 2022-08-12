import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({setProfileMenu}) => {

  const history = useHistory();
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    setProfileMenu(false)
    history.push('/');
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
