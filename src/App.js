import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './Components/Admin/Admin';

import Home from './Components/Home/Home';
import AddFuelMember from './Components/AddMember/AddMember';
import DisplayFuelMember from './Components/MemberDisplay/MemberDisplay'; 
import SingleMember from './Components/SingleMember/SingleMember';
import UpdateMember from './Components/UpdateMember/UpdateMember';

import AddStock from './Components/AddStock/AddStock';
import DisplayStock from './Components/StockDisplay/StockDisplay';
import UpdateStock from './Components/UpdateStock/UpdateStock';
import FuelLevels from './Components/FuelLevel/FuelLevel';
import RecordSale from './Components/RecordSale/RecordSale';
import DisplayRecord from './Components/DisplayRecord/DisplayRecord';
import UpdateSale from './Components/UpdateSale/UpdateSale';
import DailySummary from './Components/FuelIncomeSummary/DailyIncomeSummary';
import MemberLogin from './Components/MemberLogin/MemberLogin';
import Contact from './Components/Contact/Contact';



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

          <Route path="/addstock" element={<AddStock/>}/>
          <Route path="/displaystock/:id" element={<DisplayStock/>}/>
          <Route path="/updatestock/:id" element={<UpdateStock/>}/>
          <Route path="/fuel-levels" element={<FuelLevels />} />

          <Route path="/recordsale" element={<RecordSale />} />
          <Route path="/sales" element={<DisplayRecord />} />
          <Route path="/updatesales/:id" element={<UpdateSale />} />
          <Route path="/summary" element={<DailySummary />} />

          <Route path="/contact" element={<Contact />} />














      </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
