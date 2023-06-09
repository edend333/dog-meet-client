import React from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './pages/home';
import LoginAdmin from './admin/loginAdmin';
import HeaderAdmin from './admin/headerAdmin';
import UsersAdminList from './admin/users/usersAdminList';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/admin" element={<LoginAdmin/>} />
        <Route path="/admin/users" element={<UsersAdminList/>} />
        <Route path="/*" element={<h2>Page 404, not found</h2>} />
      </Routes>

    </BrowserRouter>
  )
}
