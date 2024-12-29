import React from 'react'
import MainLayout from './layouts/MainLayout';
import {Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';


import GroupPage from './pages/GroupPage';



const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element= {<HomePage />} />
        <Route path='*' element= {<NotFoundPage />} />
        <Route path="/groups/:id" element={<GroupPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router}/>
};

export default App