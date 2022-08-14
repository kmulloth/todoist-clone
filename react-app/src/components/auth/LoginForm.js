import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const errorConverter = (err) => {
    if (err === 'Email is not found.') {
      return 'Email is incorrect.';
    } else if (err === 'Email is required.') {
      return 'Email/Username is required.'
    } else {
      return err
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/app/today' />;
  }

  return (
    <div className='login_form_div'>
      <div id='splash-content'>
        <form onSubmit={onLogin} className='login_form'>
          { errors.length > 0 && <div className='login_form_errors'>
            {errors.map((error, ind) => (
              <div key={ind} className='login_form_error'>{errorConverter(error)}</div>
            ))}
          </div> }
          <div className='login_form_divs'>
            <div className='sf_label'><label htmlFor='email'>Email</label></div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login_form_divs'>
            <div className='sf_label'><label htmlFor='email'>Password</label></div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit' className='login_form_divs sf_submit'>Login</button>
          <NavLink to='/' className='login_form_divs sf_cancel'>Cancel</NavLink>
        </form>
        <div id='splash-image-container'>
          <img src='https://www.usnews.com/object/image/00000142-9262-d33c-abc6-ff770ec60006/38205Checklist.jpg?update-time=1481554088624&size=responsive970' alt='background-img' />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
