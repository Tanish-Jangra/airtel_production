import React, { useEffect, useState } from 'react';
import './KYCCompliance.css';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import KYCForm from '../utils/KYCForm/KYCForm';
import KYCDetailsForm from '../utils/KYCDetailsForm/KYCDetailsForm';
import { useNavigate } from 'react-router-dom';

const KYCCompliance = ({setEnterIntoApp, simDetails, allDeviceData, accessToken, isAdmin, isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [kycData, setKYCData] = useState([]);
    const [search, setSearch] = useState('');
    const [updateKYC, setUpdateKyc] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [showKycDetails, setShowKycDetails] = useState(false);
    const [kycDetail, setKycDetail] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [filteredData, setFilteredData] = useState([])
    // const [additionalInputVisible, setAdditionalInputVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (allDeviceData.data && allDeviceData.data.length > 0) {
            loadData()
            setIsLoading(false)
        }
    }, [allDeviceData, kycData])

    useEffect(() => {

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleUpdateKyc = () => {
        if (selectedDevice !== null) setUpdateKyc(true);
    }
    const handleShowKycDetails = (device) => {
        setShowKycDetails(true);
        setKycDetail(device);
    }

    const fetchData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const resp2 = await axios.get("https://openapi.airtel.in/iot/api/customer/kyc/sim/details", {
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: "application/json",
                    apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "iv-user": "developer.24004@mrmprocom.com",
                    "customer-id": "24004"
                },
            });

            setKYCData(resp2.data.data.simKycList);

            // setIsLoading(false);
        } catch (error) {
            // console.error("Error fetching data:", error);
            if (error.response.status === 401) {
                console.log("Unauthorized");
                localStorage.clear();
                isAdmin = false;
                isAuthenticated = false;
                navigate("/", { replace: true });
            }
        } finally {
            setIsLoading(false);
        }
    };


    function loadData() {
        const data = kycData.map(kyc => {
            const matchingDevice = allDeviceData.data.find(device => device.SIMNo === kyc.simNo);
            if (matchingDevice) {
                return {
                    ...kyc,
                    ...matchingDevice
                };
            } else {
                return null;
            }
        }).filter(data => data !== null);

        setFilteredData(data)
        // setIsLoading(false);
    }

    const handleCheckboxChange = (device) => {
        setSelectedDevice(device);
    };
    console.log("filteredData is : ", filteredData);
    return (
        <div className='KYCComplianceContainer'>
            {isLoading ? (
                <div className="KYCCompletionloader">
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#081242"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className='kycComplianceTableContainer'>
                    <div className='Header'>
                        <div className={selectedDevice ? "updateKycBtn updateKycFormActive" : "updateKycBtn"} onClick={handleUpdateKyc}>update kyc</div>
                        <h3>KYC Compliance</h3>
                        <input
                            name="kycComplianceSearchBox"
                            id="kycComplianceSearchBox"
                            placeholder='Search here . . .'
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='KYCCompCont'>
                        <table className='KYCComplianceTable'>
                            <thead>
                                <tr className='kycComplianceHead'>
                                    <th></th>
                                    <th>Sim No</th>
                                    <th>MSISDN</th>
                                    <th>KYC Status</th>
                                    <th>KYC Due Date</th>
                                    <th>KYC Completion Date</th>
                                    <th>Number Status</th>
                                    <th>Activation Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((device, index) => (
                                    <tr key={index} className='kycComplianceTableItems'>
                                        <td><input type='radio' name='check' onChange={() => handleCheckboxChange(device)} /></td>
                                        <td>{device.simNo}</td>
                                        <td>{device.mobileNo}</td>
                                        <td>{device.status}</td>
                                        <td>{device.complianceDate.split(" ")[0]}</td>
                                        <td>{device.kycCompletionDate.split(" ")[0]}</td>
                                        <td>{device.simStatus}</td>
                                        <td>{device.activationDate.split(" ")[0]}</td>
                                        <td>{<div className='kycComplianceButton' onClick={() => handleShowKycDetails(device)}>Kyc Details</div>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        updateKYC && selectedDevice && ( // Only render form if a device is selected
                            <KYCForm
                            setEnterIntoApp={setEnterIntoApp}
                                selectedDevice={selectedDevice}
                                setUpdateKyc={setUpdateKyc}
                            />
                        )

                    }

                    {
                        showKycDetails && kycDetail && ( // Only render form if a device is selected
                            <KYCDetailsForm kycDetail={kycDetail} setShowKycDetails={setShowKycDetails} />
                        )
                    }

                </div>
            )}
        </div>
    );
};

export default KYCCompliance;
