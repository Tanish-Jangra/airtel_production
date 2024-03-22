import React from 'react'
import './ActivateSim.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ActivateSim = ({ SimResp, setIsActivateBtnClicked }) => {

  const handleCancel = () => {
    setIsActivateBtnClicked(false);
  }
  const token = localStorage.getItem('token');
  const handleConfirm = async () => {
    try {
      const activateSimResp = await axios.post("https://openapi.airtel.in/iot/api/om/job/sim/voluntary/resume", {
        headers: {
          "accept": "application/json",
          "apikey": "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
          "iv-user": "developer.24004@mrmprocom.com",
          "Authorization": 'Bearer ' + token,
          "customer-id": "24004",
          "Content-Type": "application/json"
        },
        body: {
          "simDOList": [
  
            {
              "euiccId": SimResp.simNo,
              "mobileNO": SimResp.mobileNO
            }
  
          ]
        }
      });
      console.log("activateSimResp", activateSimResp);
      toast.success("Sim Activated successfully...");
    } catch (error) {
        console.log("Error in Activating sim....", error);
        toast.error(`${error.message}`);
    }
  }

  return (
    <div className='ActivateSimContainer'>
      <div className='ActivateSimPopup'>
        <div className='ActivateSimWarning'>Are You Sure, you want to activate SIM?</div>
        <div className='ActivatePopFormBtns'>
          <div className='confirmActivateSim' onClick={handleConfirm}>Confirm</div>
          <div className='cancelActivateSim' onClick={handleCancel}>Cancel</div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ActivateSim