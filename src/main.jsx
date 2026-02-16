import './index.css'
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Dashboard from './Component/pages/Dashboard/Dashboard';
import Patients from './Component/pages/Patients/Patients';
import Schedule from './Component/pages/schedule/schedule';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
        <Route index element={<Dashboard/>} />
        <Route path='Patients' element={<Patients/>} />
        <Route path='schedule' element={<Schedule/>} />
    </Route>
      
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
