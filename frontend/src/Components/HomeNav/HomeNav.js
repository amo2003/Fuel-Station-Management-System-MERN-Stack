import './HomeNav.css';
import { FaGasPump  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomeNav() {

return (
    <nav className="fuel-navbar">
      <div className="navbar-logo">
        <FaGasPump size={24} />
        <span className="logo-text">Dasu Filling <span className="logo-flow">Station, Galle.</span></span>
      </div>
      <ul className="navbar-links">
      { <li><Link to="/admin">Dashboard</Link></li> }
        <li><Link to="/fuel-levels">Live Fuel Level</Link></li>
        <li><Link to="/evlog">Charge Your EV</Link></li>
        <li><Link to="/flogin">Place Fuel Order</Link></li>
        <li><Link to="/memberlogin">Staff Details</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>


      </ul>

    </nav>
  );
}

export default HomeNav;
