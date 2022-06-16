import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

import Blank from './pages/Blank';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import TeamMembers from './pages/TeamMembers';
import EditAgent from './pages/EditAgent';
import ForSaleProperties from './pages/ForSaleProperties';
import AddNewForSaleProperty from './pages/AddNewForSaleProperty';
import EditForSaleProperty from './pages/EditForSaleProperty';
import ForRentProperties from './pages/ForRentProperties';
import AddNewForRentProperty from './pages/AddNewForRentProperty';
import EditForRentProperty from './pages/EditForRentProperty';
import SubmittedPropertyRequests from './pages/SubmittedPropertyRequests';
import SubmitPropertyRequest from './pages/SubmitPropertyRequest';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<TeamMembers />} />
                    <Route path='/Admin/started' element={<Blank />} />
                    <Route path='/Admin/AboutUs/edit' element={<AboutUs />} />
                    <Route path='/Admin/ForSaleProperties' element={<ForSaleProperties />} />
                    <Route path='/Admin/ForSaleProperties/AddNew' element={<AddNewForSaleProperty />} />
                    <Route path='/Admin/ForSaleProperties/Edit/Property/:id' element={<EditForSaleProperty />} />
                    <Route path='/Admin/ForRentProperties' element={<ForRentProperties />} />
                    <Route path='/Admin/ForRentProperties/AddNew' element={<AddNewForRentProperty />} />
                    <Route path='/Admin/ForRentProperties/Edit/Property/:id' element={<EditForRentProperty />} />
                    <Route path='/Admin/SubmittedPropertyRequests' element={<SubmittedPropertyRequests/>} />
                    <Route path='/Admin/TeamMembers' element={<TeamMembers />} />
                    <Route path='/Admin/Edit/Agent/:id' element={<EditAgent />} />
                    <Route path='/Admin/ContactUs/edit' element={<ContactUs />} />
                    <Route path='/Admin/SubmitPropertyRequest' element={<SubmitPropertyRequest/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
