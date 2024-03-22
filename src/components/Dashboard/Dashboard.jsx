import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios';
import SIMsDisplay from './SimsDisplay/SIMsDisplay';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const Dashboard = ({ isAdmin, isAuthenticated, accessToken }) => {
  const navigate = useNavigate();
  const url = "https://openapi.airtel.in/iot/api/customer/details/baskets";
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [totalSimsShow, setTotalSimsShow] = useState(false);
  const [activeSimsShow, setActiveSimsShow] = useState(false);
  const [simType, setSimType] = useState(null);
  const [selectedBasketId, setSelectedBasketId] = useState(null);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: "application/json",
          apikey: "hZUJOhtFUPDRMPrUIPKKhzEbDLS3yqy4",
          "Content-Type": "application/x-www-form-urlencoded",
          "iv-user": "developer.24004@mrmprocom.com",
          "customer-id": "24004"
        },
      })
      setData(res.data.data);
      setIsLoading(false);
      console.log("Res: ...", res.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        isAdmin = false;
        isAuthenticated = false;
        navigate("/", { replace: true })
      }
      console.log("error: ", error.response.status);
    }
  }

  const keysToDisplay = ["totalBaskets", "totalSims", "totalActiveSims", "totalAvailableSims"];

  const filteredData = Object.keys(data)
    .filter(key => keysToDisplay.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  useEffect(() => {
    fetchData();
  }, [])

  const handleTotalSimsShow = () => {
    setTotalSimsShow(true);
  }
  const handleSimsShow = (basket, type) => {
    setSelectedBasketId(basket.basketId);
    setSimType(type);
  }

  return (
    <>
      {
        isloading ? (
          <div className="SimManagementloader"><TailSpin
            visible={true}
            height="80"
            width="80"
            color="#081242"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          /></div>
        ) : (
          <div className='DashboardContainer'>
            <div className='temp'>
              {
                Object.keys(filteredData).map((item, ind) => {
                  if (item !== "baskets") return (
                    <div className='dashboardData' key={ind}>
                      <p className='DashitemKey'>{item}:</p>
                      <p className='DashitemVal'>{data[item]}</p>
                    </div>
                  )
                })

              }
            </div>
            <hr className='horizontalRow dashboardRow' />
            <div className='BasketsContainer'>
              {
                Object.keys(data).map((item, ind) => {
                  if (item === "baskets") {
                    // Return the mapped JSX here
                    return data[item].map((basket, index) => {
                      return (
                        <div className='basketContainer' key={index}>
                          <div className='BasketHeader'>
                            <p>{basket.basketName}</p>
                          </div>
                          <div className='BasketItems'>
                            <div className="basketItem">
                              <p className="ItemHeading">Basket Id:</p>
                              <p>{basket.basketId}</p>
                            </div>
                            <div className="basketItem">
                              <p className="ItemHeading">Total SIMs:</p>
                              <p className='clickableItemsPerBasket'>{basket.totalSims}</p>
                            </div>
                            <div className="basketItem">
                              <p className="ItemHeading">Available SIMs:</p>
                              <p className='clickableItemsPerBasket' onClick={() => handleSimsShow(basket, 'INITIAL')}>{basket.availableSims}</p>
                            </div>
                            <div className="basketItem">
                              <p className="ItemHeading">Active SIMs:</p>
                              <p className='clickableItemsPerBasket' onClick={() => handleSimsShow(basket, 'ACTIVE')}>{basket.activeSims}</p>
                            </div>
                            <div className="basketItem">
                              <p className="ItemHeading">SafeCustody SIMs:</p>
                              <p className='clickableItemsPerBasket' onClick={() => handleSimsShow(basket, 'SAFE_CUSTODY')}>{basket.safeCustodySims}</p>
                            </div>
                            <div className="basketItem">
                              <p className="ItemHeading">Suspended SIMs:</p>
                              <p className='clickableItemsPerBasket'>{basket.suspendedSims}</p>
                            </div>
                          </div>

                        </div>
                      );
                    });
                  }
                  // Return null or an empty array if the condition doesn't match
                  return null;
                })
              }</div>

            {selectedBasketId && (
              <>
                <SIMsDisplay basketId={selectedBasketId} simType={simType} />
              </>
            )}

          </div>
        )
      }

    </>
  )
}

export default Dashboard