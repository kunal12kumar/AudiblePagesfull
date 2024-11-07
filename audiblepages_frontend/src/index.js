import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Fileupload from './pages/Fileupload';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allrouter=createBrowserRouter([
  {
    path:'/',
    element:<Home></Home>
  },
  {
    path:'/Login',
    element:<Login></Login>
  },
  {
    path:'/UploadSection',
    element:<Fileupload></Fileupload>
  },
  {
    path:'/SignUp',
    element:<SignUp></SignUp>
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={allrouter}></RouterProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
