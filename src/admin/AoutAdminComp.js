import React, { useEffect } from 'react'
import { API_URL, doApiGet } from '../services/apiService'
import { useNavigate } from 'react-router-dom';

export default function AoutAdminComp() {
  const nav = useNavigate();
  useEffect(() => {
    doApiCheckToken();
  }, [])


  const doApiCheckToken = async () => { 
    try{
      const url = API_URL + "/users/checkToken";
      const data = await doApiGet(url)
      if(data.role != "admin"){
        alert("you need to by admin")
        nav("/admin")
      }
    }
    catch(err){
       console.log(err);
       alert("you need to login");
       nav("/admin")
    }

  }
    
  return (
    <React.Fragment></React.Fragment>
  )
}

