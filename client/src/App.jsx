import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Service from './pages/Service';
import NavbarComp from './components/NavbarComp';
import Footer from './components/Footer'
import Login from './pages/Admin/Login'
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin/Admin'
import CreateService from './pages/Admin/CreateService';
import Profile from './components/Admin/Profile';
import ServicesAdmin from './components/Admin/ServicesAdmin';
import UpdateService from './pages/Admin/UpdateService';
import CoursesPage from './pages/Courses';
import ConsultationPage from './pages/Consultation';

function App() {

  return (
    
    <BrowserRouter>
    <NavbarComp/>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/consultation" element={<ConsultationPage/>} />
          <Route path="/languagecourses" element={<CoursesPage/>} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/service/:id" element={<Service />} />       
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<Admin/>}>
                <Route path="services"element={<ServicesAdmin/>}/>
                <Route index element={<Profile/>}/>
              </Route>
              <Route path="/createService" element={<CreateService/>}/>
              <Route path="/updateService/:id" element={<UpdateService/>}/>
          </Route>
        </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
