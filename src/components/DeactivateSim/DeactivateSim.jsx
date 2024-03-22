import React from 'react'
import './DeactivateSim.css';
const DeactivateSim = ({setIsDeactivateBtnClicked}) => {
  
  const handleCancel = ()=>{
    setIsDeactivateBtnClicked(false);
  }

  const handleConfirm = ()=>{
    console.log("confirmed");
  }

  return (
    <div className='DeactivateSimContainer'>
        <div className='DeactivateSimPopup'>
          <div className='DeactivateSimWarning'>Are You Sure, you want to Deactivate SIM?</div>
          <div className='DeactivatePopFormBtns'>
            <div className='confirmDeactivateSim' onClick={handleConfirm}>Confirm</div>
            <div className='cancelDeactivateSim' onClick={handleCancel}>Cancel</div>
          </div>
        </div>
    </div>
  )
}

export default DeactivateSim;