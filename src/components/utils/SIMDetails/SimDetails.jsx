import React, { useEffect } from 'react'
import './SimDetails.css';
import axios from 'axios';
const SimDetails = ({SiMNo}) => {

    useEffect(()=>{
        async function fetchDetails(){
            console.log("SimNo", SiMNo);
            const token = localStorage.getItem('token');
            const resp = await axios.get(`https://openapi.airtel.in/iot/api/customer/details/basket/355661/sims?filterValue=${SiMNo}&simFilterType=SIM_NO`,{
                headers:{
                    Authorization: 'Bearer ' + token,
                      Accept: "application/json",
                      apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
                      "Content-Type": "application/x-www-form-urlencoded",
                      "iv-user": "developer.24004@mrmprocom.com",
                      "customer-id": "24004"
                  }
            })
            console.log("datadfdafsaf: ", resp);
        }
        fetchDetails();
    },[])

  return (
    <div>

    </div>
  )
}

export default SimDetails