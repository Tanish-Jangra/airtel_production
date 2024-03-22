import React, { useEffect } from 'react'
import './KYCDetailsForm.css'
const KYCDetailsForm = ({ kycDetail, setShowKycDetails }) => {

    const handleCloseOrCancelKYCDetails = () => {
        setShowKycDetails(false);
    }
    console.log("Kyc details are: ", kycDetail);
    return (
        <div>
            <div className='updateKYCCont'>
                <div className='updateKycFormHeader'>
                    <div className='formHeader'>
                        <p>KYC Details</p>
                        <p className='crossBtn' onClick={handleCloseOrCancelKYCDetails}>X</p>
                    </div>
                    <div className='formContentTop'>
                        <div className='topContent'>
                            <p>SIM Number:</p>
                            <p>{kycDetail.SIMNo}</p>
                        </div>
                        <div className='topContent'>
                            <p>MSISDN:</p>
                            <p>{kycDetail.mobileNo}</p>
                        </div>
                        {/* <div className='topContent'>
                            <p>IMSI:</p>
                            <p>{kycDetail.imsi}</p>
                        </div> */}
                    </div>

                    <div className='formContentMain'>
                        <div className="mainContentItem">
                            <p>Type of Device/Machine:</p>
                            <input type="text" className='updateKycFormInput kycdetail' value="Industrial Automation" />
                        </div>
                        <div className="mainContentItem">
                            <p>IMEI / ESN</p>
                            <input type="text" className='updateKycFormInput kycdetail' value={kycDetail.deviceIMEI} />
                        </div>
                        <div className="mainContentItem">
                            <p>Device/Machine Make & Model:</p>
                            <input type="text" className='updateKycFormInput kycdetail' value={kycDetail.deviceModel} />
                        </div>
                        <div className="mainContentItem">
                            <p>Registration No. of Device/Machine:</p>
                            <input type="text" className='updateKycFormInput kycdetail' value={kycDetail.deviceSerialNo} />
                        </div>
                        <div className="mainContentItem">
                            <p>SIM Physical Custodian's Name:</p>
                            <input type="text" className='updateKycFormInput kycdetail' value={kycDetail.clientName} />
                        </div>
                        <div className="mainContentItem">
                            <p>SIM Physical Custodian's Address</p>
                            <input type="text" className='updateKycFormInput kycdetail' value={kycDetail.clientAddress} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default KYCDetailsForm