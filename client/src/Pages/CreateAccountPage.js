import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function CreateAccountPage() {
  const [email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [error, setError]=useState('');

  const navigate=useNavigate();

  const createAccount=async()=>{
    try{
      if(password!= confirmPassword){
        setError('password and confirm password do not match')
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch (e){
      setError(e.message);
    }
  }

  return (
    <>
      <h1>Create Account</h1>
      <label>
        Email:
        <input
          placeholder="Enter your email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Re-enter your password:
        <input
          placeholder="Enter your password again"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button onClick={createAccount}>Signup</button>
      <Link to="/login">Already Have an account? log in here</Link>
    </>
  );
}

export default CreateAccountPage
