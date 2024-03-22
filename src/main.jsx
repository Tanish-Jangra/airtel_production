import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import LoginUser from './components/LoginUser/LoginUser.jsx';
import RegisterUser from './components/RegisterUser/RegisterUser.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AddNewDevice from './components/AddNewDevice/AddNewDevice.jsx';
import GetAllDevice from './components/GetAllDevice/GetAllDevice.jsx';
import SimManagement from './components/SimManagement/SimManagement.jsx';
import KYCCompliance from './components/KYC/KYCCompliance.jsx';
import BillPayment from './components/Billing&Payment/BillPayment.jsx';
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path : "/",
    element : <LoginUser />
  },
  {
    path : "/register",
    element : <RegisterUser />
  },
  {
    path : "/app",
    element : <App />,
    children : [
      {
        path : "dashboard",
        element : <Dashboard />
      },
      {
        path : "addnewdevice",
        element : <AddNewDevice />,
      },
      {
        path : "alldevices",
        element : <GetAllDevice />,
      },
      {
        path : "simmanagement",
        element : <SimManagement />,
      },
      {
        path : "kyc",
        element : <KYCCompliance />,
      },{
        path : 'billing',
        element : <BillPayment />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
