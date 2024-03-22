import React, { useEffect } from 'react'
import './SIMsDisplay.css';
import axios from 'axios';
const SIMsDisplay = ({basketId, simType}) => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
        const simsperBasket = await axios.get(`https://openapi.airtel.in/iot/api/customer/details/basket/${basketId}/sims?simStatus=${simType}`, {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: "application/json",
              apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
              "Content-Type": "application/x-www-form-urlencoded",
              "iv-user": "developer.24004@mrmprocom.com",
              "customer-id": "24004"
            },
          })
          console.log("simResponsewhen click on activebtn", simsperBasket)
    }
    useEffect(()=>{
        fetchData();
    },[])

  return (
    <div>SIMsDisplay + {basketId} + {simType}</div>
  )
}

export default SIMsDisplay