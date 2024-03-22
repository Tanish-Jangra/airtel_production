import React from 'react'
import axios from 'axios'
import './SuspendSim.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SuspendSim = ({ SimResp, setIsSafeCustodyBtnClicked }) => {

  const handleCancel = () => {
    setIsSafeCustodyBtnClicked(false);
  }
  const token = localStorage.getItem('token');
  const handleConfirm = async () => {
    try {
      const suspendSimResp = await axios.post("https://openapi.airtel.in/iot/api/om/job/sim/voluntary/suspend", {
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
      console.log("suspendSimResp", suspendSimResp);
      toast.success("Sim suspended successfully", { autoClose: 1000 });
    } catch (error) {
      console.log("Error occured in suspending sim", error);
      toast.error(`${error.message}`, { autoClose: 1000 });
    }

  }

  return (
    <div className='suspendSimContainer'>
      <div className='suspendSimPopup'>
        <div className='suspendSimWarning'>Are You Sure, you want to suspend SIM?</div>
        <div className='suspendPopFormBtns'>
          <div className='confirmSuspendSim' onClick={handleConfirm}>Confirm</div>
          <div className='cancelSuspendSim' onClick={handleCancel}>Cancel</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SuspendSim