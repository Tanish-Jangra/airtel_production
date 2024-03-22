import React, { useState } from 'react'
import './AddNewDevice.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useTriggerReload from '../../context/TriggerContext';

const AddNewDevice = () => {
    const { setTrigger } = useTriggerReload()

    const url = "https://config.iot.mrmprocom.com/php-admin/addDevices.php";

    const [formData, setFormData] = useState({
        deviceSerialNo: '',
        deviceModel: '',
        deviceIMEI: '',
        SIMNo: '',
        deviceQRCode: '',
        clientName: '',
        clientAddress: '',
    });
    const [toastDisplayed, setToastDisplayed] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here

        if (formData.deviceSerialNo.length != 11) {
            alert("Device Serial Number should be of 11 length...");
            return;
        }
        else if (formData.deviceQRCode.length != 10) {
            alert('QR Code should be of length 10...');
            return;
        }
        else if (formData.deviceIMEI.length != 15) {
            alert('IMEI Number should be of 15 length...');
            return;
        }
        else if (formData.SIMNo.length != 19) {
            alert('SIM Number should be of 19 length...');
            return;
        }
        console.log("Formdata: ", formData);
        axios.post(url, formData).then((res) => {
            console.log("res: ", res.data.success);
            if (res.data.success === 1) toast.success(`${res.data.message}`, { autoClose: 1000 });
            else {
                toast.error(`${res.data.message}`, { autoClose: 1000 });
            }
            setToastDisplayed(true);
            setFormData({
                deviceSerialNo: '',
                deviceModel: '',
                deviceIMEI: '',
                SIMNo: '',
                deviceQRCode: '',
                clientName: '',
                clientAddress: '',
            });
            setTrigger(prev => !prev);
            console.log("formdata after submission..... is:", formData);

        }).catch((error) => {
            console.log("Error: ", error);
        })

    };
    return (
        <div className='AddDeviceFormContainer'>
            <div className='FormHeader'>
                <h3>ADD DEVICE</h3>
            </div>
            <form onSubmit={handleSubmit} className='formFields'>
                <label className='field'>
                    * Device Serial Number:
                    <input className='inputField' type="text" name="deviceSerialNo" value={formData.deviceSerialNo} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * Device QR Code:
                    <input className='inputField' type="text" name="deviceQRCode" value={formData.deviceQRCode} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * Device IMEI:
                    <input className='inputField' type="text" name="deviceIMEI" value={formData.deviceIMEI} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * SIM No.:
                    <input className='inputField' type="text" name="SIMNo" value={formData.SIMNo} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * Device Model:
                    <input className='inputField' type="text" name="deviceModel" value={formData.deviceModel} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * Client Name:
                    <input className='inputField' type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
                </label>
                <label className='field'>
                    * Client Address:
                    <input className='inputField' type="text" name="clientAddress" value={formData.clientAddress} onChange={handleChange} required />
                </label>
            </form>
            <button className='formSubmit' type='button' onClick={handleSubmit} >Submit</button>
            <ToastContainer />
        </div>
        // </div>
    )
}

export default AddNewDevice