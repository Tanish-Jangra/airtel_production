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
            "/dashboard": "dashboard",
            "/addnewdevice": "addnewdevice",
            "/alldevices": "alldevices",
            "/activate-sim": "activate-sim",
            "/deactivate-sim": "deactivate-sim",
            "/simmanagement": "simmanagement",
            "/kyc": "KYCCompliance",
            "/billing": "billingPayment"
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
                                    to="/dashboard"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "dashboard" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={DashboardIcon} alt="" className='Icon' />
                                        Dashboard
                                    </li>
                                </NavLink>
                                <NavLink
                                    to="/addnewdevice"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "addnewdevice" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={Add} alt="" className='Icon' />
                                        New Device
                                    </li>
                                </NavLink>
                                <NavLink
                                    to="/simmanagement"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "simmanagement" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={SimCardIcon} alt="" className='Icon' />
                                        Sim Management</li>
                                </NavLink>
                                <NavLink
                                    to="/alldevices"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "alldevices" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={AllDevicesIcon} alt="" className='Icon' />
                                        All Devices</li>
                                </NavLink>
                                <NavLink
                                    to="/kyc"
                                    end
                                    className="nav-links"
                                >
                                    <li className={activeItem === "KYCCompliance" ? "sidebarListItem active" : "sidebarListItem"}>
                                        <img src={kyc} alt="" className='Icon' />
                                        KYC</li>
                                </NavLink>
                                <NavLink
                                    to="/billing"
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
                                    to="/addnewdevice"
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
