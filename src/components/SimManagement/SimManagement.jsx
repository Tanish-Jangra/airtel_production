// SimManagement.jsx
import React, { useState } from 'react';
import './SimManagement.css';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import ActivateSim from '../ActivateSim/ActivateSim';
import DeactivateSim from '../DeactivateSim/DeactivateSim';
import { useNavigate } from 'react-router-dom';
import SuspendSim from '../SuspendSim/SuspendSim';
const SimManagement = () => {

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActivateBtnClicked, setIsActivateBtnClicked] = useState(false);
  const [isDeactivateBtnClicked, setIsDeactivateBtnClicked] = useState(false);
  const [SimResp, setSimResp] = useState([]);
  const [kycDetails, setKycDetails] = useState(null);
  const [isSafeCustodyBtnClicked, setIsSafeCustodyBtnClicked] = useState(false)
  let SiMNo = null;
  let activeSimDate = null;
  function getNextYearDate(activationDate) {
    const dateParts = activationDate.split(/[- :]/);
    const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    dateObject.setFullYear(dateObject.getFullYear() + 1);

    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const activeDate = (activationDate) => {
    var dateParts = activationDate.split(" ")[0].split("-");
    var year = dateParts[2];
    var month = ('0' + dateParts[1]).slice(-2); // Ensures two digits for month
    var day = ('0' + dateParts[0]).slice(-2);   // Ensures two digits for day

    // Format the date as dd/mm/yyyy
    var formattedDate = day + "/" + month + "/" + year;
    activeSimDate = formattedDate;
  }

  const currDateFunction = () => {
    const currentDate = new Date();
    const day = ('0' + currentDate.getDate()).slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 as month starts from 0
    const year = currentDate.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
  }

  const handleSafeCustodySim = async () => {
    setIsSafeCustodyBtnClicked(true);
  }


  const fetchData = async () => {
    setIsLoading(true);
    const url = "https://config.iot.mrmprocom.com/php-admin/getDevices.php";
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${url}?deviceSerialNo=${inputValue}`);

      setDeviceData(response.data);
      SiMNo = response.data.data.SIMNo;
      const token = localStorage.getItem('token');

      const SIMNoResponse = await axios.get(`https://openapi.airtel.in/iot/api/customer/details/basket/355661/sims?filterValue=${SiMNo}&simFilterType=SIM_NO`, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: "application/json",
          apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
          "Content-Type": "application/x-www-form-urlencoded",
          "iv-user": "developer.24004@mrmprocom.com",
          "customer-id": "24004"
        }
      })
      console.log("SimResponseis: ", SIMNoResponse.data.data.sims);
      setSimResp(SIMNoResponse.data.data.sims[0]);

      activeDate(SIMNoResponse.data.data.sims[0].activationDate);
      let currDate = currDateFunction();
      let prevDate = "01/01/2020";
      const kycResponse = await axios.get(`https://openapi.airtel.in/iot/api/customer/kyc/sim/details?activationDate=${activeSimDate}-${currDate}&basketId=355661&complianceDate=${prevDate}-${currDate}&msisdn=${SIMNoResponse.data.data.sims[0].mobileNo}&pageNo=1&pageSize=25&simNo=${SIMNoResponse.data.data.sims[0].simNo}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
          Accept: 'application/json',
          "iv-user": "developer.24004@mrmprocom.com",
          "customer-id": "24004"
        }
      })
      setKycDetails(kycResponse.data.data.simKycList[0]);
      console.log("kyc response isssssssssssss..................", kycResponse.data.data.simKycList[0]);

      setIsActive(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response.status === 401) {
        console.log("Unauthorized:");
        isAdmin = false;
        isAuthenticated = false;
        navigate("/", { replace: true })
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateForm = () => {
    setIsActivateBtnClicked(true);
  }

  const handleDeactivateForm = () => {
    setIsDeactivateBtnClicked(true);
  }

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.getTime();
  }

  const calculateElapsedTime = (activationDate) => {
    var dateParts = activationDate.split(" ");
    var datePart = dateParts[0].split("-");
    var timePart = dateParts[1].split(":");
    var meridian = dateParts[2];

    var year = parseInt(datePart[2]);
    var month = parseInt(datePart[1]) - 1; // Months are zero-based in JavaScript
    var day = parseInt(datePart[0]);
    var hours = parseInt(timePart[0]);
    var minutes = parseInt(timePart[1]);
    var seconds = parseInt(timePart[2]);

    if (meridian === "PM" && hours < 12) {
      hours += 12;
    }
    const currentDateTime = getCurrentDate();
    var prevDate = new Date(year, month, day, hours, minutes, seconds);
    const elapsedTime = currentDateTime - prevDate.getTime();
    return elapsedTime;
  }
  const calculatePastDivWidth = (activationDate) => {
    const elapsedTime = calculateElapsedTime(activationDate);
    const totalMillisecondsInYear = 365 * 24 * 60 * 60 * 1000;
    const pastDivWidth = (elapsedTime / totalMillisecondsInYear) * 100;
    return pastDivWidth;
  }

  const handleSearch = () => {
    if (!selectedOption) {
      alert("Please select an option before searching.");
      return;
    }

    if (selectedOption === 'deviceSerialNo' && inputValue.length !== 11) {
      alert("Serial Number length must be 11.");
      return;
    }

    if (selectedOption === 'deviceQRCode' && inputValue.length !== 10) {
      alert("QR Code length should be 10.");
      return;
    }
    else {
      fetchData();
    }
  };

  console.log('Sim Response is ->>>>>>>>>>>>>>>>>>', SimResp[0]);

  return (
    <div className='simManagementContainer'>
      {/* Search Input Fields */}
      <div className='simManagementTopBar'>
        <div className='inputFields'>
          <input
            type="text"
            name="simInputField"
            id="simInputField"
            placeholder='Enter QR code or Serial No....'
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className='checkBox'>
            <label htmlFor="deviceSerialNo">Serial No.</label>
            <input
              type="checkbox"
              name="deviceSerialNo"
              id="checkfield"
              checked={selectedOption === 'deviceSerialNo'}
              onChange={() => handleCheckboxChange('deviceSerialNo')}
            />
          </div>
          <div className='checkBox'>
            <label htmlFor="deviceQRCode">QR Code</label>
            <input
              type="checkbox"
              name="deviceQRCode"
              id="checkfield"
              checked={selectedOption === 'deviceQRCode'}
              onChange={() => handleCheckboxChange('deviceQRCode')}
            />
          </div>
          <div className='searchButton' onClick={handleSearch}>Search</div>
        </div>
      </div>
      {/* <hr className='horizontalRow'/> */}
      {/* Show Device Details */}
      {isLoading ? <div className="SimManagementloader"><TailSpin
        visible={true}
        height="80"
        width="80"
        color="#081242"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      /></div>
        :
        ""
      }
      {isActive ?

        (<div className="deviceDetailsContainer" >
          {/* <div className='ContainerHead'>
            <h2>Device Details</h2>
          </div> */}
          <div className='deviceInfoPlusButtons'>
            <div className='deviceAllInfo'>
              <div className='deviceInfo'>
                <p className='keyHeader'>Name: </p>
                <p className='valueHeader'>{deviceData.data.clientName}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>Address: </p>
                <p className='valueHeader'>{deviceData.data.clientAddress}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>Device Model: </p>
                <p className='valueHeader'>{deviceData.data.deviceModel}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>QR Code: </p>
                <p className='valueHeader'>{deviceData.data.deviceQRCode}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>Serial No: </p>
                <p className='valueHeader'>{deviceData.data.deviceSerialNo}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>IMEI Number: </p>
                <p className='valueHeader'>{deviceData.data.deviceIMEI}</p>
              </div>
              <div className='deviceInfo'>
                <p className='keyHeader'>Sim No.: </p>
                <p className='valueHeader'>{deviceData.data.SIMNo}</p>
              </div>
              {
                <>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>Status: </p>
                    {/* <p className={item.simStatus==="ACTIVE" ? "valueHeader simStatusActive":"valueHeader simStatusDeactive"} >{item.simStatus}</p> */}
                    <p className={SimResp.status === "ACTIVE" ? "valueHeader simStatusActive" : "valueHeader simStatusDeactive"} >{SimResp.status}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>activationDate: </p>
                    <p className='valueHeader'>{SimResp.activationDate.split(" ")[0]}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>complianceDate: </p>
                    <p className='valueHeader'>{kycDetails.complianceDate.split(" ")[0]}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>IMSI: </p>
                    <p className='valueHeader'>{SimResp.imsi}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>KYC Status: </p>
                    <p className='valueHeader'>{kycDetails.status}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>Data Units: </p>
                    <p className='valueHeader'>{SimResp.dataUnits}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>kycCompletionDate: </p>
                    <p className='valueHeader'>{kycDetails.kycCompletionDate.split(" ")[0]}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>Mobile No. : </p>
                    <p className='valueHeader'>{SimResp.mobileNo}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>PlanCode : </p>
                    <p className='valueHeader'>{SimResp.planCode}</p>
                  </div>
                  <div className='deviceInfo'>
                    <p className='keyHeader'>PlanName : </p>
                    <p className='valueHeader'>{SimResp.planName}</p>
                  </div>
                  <div className='dateDiv' >
                    <p >{SimResp.activationDate.split(" ")[0]}</p>
                    <div className='divWidth'>
                      <div className='past' style={{ width: `${calculatePastDivWidth(SimResp.activationDate)}%` }}></div>
                      <div className='future' style={{ width: `${100 - calculatePastDivWidth(SimResp.activationDate)}%` }}></div>
                    </div>
                    <p > {getNextYearDate(SimResp.activationDate)}</p>
                  </div>
                </>
                // )
              }
            </div>
            {/* {
              <SimDetails SiMNo={SiMNo} />
            } */}
            <div className='setDeviceStatus'>
              {
                SimResp.status === 'ACTIVE' ? (
                  <div className='suspendBtn' onClick={handleSafeCustodySim}>Safe Custody</div>
                ) : (<div className='activateBtn' onClick={handleActivateForm}>Activate</div>)
              }
              <div className='deactivateBtn' onClick={handleDeactivateForm}>Deactivate</div>
            </div></div>
        </div>)

        : ""
      }
      {
        isActivateBtnClicked ? <ActivateSim SimResp={SimResp} setIsActivateBtnClicked={setIsActivateBtnClicked} /> : ""
      }
      {
        isDeactivateBtnClicked ? <DeactivateSim setIsDeactivateBtnClicked={setIsDeactivateBtnClicked} /> : ""
      }
      {
        isSafeCustodyBtnClicked ? <SuspendSim SimResp={SimResp} setIsSafeCustodyBtnClicked={setIsSafeCustodyBtnClicked} /> : ""
      }
    </div>
  );
};

export default SimManagement;
