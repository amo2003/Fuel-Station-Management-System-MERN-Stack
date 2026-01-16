import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './Components/Admin/Admin';

import Home from './Components/Home/Home';

import AddFuelMember from './Components/AddMember/AddMember';
import DisplayFuelMember from './Components/MemberDisplay/MemberDisplay'; 
import SingleMember from './Components/SingleMember/SingleMember';
import UpdateMember from './Components/UpdateMember/UpdateMember';
import MemberLogin from './Components/MemberLogin/MemberLogin';
import MemberForgotPassword from './Components/MemberLogin/MemberFogot';

import SupplierList from "./Components/SupplierList/SupplierList";
import AddSupplier from "./Components/AddSupplier/AddSupplier";
import UpdateSupplier from "./Components/UpdateSupplier/UpdateSupplier";


import AddStock from './Components/AddStock/AddStock';
import DisplayStock from './Components/StockDisplay/StockDisplay';
import UpdateStock from './Components/UpdateStock/UpdateStock';

import FuelLevels from './Components/FuelLevel/FuelLevel';

import RecordSale from './Components/RecordSale/RecordSale';
import DisplayRecord from './Components/DisplayRecord/DisplayRecord';
import UpdateSale from './Components/UpdateSale/UpdateSale';
import DailySummary from './Components/FuelIncomeSummary/DailyIncomeSummary';

import Contact from './Components/Contact/Contact';

import PaymentPage from './Components/Payment/payment';
import DisplayPayment from './Components/DisplayPayment/DisplayPayment';
import UpdatePayment from './Components/UpdatePayment/UpdatePayment';
import PaymentDetails from './Components/SinglePayment/SinglePayment';

import FRegister from './Components/AddFactory/RegisterFactory';
import FactoryProfile from './Components/FactoryProfile/FactoryProfile';
import FactoryLogin from './Components/FactoryLogin/FactoryLogin';
import FactoryForgotPassword from './Components/FactoryLogin/FactoryForgotPassword';
import AllFactories from './Components/DisplayFactory/DisplayFactory';
import UpdateFactory from './Components/UpdateFactory/UpdateFactory';

import FuelStations from './Components/FuelStations/FuelStations';

import EVRegister from './Components/EVRegister/EVRegister';
import EVLogin from './Components/EVLogin/EVLogin';
import EVResetPassword from './Components/EVLogin/EVResetPassword';
import EVProfile from './Components/EVList/EVList';
import EVDetail from './Components/EVDetails/EVDetails';
import UpdateEV from './Components/UpdateEV/UpdateEV';

import ServicesPage from './Components/ServicePage/ServicesPage';
import FuelPricesPage from './Components/FuelPricePage/FuelPricesPage';

import AppointmentBooking from './Components/AppointmentBooking/AppointmentBooking';
import AppointmentProfile from './Components/EVAppointmentProfile/EVAppointmentProfile';
import UpdateAppointment from './Components/UpdateAppointment/UpdateAppointment';
import AllAppointments from './Components/AllAppointments/AllAppointments';
import EVPaymentForm from './Components/EVPaymentForm/EVPaymentForm';
import VehicleDetailsPage from './Components/EVPaymentForm/EVPaymentList';
import PaymentSuccess from './Components/EVPaymentForm/PaymentSuccess';
import EVBookingPayment from './Components/EVPaymentForm/EVBookingPayment';

import EVRatingPage from './Components/EVRatingPage/EVRatingPage';
import EVRatingList from './Components/EVRatingList/EVRatingList';
import BulkOrderForm from './Components/BulkOrderForm/BulkOrderForm';

import AdminBulkOrders from './Components/AdminBulkOrders/AdminBulkOrders';
import BulkPaymentInsert from './Components/BulkPaymentInsert/BulkPaymentInsert';
import BulkPaymentList from './Components/BulkPaymentList/BulkPaymentList';

import FeedbackInsertPage from './Components/FeedbackInsertPage/FeedbackInsertPage';
import FeedbackDisplayPage from './Components/FeedbackDisplayPage/FeedbackDisplayPage';

import CustomerChat from './Components/MessageCustomer/CustomerChat';
import AdminChat from './Components/MessageAdmin/AdminChat';
import EnterPin from './Components/Pin/EnterPin';
import CreatePin from './Components/Pin/CreatePin';

