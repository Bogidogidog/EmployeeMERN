import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";

import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EmployeeSearch from "./Pages/EmployeeSearch";
import EmployeeMissing from "./Pages/EmployeeMissing";

import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";

import CompanyCreator from "./Pages/CompanyCreator";


import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeSearch />,
      },
      {
        path: "/missing",
        element: <EmployeeMissing />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/equipment/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/equipment/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/company/create",
        element: <CompanyCreator/>,
      }

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <RouterProvider router={router} />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

