import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UsersAdminList() {
  const [arUsers, setArUsers] = useState([])

  const onDeleatClick = (_idDel) => { 
    console.log(_idDel);
    
    
  }
  

  useEffect(() => {
    doApiUsers();
  }, [])

  const doApiUsers = async () => { 
    try{
       const url = API_URL + "/users/usersList";
       const resp = await axios({
        method: "GET",
        url: url ,
        headers: {
          'x-api-key': localStorage[TOKEN_KEY]
        }
       })
       console.log(resp.data);
       setArUsers(resp.data)
       
    }
    catch(err){
       console.log(err);
       alert("There problem, come back later");
    }
  }


  return (
    <div className='container'>
      <h2>List of users</h2>

      <table className='table'>
        <thead>
        <tr>
          <th>#</th>
          <th>nameDog</th>
          <th>nameOwner</th>
          <th>email</th>
          <th>role</th>
          <th>Del/Edit</th>
          
        </tr>
        </thead>

        <tbody>
          { arUsers &&
            arUsers.map((item, i) => {
              return(
                <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.nameDog}</td>
                <td>{item.nameOwner}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button onClick={() => {
                  onDeleatClick(item._id)
                  }} className='btn btn-danger'>del</button>
                  <button className='btn btn-info'>edit</button>
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

