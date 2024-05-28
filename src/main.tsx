import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Converter from "./components/Convert/Converter.tsx";
import ErrorPage from "./utils/error-page.tsx";
import CurrentCourse from "./components/CurrentCourse/CurrentCourse.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Converter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/current-course",
    element: <CurrentCourse />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
