import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginUser from './components/LoginUser/LoginUser';
import AddNewDevice from './components/AddNewDevice/AddNewDevice';
import GetAllDevice from './components/GetAllDevice/GetAllDevice';
import RegisterUser from './components/RegisterUser/RegisterUser';
import ActivateSim from './components/ActivateSim/ActivateSim';
import DeactivateSim from './components/DeactivateSim/DeactivateSim';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import SimManagement from './components/SimManagement/SimManagement';
import KYCCompliance from './components/KYC/KYCCompliance';
import BillPayment from './components/Billing&Payment/BillPayment';
import { AccessTokenProvider, useAccessToken } from './components/context/AccessToken';
import axios from 'axios';
function App() {
  return (
    <Router>
      <AccessTokenProvider>
        <AppContent />
      </AccessTokenProvider>
    </Router>
  );
}

function AppContent() {
  const [enterIntoApp, setEnterIntoApp] = useState(0);
  const location = useLocation();
  const { accessToken } = useAccessToken();
  const isLoginOrRegisterPage = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/login';
  let isAuthenticated = localStorage.getItem('isAuthenticated');
  let isAdmin = localStorage.getItem('user') === "tanish@mrmprocom.com";
  const [simDetails, setSIMDetails] = useState([])
  const [allDeviceData, setAllDeviceData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const token =  localStorage.getItem('token');
        const respAllDevice = await axios.get("https://config.iot.mrmprocom.com/php-admin/getAllDevices.php");
        const respSIMDetails = await axios.get("https://openapi.airtel.in/iot/api/customer/details/basket/355661/sims", {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: "application/json",
            apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
            "Content-Type": "application/x-www-form-urlencoded",
            "iv-user": "developer.24004@mrmprocom.com",
            "customer-id": "24004"
          },
        })
        setAllDeviceData(respAllDevice.data);
        setSIMDetails(respSIMDetails.data.data.sims);
        
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
  
    }
    fetchData();
  }, [enterIntoApp])

  console.log("alldevicedata is :", allDeviceData);
  console.log("simdetails is ", simDetails);

  return (
    <>
      <div className='mainContainer'>
        {!isLoginOrRegisterPage && <Sidebar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />}
        <div className='layoutContainer'>
          {!isLoginOrRegisterPage && <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />}
          <div className='randomclass'>
            <Routes>
              <Route path='/dashboard' 
              element={isAdmin ? <Dashboard isAdmin={isAdmin} isAuthenticated={isAuthenticated}  accessToken={accessToken} /> : (isAuthenticated ? <Navigate to="/addnewdevice" replace /> : <Navigate to="/" replace />)} />
              <Route path='/' element={!(isAuthenticated) ? <LoginUser setEnterIntoApp={setEnterIntoApp} isAdmin={isAdmin} isAuthenticated={isAuthenticated} /> : (isAdmin ? <Navigate to="/dashboard" /> : <Navigate to="/addnewdevice" />)} />
              <Route path='/login' element={!(isAuthenticated) ? <LoginUser setEnterIntoApp={setEnterIntoApp} /> : (isAdmin ? <Navigate to="/dashboard" /> : <Navigate to="/addnewdevice" />)} />
              <Route path='/addnewdevice' element={(isAuthenticated || isAdmin) ? <AddNewDevice setEnterIntoApp={setEnterIntoApp}/> : <Navigate to="/" replace />} />
              <Route path='/alldevices' element={(isAdmin) ? <GetAllDevice setEnterIntoApp={setEnterIntoApp} allDeviceData={allDeviceData} /> : <Navigate to="/" replace />} />
              <Route path='/register' element={<RegisterUser isAdmin={isAdmin} isAuthenticated={isAuthenticated}  />} />
              <Route path='/activate-sim' element={isAdmin ? <ActivateSim accessToken={accessToken} /> : <Navigate to="/" replace />} />
              <Route path='/deactivate-sim' element={isAdmin ? <DeactivateSim accessToken={accessToken} /> : <Navigate to="/" replace />} />
              <Route path='/simmanagement' element={isAdmin ? <SimManagement simDetails={simDetails} accessToken={accessToken} isAdmin={isAdmin} isAuthenticated={isAuthenticated} /> : <Navigate to="/" replace />} />
              <Route path='/kyc' element={isAdmin ? <KYCCompliance setEnterIntoApp={setEnterIntoApp} simDetails={simDetails} allDeviceData={allDeviceData} accessToken={accessToken} isAdmin={isAdmin} isAuthenticated={isAuthenticated} /> : <Navigate to="/" replace />} />
              <Route path='/billing' element={isAdmin ? <BillPayment /> : <Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
