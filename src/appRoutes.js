import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home';
import LoginAdmin from './admin/loginAdmin';
import HeaderAdmin from './admin/headerAdmin';
import UsersAdminList from './admin/users/usersAdminList';
import AdduserAdmin from './admin/users/AdduserAdmin';
import EditUserAdmin from './admin/users/EditUserAdmin';
import MapView from './admin/maps/MapView';
import AoutAdminComp from './admin/AoutAdminComp';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/:dir/*" element={<AoutAdminComp />}> </Route>
      </Routes>

      <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
      </Routes>
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/users" element={<UsersAdminList />} />
        <Route path="/admin/users/addUser" element={<AdduserAdmin />} />
        <Route path="/admin/users/editUser/:id" element={<EditUserAdmin />} />

        <Route path="/admin/map" element={<MapView />} />
        <Route path="/*" element={<h2>Page 404, not found</h2>} />
      </Routes>

      <Routes>
        <Route path="/admin/:dir/*" element={<AoutAdminComp/>}> </Route>
      </Routes>

    </BrowserRouter>
  )
}
