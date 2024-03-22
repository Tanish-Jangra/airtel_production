import React, { useState } from 'react';
import editIcon from './../../assets/edit.png';
import deleteIcon from './../../assets/trash-can.png';
import './GetAllDevice.css';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GetAllDevice = ({ setEnterIntoApp, allDeviceData }) => {

  const [search, setSearch] = useState('');
  const [selectEditDeviceDetail, setSelectEditDeviceDetails] = useState(false);
  const [selectDeleteDeviceDetail, setSelectDeleteDeviceDetails] = useState(false);
  const [editDeviceDetail, setEditDeviceDetail] = useState(null);
  const [deleteDevice, setDeleteDevice] = useState(null);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleEditDevice = (device) => {
    setSelectEditDeviceDetails(true);
    setEditDeviceDetail(device);
    console.log("device detail for edit is :", device);
  }

  const handleDeleteDevice = (device) => {
    setSelectDeleteDeviceDetails(true);
    setDeleteDevice(device);
  }

  const handleCancelEditForm = () => {
    setSelectEditDeviceDetails(false);
  }

  const handleCancelDeleteForm = () => {
    setSelectDeleteDeviceDetails(false);
  }

  const handleConfirmEditForm = async () => {
    try {
      const confirmEdit = await axios.post("https://config.iot.mrmprocom.com/php-admin/editDevices.php", editDeviceDetail);
      console.log(confirmEdit, "confirm Edit.....");
      console.log("confirmEdit details are here->>>>>>>>", confirmEdit);
      console.log("editdevice details are here->>>>>>>>>", editDeviceDetail);
      if(confirmEdit.data.success===1) toast.success(`${confirmEdit.data.message}`, { autoClose: 1000 });
      else toast.error(`${confirmEdit.data.message}`, {autoClose: 1000});
      setEnterIntoApp(prevState => prevState + 1);
    } catch (error) {
      toast.error("Failed to edit", { autoClose: 1000 })
    }
    setSelectEditDeviceDetails(false);
  }

  const handleConfirmDeleteForm = async () => {
    if (!deleteDevice) return;

    if (window.confirm("Are you sure you want to delete the device?")) {
      try {
        await axios.post("https://config.iot.mrmprocom.com/php-admin/deleteDevices.php", {
          deviceSerialNo: deleteDevice.deviceSerialNo
        });
        toast.success('Device deleted successfully!', { autoClose: 1000 });
        setEnterIntoApp(prevState => prevState + 1);
      } catch (error) {
        console.error("Failed to delete device:", error);
        toast.error('Failed to delete device!', { autoClose: 1000 });
      }
    }
    setSelectDeleteDeviceDetails(false);
  };


  const filteredData = allDeviceData.data ? allDeviceData.data.filter(item =>
    item.clientName.toLowerCase().includes(search.toLowerCase()) ||
    item.clientAddress.toLowerCase().includes(search.toLowerCase()) ||
    item.deviceModel.toLowerCase().includes(search.toLowerCase()) ||
    item.deviceSerialNo.toLowerCase().includes(search.toLowerCase()) ||
    item.deviceQRCode.toLowerCase().includes(search.toLowerCase()) ||
    item.deviceIMEI.toLowerCase().includes(search.toLowerCase()) ||
    item.SIMNo.toLowerCase().includes(search.toLowerCase())
  ) : [];



  return (
    <>
      <div className='GetDevicesFormContainer'>
        <div className='Header'>
          <h3>ALL DEVICES</h3>
          <div className='allDevicesSearchboxContainer'>
            <input
              name="allDevicesSearchBox"
              id="allDevicesSearchBox"
              placeholder='Search here...'
              value={search}
              onChange={handleSearch}
            /></div>
        </div>

        {
          // console.log("allDeviceData.data:", allDeviceData.data)

          (allDeviceData.data && allDeviceData.data.length === 0) ?
            (
              <div className="spinCont"><TailSpin
                visible={true}
                height="80"
                width="80"
                color="#081242"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              /></div>
            ) : (<div className='GetDevicesTableContainerDiv'>
              <table className="GetDevicesTableContainer">
                <thead>
                  <tr className='AllDevicesHead'>
                    <th>ID</th>
                    <th>Name</th>
                    {/* <th>Address</th> */}
                    <th>Device Model</th>
                    <th>Serial No.</th>
                    <th>QR Code</th>
                    <th>IMEI No.</th>
                    <th>SIM No.</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className='AllDevicesTableData'>
                      <td>{index + 1}</td>
                      <td>{item.clientName}</td>
                      {/* <td>{item.clientAddress}</td> */}
                      <td>{item.deviceModel}</td>
                      <td>{item.deviceSerialNo}</td>
                      <td>{item.deviceQRCode}</td>
                      <td>{item.deviceIMEI}</td>
                      <td>{item.SIMNo}</td>
                      <td>{<div className='getDeviceDetail' >
                        <div onClick={() => handleEditDevice(item)}><img className='editIcon' src={editIcon} alt="Edit" /></div>
                        <div onClick={() => handleDeleteDevice(item)}><img className='deleteIcon' src={deleteIcon} alt="Delete" /></div>
                      </div>}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
              {
                filteredData.length===0?(
                <div className='NoResultFound'>
                  <p>No Result Found</p>
                </div>):""
              }
            </div>)
        }
      </div>
      {
        selectEditDeviceDetail && (
          <div className='editSelectedDeviceDetail'>
            <div className='EditDeviceContainer'>
            <div className='crossIcon' onClick={handleCancelEditForm}>X</div>
              <div className='editDeviceInfo'>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>Serial No. :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.deviceSerialNo}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, deviceSerialNo: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>Model No. :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.deviceModel}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, deviceModel: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>QR Code. :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.deviceQRCode}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, deviceQRCode: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>IMEI No. :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.deviceIMEI}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, deviceIMEI: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>SIM No. :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.SIMNo}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, SIMNo: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail'>
                  <div className='editDeviceHeadings'>Client Name :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields"
                    value={editDeviceDetail.clientName}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, clientName: e.target.value })}
                  />
                </div>
                <div className='editDeviceDetail address'>
                  <div className='editDeviceHeadings'>Client Address :</div>
                  <input
                    type="text"
                    className="EditDeviceInputFields address"
                    value={editDeviceDetail.clientAddress}
                    onChange={(e) => setEditDeviceDetail({ ...editDeviceDetail, clientAddress: e.target.value })}
                  />
                </div>
              </div>
              <div className='editDeviceBtns'>
                <button className='cancelBtn' onClick={handleCancelEditForm}>Cancel</button>
                <button className='confirmBtn' onClick={handleConfirmEditForm}>Confirm</button>
              </div>
            </div>
          </div>
        )
      }

      {
        selectDeleteDeviceDetail && (
          <div className='deleteSelectedDeviceDetail'>
            <div className='deleteDeviceContainer'>
            <div className='crossIcon' onClick={handleCancelDeleteForm}>X</div>
              <div className='deleteDeviceInfo'>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">Serial No. :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.deviceSerialNo}</div>
                </div>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">Model No. :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.deviceModel}</div>
                </div>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">QR Code. :</div>
                  <div className='deleteDeviceInputFields'>{deleteDevice.deviceQRCode}</div>
                </div>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">IMEI No. :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.deviceIMEI}</div>
                </div>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">SIM No. :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.SIMNo}</div>
                </div>
                <div className='deleteDeviceDetail'>
                  <div className="deleteDeviceHeadings">Client Name :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.clientName}</div>
                </div>
                <div className='deleteDeviceDetail address'>
                  <div className="deleteDeviceHeadings">Client Address :</div>
                  <div className="deleteDeviceInputFields">{deleteDevice.clientAddress}</div>
                </div>
              </div>
              <div className='deleteDeviceBtns'>
                <button className='cancelBtn' onClick={handleCancelDeleteForm}>Cancel</button>
                <button className='confirmBtn' onClick={handleConfirmDeleteForm}>Confirm</button>
              </div>
            </div>
          </div>
        )
      }
      <ToastContainer />
    </>
  )
}

export default GetAllDevice;
