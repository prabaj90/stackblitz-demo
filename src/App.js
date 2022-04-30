import React, { useState } from 'react';
import customAPI from './Interceptor';
import './style.css';

export default function App() {
  const [token, updateToken] = useState();
  const [welMsg, updateWelMsg] = useState();
  const handleGetToken = () => {
    customAPI
      .post('/login', {
        email: 'suresh@gmail.com',
        password: '123456789',
      })
      .then((res) => {
        console.log(res);
        updateToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => console.log('', err));
  };

  const handleWelcome = () => {
    customAPI
      .post('/welcome')
      .then((res) => updateWelMsg(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>{token}</p>
      <p>{welMsg}</p>
      <button onClick={() => handleGetToken()}>Get Token</button>
      <button onClick={() => handleWelcome()}>Welcome</button>
      <button onClick={() => localStorage.removeItem('token')}>
        Clear Token
      </button>
    </div>
  );
}