import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './Components/PrivacyPolicy/TermsOfService';
import BulkPaymentSlip from './Components/BulkPaymentSlip/BulkPaymentSlip';
import CustomerPayments from './Components/CustomerPayments/CustomerPayments';
import AdminPayments from './Components/CustomerPayments/AdminPayments';
import EVMyAppointments from './Components/EVMyAppointments/EVMyAppointments';
import AdminRegister from './Components/AdminRegister/AdminRegister';



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>

          <Route path="/admin" element={<Admin/>}/>

          <Route path="/" element={<Home/>}/>
          <Route path="/mainhome" element={<Home/>}/>

          <Route path="/addmember" element={<AddFuelMember/>}/>
          <Route path="/displaymember" element={<DisplayFuelMember/>}/>
          <Route path="/memberlogin" element={<MemberLogin />} />
          <Route path="/displaysinglemember/:id" element={<SingleMember />} />
          <Route path="/updatemember/:id" element={<UpdateMember />} />
          <Route path="/member-forgot" element={<MemberForgotPassword />} />
      

          <Route path="/addstock" element={<AddStock/>}/>
          <Route path="/displaystock/:id" element={<DisplayStock/>}/>
          <Route path="/updatestock/:id" element={<UpdateStock/>}/>
          <Route path="/fuel-levels" element={<FuelLevels />} />

          <Route path="/recordsale" element={<RecordSale />} />
          <Route path="/sales" element={<DisplayRecord />} />
          <Route path="/updatesales/:id" element={<UpdateSale />} />
          <Route path="/summary" element={<DailySummary />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/displaypayments" element={<DisplayPayment />} />
          <Route path="/updatepayment/:id" element={<UpdatePayment />} />
          <Route path="/paymentdetails/:id" element={<PaymentDetails />} />

          <Route path="/fRegister" element={<FRegister />} />
          <Route path="/flogin" element={<FactoryLogin />} />
          <Route path="/fogotpassword" element={<FactoryForgotPassword />} />
          <Route path="/factory/update/:id" element={<UpdateFactory />} />
          <Route path="/factory/profile/:id" element={<FactoryProfile />} />
          <Route path="/factories" element={<AllFactories />} />

          <Route path="/stations" element={<FuelStations />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fuel-prices" element={<FuelPricesPage />} />          

          <Route path="/evregister" element={<EVRegister />} />
          <Route path="/evlog" element={<EVLogin />} />
          <Route path="/ev/profile/:id" element={<EVProfile />} />
          <Route path="/allEV" element={<EVDetail />} />
          <Route path="/ev/updateEV/:id" element={<UpdateEV />} />
          <Route path="/evreset" element={<EVResetPassword />} />


          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/appoinment/profile/:id" element={<AppointmentProfile />} />

          <Route path="/appointment/:id" element={<AppointmentProfile/>} />
          <Route path="/myappointments/:gmail" element={<EVMyAppointments />} />


          <Route path="/appoinment/update/:id" element={<UpdateAppointment />} />
          <Route path="/appoinment/all" element={<AllAppointments />} />

          <Route path="/evpayment-form" element={<EVPaymentForm />} />
          <Route path="/evpayment/details" element={<VehicleDetailsPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/EVBookingPayment" element={<EVBookingPayment />} />

          <Route path="/ev-rating" element={<EVRatingPage />} />
          <Route path="/ratingdisplay" element={<EVRatingList />} />

          <Route path="/placeorder/:id" element={<BulkOrderForm />} />
          <Route path="/admin/bulkorders" element={<AdminBulkOrders />} />

          <Route path="/bulkpayment/:orderId" element={<BulkPaymentInsert />} />
          <Route path="/bulkpaymentslip/:orderId" element={<BulkPaymentSlip />} />
          <Route path="/customer/payments" element={<CustomerPayments />} />
          <Route path="/admin/payments" element={<AdminPayments />} />

          <Route path="/bulkpaymentlist" element={<BulkPaymentList />} />
          <Route path="/feedback" element={<FeedbackInsertPage/>} />
          <Route path="/feedbackslist" element={<FeedbackDisplayPage/>} />

          <Route path="/customerchat/:pin" element={<CustomerChat/>} />
          <Route path="/adminchat" element={<AdminChat/>} />
          <Route path="/enterpin" element={<EnterPin/>} />
          <Route path="/createpin" element={<CreatePin/>} />

          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/term" element={<TermsOfService/>} />

          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/suppliers/add" element={<AddSupplier />} />
          <Route path="/suppliers/update/:id" element={<UpdateSupplier />} />

          <Route path="/admin-register" element={<AdminRegister />} />





          </Routes>
          </React.Fragment>
          </div>
      );
}

export default App;
