import React, { useState } from 'react';

export const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      props.loginHandler(username, password);
    }
  
    const onChangeUsername = (event) => {
      setUsername(event.target.value);
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    }

    const Notif = (props) => {
      return <div className={`notif ${props.style}`}>{props.message}</div>
    }
  
  
    return (
      <div id="login-page">
        <div id="login">
          <h1 id="logo"><i className='bx bxs-bank' ></i> Fiap Bank</h1>
          <Notif message={props.notif.message} style={props.notif.style} />
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="username">Usuário</label>
            <input id="username" autoComplete="off" onChange={onChangeUsername}  value={username} type="text" />
            <label htmlFor="password">Senha</label>
            <input id="password" autoComplete="off" onChange={onChangePassword} value={password} type="password" />
            <button type="submit" className="btn">Entrar</button>
          </form>
        </div>
      </div>
    )
}
