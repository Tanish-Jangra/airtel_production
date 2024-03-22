import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from './../../assets/dashboard.svg';
import SimCardIcon from './../../assets/simCard.png';
import AllDevicesIcon from './../../assets/allDevicesIcon.png';
import Add from './../../assets/Add.png';
import kyc from './../../assets/kyc.png';
import billIcon from './../../assets/bill.png';
const Sidebar = ({ isAdmin, isAuthenticated }) => {
    // Initialize active state for the currently active item
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Extract the pathname from the location
        const pathname = location.pathname;

        // Map the pathname to the corresponding item name
        const itemNames = {
            "/app/dashboard": "dashboard",
            "/app/addnewdevice": "addnewdevice",
            "/app/alldevices": "alldevices",
            "/app/activate-sim": "activate-sim",
            "/app/deactivate-sim": "deactivate-sim",
            "/app/simmanagement": "simmanagement",
            "/app/kyc": "KYCCompliance",
            "/app/billing": "billingPayment"
        };

        // Set the active item based on the pathname
        setActiveItem(itemNames[pathname]);
    }, [location]);

    return (
        <div className='sidebarContainer'>
            <div className='sidebarHeader'>
                MRM PROCOM
            </div>
            <div className='sidebarItems'>
                <ul className='sidebarLists'>
                    {
                        isAdmin && (
                            <>
                                <NavLink
                                    to="/app/dashboard"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "dashboard" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={DashboardIcon} alt="" className='Icon' />
                                        Dashboard
                                    </li>
                                </NavLink>
                                <NavLink
                                    to="/app/addnewdevice"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "addnewdevice" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={Add} alt="" className='Icon' />
                                        New Device
                                    </li>
                                </NavLink>
                                <NavLink
                                    to="/app/simmanagement"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "simmanagement" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={SimCardIcon} alt="" className='Icon' />
                                        Sim Management</li>
                                </NavLink>
                                <NavLink
                                    to="/app/alldevices"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "alldevices" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={AllDevicesIcon} alt="" className='Icon' />
                                        All Devices</li>
                                </NavLink>
                                <NavLink
                                    to="/app/kyc"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "KYCCompliance" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={kyc} alt="" className='Icon' />
                                        KYC</li>
                                </NavLink>
                                <NavLink
                                    to="/app/billing"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "billingPayment" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={billIcon} alt="" className='Icon' />
                                        Billing & Payment</li>
                                </NavLink>
                            </>
                        )
                    }

                    {
                        (isAuthenticated && !isAdmin) && (
                            <NavLink
                                    to="/app/addnewdevice"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "addnewdevice" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={Add} alt="" className='Icon' />
                                        New Device
                                    </li>
                                </NavLink>
                        )
                    }


                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
