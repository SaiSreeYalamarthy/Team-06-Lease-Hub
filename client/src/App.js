import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import Login from './Login';
import BuyPage from './Buy';
import CommericalpropertiesPage from './CommericalpropertiesPage';
import SharedaccomadationPage from './SharedaccomadationPage';
import ServiceapartmentsPage from './ServiceapartmentsPage';
import RentPage from './Rent';
import ServicePage from './ServicePage';
// import Specificpage from './Specificpage';
import Serviceman from './Serviceman';
import UserProfile from './Profile';
import ViewAll from './ViewAll';
import Owner from './Owner';
import AddProperty from './AddProperty';
import PropertyDetailPage from './PropertyDetailPage';
import AnnualIncome from './AnnualIncome';
import VacanciesList from './VacanciesList';
import Vaccancies from './Vaccancies';
import Issues from './Issues';
import ListIssues from './ListIssues';
import Uploadleasedoc from './Uploadleasedoc';
import LeaseDocList from './LeaseDocList';
import User from './User';
import SpecificPage from './Specificpage';
import PropertyManagement from './Propertylist';
import AddPropertyWrapper from './AddPropertyWrapper';
import Compare from './compare';
// import Service from './service';
import Wishlist from './wishlist';
import Notification from './Notification';
import Ownerprofile from './Ownerprofile';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/serviceapartments" element={<ServiceapartmentsPage />} />
          <Route path="/sharedaccomadation" element={<SharedaccomadationPage />} />
          <Route path="/commericalproperties" element={<CommericalpropertiesPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/specific/:id" element={<Compare />} />
          <Route path="/add-property" element={<AddPropertyWrapper />} />
          <Route path="/list-property" element={<PropertyManagement/>}/>
          <Route path="/ServicePage" element={<ServicePage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/serviceman" element={<Serviceman />} />
          <Route path="/annualincome" element={<AnnualIncome />} />
          <Route path="/allvaccancies" element={<Vaccancies />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/list-issues" element={<ListIssues />} />
          <Route path="/uploadleasedoc" element={<Uploadleasedoc />} />
          <Route path="/lease-doc-list" element={<LeaseDocList />} />
          <Route path="/user" element={<User />} />
          <Route path="/properties/:id" element={<SpecificPage />} />
          {/* <Route path="/properties/:id" element={< view-all/>} /> */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/Ownerprofile" element={<Ownerprofile />} />

          <Route
            path="/view-all"
            element={
              <ViewAll
                bedrooms={3}
                bathrooms={1}
                houseType="Individual"
                parkingSpace={true}
                petFriendly={false}
                amenities={['AC', 'Laundry']}
              />
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;