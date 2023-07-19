import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UsersAdminList() {
  const [arUsers, setArUsers] = useState([])
  const nav = useNavigate();

  useEffect(() => {
    doApiUsers();
  }, [])

  // data users
  const doApiUsers = async () => {
    try {
      const url = API_URL + "/users/usersList";
      const resp = await doApiGet(url)
      setArUsers(resp)
    }
    catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }
  }

  // Click Deleat 
  const onDeleatClick = async (_idDel) => {
    console.log(_idDel);
    try {
      if (window.confirm("Delete user?")) {
        const url = API_URL + "/users/" + _idDel;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApiUsers();
        }
      }

    }

    catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }

  }

  const onEditClick = async (_idEdit) => { 
    nav("/admin/users/editUser/" + _idEdit)
    console.log(_idEdit);
    
  }




  return (
    <div className='container'>
      <h2 className='my-4'>List of users</h2>
      <Link to={"/admin/users/addUser"} style={{ textDecoration: 'none', fontSize: '1.3rem' }}>To Add User</Link>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>nameDog</th>
            <th>nameOwner</th>
            <th>email</th>
            <th>city</th>
            <th>role</th>
            <th>action</th>

          </tr>
        </thead>

        <tbody>
          {arUsers &&
            arUsers.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.nameDog}</td>
                  <td>{item.nameOwner}</td>
                  <td>{item.email}</td>
                  <td>{item.idCity}</td>
                  <td>{item.role}</td>
                  <td>
                    <button onClick={() => {
                      onDeleatClick(item._id)
                    }} className='btn btn-danger'>del</button>
                    <button onClick={() => {
                      onEditClick(item._id)
                    }} className='btn btn-info'>edit</button>
                  </td>

                </tr>
              )

            })
          }

        </tbody>
      </table>
    </div>
  )
}

