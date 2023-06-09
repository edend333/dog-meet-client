import React from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginAdmin() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSub = (_bodyData) => {
    console.log(_bodyData)
    doApiPost(_bodyData)
  }

  const doApiPost = async (_bodyData) => { 
    try{
      const url = API_URL + "/users/logIn";
      const resp = await axios({
       method: "POST",
       url: url ,
       data: _bodyData
      })

      

      if(resp.data.token){
        if(resp.data.role == "admin"){
          localStorage.setItem(TOKEN_KEY, resp.data.token)
            nav("/admin/users")
        }else{
          alert("this place for admin");
          
        }
       
      }
   
      console.log(resp.data);
    }
    catch(err){
       console.log(err);
       alert("The password or email is incorrect");
    }

   
  }

  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Login to the Admin panel</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control'/>
        {errors.email && <div className='text-danger'>* Enter valid email</div>}
        <label>Password:</label>
        <input {...register("password",{required:true,minLength:3})} type="text" className='form-control'/>
        {errors.password && <div className='text-danger'>* Enter valid password (min 3 chars)</div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Log in</button>
        </div>
      </form>
    </div>
  )
}
