import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const KYCForm = ({setEnterIntoApp, selectedDevice, setUpdateKyc }) => {
    console.log("selected device is : .................", selectedDevice);
    const [selectedOption, setSelectedOption] = useState('');
    const [additionalInputVisible, setAdditionalInputVisible] = useState(false);
    const [toastDisplayed, setToastDisplayed] = useState(false);
    const [formData, setFormData] = useState({
        "mobileNo": selectedDevice.mobileNo,
        "deviceType": 'INDUSTRIAL_AUTOMATION',
        "deviceImei": selectedDevice.deviceIMEI,
        "deviceModel": selectedDevice.deviceModel,
        "registrationNo": selectedDevice.deviceModel,
        "custodianName": selectedDevice.clientName,
        "custodianAddress": selectedDevice.clientAddress
    });
    const handleOptionChange = (option) => {
        const label = option === "option1" ? "Industrial Automation" : ""; // Map option value to label
        setSelectedOption(label);
        setAdditionalInputVisible(true);
        setFormData({
            ...formData,
            // selectedOption: label // Store the label in formData
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    async function submitData() {
        const data = JSON.stringify(formData);
        console.log("data is ", data);
        try {
            const token = localStorage.getItem('token');
            console.log("token is ", token);
            const submitformData = await axios.post("https://openapi.airtel.in/iot/api/customer/kyc/sim/update", data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'apikey': 'hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4',
                    'iv-user': 'developer.24004@mrmprocom.com',
                    'customer-id': '24004',
                    'Content-Type': 'application/json'
                }
            });

            console.log('submit data is :', submitformData);
            const submitInDatabase = await axios.post("https://config.iot.mrmprocom.com/php-admin/editDevices.php", {
                "deviceSerialNo": selectedDevice.deviceSerialNo,
                "deviceModel": formData.deviceModel,
                "deviceQRCode": selectedDevice.deviceQRCode,
                "deviceIMEI": formData.deviceImei,
                "SIMNo": selectedDevice.SIMNo,
                "clientName": formData.custodianName,
                "clientAddress": formData.custodianAddress, 
                "id":selectedDevice.id
            });

            console.log("submitInDataBase", submitInDatabase);
            toast.success("KYC Updated successfully...", { autoClose: 1000 })
            setEnterIntoApp(prevState=>prevState+1)
            setToastDisplayed(true);
            setTimeout(() => {
                setUpdateKyc(false);
            }, 2000);
        } catch (error) {
            console.log("Error in fetchind data", error);
            toast.error(`${error.message}`, {autoClose: 1000});
        }
    }
    const handleSubmit = () => {
        console.log("form data is ", formData);

        submitData();
        // Here update kyc will be called.......
    };

    const closeUpdateKyc = () => {
        setUpdateKyc(false);
    };

    return (
        <div>
            <div className='updateKYCCont'>
                <div className='updateKycFormHeader'>
                    <div className='formHeader'>
                        <p>Update KYC Details</p>
                        <p className='crossBtn' onClick={closeUpdateKyc}>X</p>
                    </div>
                    <div className='formContentTop'>
                        <div className='topContent'>
                            <p>SIM Number:</p>
                            <p>{selectedDevice.SIMNo}</p>
                        </div>
                        <div className='topContent'>
                            <p>MSISDN:</p>
                            <p>{selectedDevice.mobileNo}</p>
                        </div>
                    </div>

                    <div className='formContentMain'>
                        <div className="mainContentItem">
                            <p>Type of Device/Machine:</p>
                            <select className='updateKycFormInput' onChange={(e) => handleOptionChange(e.target.value)}>
                                <option value="">Please Select Device Type</option>
                                <option value="option1">Industrial Automation</option>
                            </select>
                        </div>
                        <div className="mainContentItem">
                            <p>IMEI / ESN</p>
                            <input type="text" className='updateKycFormInput' name="deviceImei" value={formData.deviceImei} onChange={handleChange} />
                        </div>
                        <div className="mainContentItem">
                            <p>Device/Machine Make & Model:</p>
                            <input type="text" className='updateKycFormInput' name="deviceModel" value={formData.deviceModel} onChange={handleChange} />
                        </div>
                        <div className="mainContentItem">
                            <p>Registration No. of Device/Machine:</p>
                            <input type="text" className='updateKycFormInput' name="registrationNo" value={formData.registrationNo} onChange={handleChange} />
                        </div>
                        <div className="mainContentItem">
                            <p>SIM Physical Custodian's Name:</p>
                            <input type="text" className='updateKycFormInput' name="custodianName" value={formData.custodianName} onChange={handleChange} />
                        </div>
                        <div className="mainContentItem">
                            <p>SIM Physical Custodian's Address</p>
                            <input type="text" className='updateKycFormInput' name="custodianAddress" value={formData.custodianAddress} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='formContentBottom'>
                        <div className='cancelBtn' onClick={closeUpdateKyc}>Cancel</div>
                        <div className='saveBtn' onClick={handleSubmit}>Save</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default KYCForm;
