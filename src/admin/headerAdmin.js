import React from 'react'
import { Link } from 'react-router-dom'
import { TOKEN_KEY } from '../services/apiService'
import { useNavigate } from 'react-router-dom';


export default function HeaderAdmin() {
  const nav = useNavigate();
  return (
    <header className="container-fluid bg-light p-2 shadow">
      <div className="container">
        <div className="row align-items-center">
          <div className='logo col-auto'>

            <Link to="/admin/users" style={{ textDecoration: 'none', fontSize: '1.3rem', color: "black" }}><h2>Admin</h2></Link>
          </div>
          <div className='row col d-flex justify-content-between align-items-center'>
            <div className='col-auto'>
              <ul>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/map">map</Link></li>
              </ul>
            </div>
            <div className='col-auto'>
              {!localStorage[TOKEN_KEY] ?
                <ul>
                  <li><Link to="/admin/">Login</Link></li>
                </ul> :
                <ul>
                  <li><button onClick={() => {
                    localStorage.removeItem(TOKEN_KEY);
                    nav("/admin")
                  }} className="btn btn-danger" >Logout</button></li>
                </ul>
              }

            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
