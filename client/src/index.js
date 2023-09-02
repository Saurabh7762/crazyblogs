import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8tbBFqr4ZFmgryGsUzNfudUScGfutJyc",
  authDomain: "my-react-blog-baa06.firebaseapp.com",
  projectId: "my-react-blog-baa06",
  storageBucket: "my-react-blog-baa06.appspot.com",
  messagingSenderId: "1077779247628",
  appId: "1:1077779247628:web:62e23dd08673077aa07429"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
