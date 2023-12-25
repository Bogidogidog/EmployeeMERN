import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li>
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/missing">
            <button type="button">Missing Employees</button>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/equipment">Equipment</Link>
        </li>
        <li>
          <Link to="/equipment/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
        <li>
         <Link to="/company/create">
           <button type="button">Create Company</button>
         </Link>
       </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
