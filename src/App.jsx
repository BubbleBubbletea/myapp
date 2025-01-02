import React from 'react'
import MainLayout from './layouts/MainLayout';
import {Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';


import GroupPage from './pages/GroupPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element= {<HomePage />} />
        <Route path='*' element= {<NotFoundPage />} />
        <Route path="/groups/:id" element={<GroupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router}/>
};

export default App