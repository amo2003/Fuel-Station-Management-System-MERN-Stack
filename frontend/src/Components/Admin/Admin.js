import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import logo from '../../assets/f2.png';
import {FaGasPump,FaUsers,FaTruck,FaMoneyBill,FaFileInvoiceDollar,FaOilCan,FaWarehouse,FaMoneyBillWave, FaBriefcase, FaChargingStation ,FaPlug, FaCreditCard,FaWhatsapp, FaStar ,FaTruckLoading, FaCoins, FaUserPlus, FaCommentDots , FaComments, FaUsersCog, FaUniversity } from 'react-icons/fa';

function Admin() {

    const stockId = localStorage.getItem("stockId"); 

    const handleSendReport = () => {

    //crete whatsapp chat url
    const phoneNumber = "+94766773745";
    const message = `Hello what you want to know`
    const WhatsAppUrl = `http://web.whatsapp.com/send?phones=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    
    //open the whatsapp chat in new window
    window.open(WhatsAppUrl,"_blank");
  }


  return (
    <div className="admin-dashboard">
      <div className="admin-overlay"></div>

      <nav className="dashboard-nav">
        <div className="nav-logo-section">
          <img src={logo} alt="FuelFlow Logo" className="admin-logo" />
          <h2>Dasu Filling Station,Galle. Admin Panel</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
        <div className="whatsapp-btn-container">
              <button className="whatsapp-btn" onClick={handleSendReport}>
                <FaWhatsapp className="whatsapp-icon" />
            WhatsApp Support
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, Admin</h1>
        <p className="dashboard-sub">Manage everything from one place</p>

        <div className="dashboard-cards">
          {/* Row 1 */}
          <div className="card-row">
            <Link  to="/addstock" className="card">
              <FaGasPump size={40} className="card-icon" />
              <h3>Add Fuel Stock</h3>
              <p>Monitor and update fuel inventory</p>
            </Link>

            <Link to={`/displaystock/${stockId}`} className="card"> {/*Stock Display Link */}
              <FaWarehouse size={40} className="card-icon" />
              <h3>Stock Records</h3>
              <p>View and manage fuel stock logs</p>
            </Link>

              <Link to="/displaypayments" className="card">
              <FaMoneyBillWave size={40} className="card-icon" />
              <h3>Payment For Fuel</h3>
              <p>Check and manage Payments</p>
            </Link>
          </div>

           {/* Row 2 */}
          <div className="card-row">
            <Link to="/suppliers/add" className="card">
              <FaUserPlus size={40} className="card-icon" />
              <h3>Add Supplier</h3>
              <p>View & Register Suppliers</p>
            </Link>

            <Link to="/suppliers" className="card">
              <FaUsersCog size={40} className="card-icon" />
              <h3>Supplier Details</h3>
              <p>View & Manage Supplier Details</p>
            </Link>

          </div>

          {/* Row 3 */}
          <div className="card-row">
            <Link to="/recordsale" className="card">
              <FaTruck size={40} className="card-icon" />
              <h3>Daily Fuel Deliveries</h3>
              <p>Track fuel delivery schedules</p>
            </Link>

            <Link to="/sales" className="card">
              <FaFileInvoiceDollar size={40} className="card-icon" />
              <h3>Sales Records</h3>
              <p>Check and manage client payments</p>
            </Link>

            <Link to="/summary" className="card">
              <FaMoneyBill size={40} className="card-icon" />
              <h3>Daily Sales Income</h3>
              <p>Check and manage Sales Income</p>
            </Link>
          </div>

          {/* Row 4 */}
          <div className="card-row">
            <Link to="/fuel-levels" className="card">
              <FaOilCan size={40} className="card-icon" />
              <h3>Fuel Levels</h3>
              <p>View current fuel tank status</p>
            </Link>

          
            <Link to="/displaymember" className="card">
              <FaUsers size={40} className="card-icon" />
              <h3>Manage Staff</h3>
              <p>View or modify staff records</p>
            </Link>

             <Link to="/ratingdisplay" className="card">
              <FaStar  size={40} className="card-icon" />
              <h3>Rating List</h3>
              <p>View Rating</p>
            </Link>

            {/* Row 5 */}
           <Link to="/allEV" className="card">
              < FaPlug size={40} className="card-icon" />
              <h3>EV Customers</h3>
              <p>View EV Customers Details</p>
            </Link>

              <Link to="/appoinment/all" className="card">
              < FaChargingStation  size={40} className="card-icon" />
              <h3>EV Bookings</h3>
              <p>View EV Booking Appoinment Details</p>
            </Link>

            
            <Link to="/evpayment/details" className="card">
              <FaCreditCard size={40} className="card-icon" />
              <h3>EV Booking & Income</h3>
              <p>View payment details and income</p>
            </Link>


             {/* Row 6 */}
           <Link to="/factories" className="card">
              <FaBriefcase size={40} className="card-icon" />
              <h3>Bulk Fuel Customers</h3>
              <p>View Details</p>
            </Link>

             <Link to="/admin/bulkorders" className="card">
              <FaTruckLoading size={40} className="card-icon" />
              <h3>Bulk Fuel Orders</h3>
              <p>View Details and Manage</p>
            </Link>

             <Link to="/bulkpaymentlist" className="card">
              <FaCoins  size={40} className="card-icon" />
              <h3>Bulk Fuel Orders Income</h3>
              <p>View Orders $ Income</p>
            </Link>

            {/* Row 7 */}
          <div className="card-row">
            <Link to="/admin/payments" className="card">
              <FaUniversity size={40} className="card-icon" />
              <h3>Bulk Payment Bank Deposit</h3>
              <p>View & Verfiy Bank Deposit</p>
            </Link>
          </div>

              {/* Row 8 */}
           <Link to="/feedbackslist" className="card">
              <FaCommentDots size={40} className="card-icon" />
              <h3>Customer's Feedbacks</h3>
              <p>View All Customer's Feedbacks</p>
            </Link>

            <Link to="/adminchat" className="card">
              <FaComments  size={40} className="card-icon" />
              <h3>Customer's Chat</h3>
              <p>View All Customer's Chat</p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
