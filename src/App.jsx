import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { AllDeviceDataProvider } from './context/DevicesContext';
import { AccessTokenProvider, useAccessToken } from './context/AccessToken';
import axios from 'axios';
import { TriggerProvider } from './context/TriggerContext';



function App() {
  const [all_devices, setAllDeviceData] = useState([]);
  const [trigger, setTrigger] = useState(false)


  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const respAllDevice = await axios.get("https://config.iot.mrmprocom.com/php-admin/getAllDevices.php");

        setAllDeviceData(respAllDevice.data.data);

      } catch (error) {
        console.log("Error in fetching data: ", error);
      }

    }
    fetchData();
  }, [trigger])

  console.log("alldevicedata is :", all_devices);

  return (
    <AccessTokenProvider>
      <AllDeviceDataProvider value={{ all_devices, setAllDeviceData }}>
        <TriggerProvider value={{ trigger, setTrigger }}>
          <Layout />
        </TriggerProvider>
      </AllDeviceDataProvider>
    </AccessTokenProvider>
  );
}

export default App;
