import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


function LoginPage() {
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[error, setError]=useState('');

    const navigate=useNavigate();


    const logIn=async ()=>{
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e){
            setError(e.message);
        }
        
    }


  return (
    <>
      <h1>Log In</h1>

      <label>
        Email:
        <input
          type="email"
          placeholder="Enter your email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Enter the password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <br/>
      <button onClick={logIn}>Log In</button>
      <Link to="/create-account">Don't have an account? Create one here</Link>
    </>
  );
}

export default LoginPage
