import '../../App.css'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

import { Outlet } from 'react-router-dom';

function Layout({ data: name }) {
  let isAuthenticated = localStorage.getItem('isAuthenticated');
  let isAdmin = localStorage.getItem('user') === "tanish@mrmprocom.com";

  return (
    <div className='mainContainer'>
      {<Sidebar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />}
      <div className='layoutContainer'>
        {<Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />}
        <div className='randomclass'>
          
            <Outlet context={[name]} />
        </div>
      </div>
    </div>
  )
}

export default Layout;