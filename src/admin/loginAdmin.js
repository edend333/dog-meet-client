import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY, doApiMethod } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LoginAdmin() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate();


  useEffect(() => {
    if(localStorage[TOKEN_KEY]){
      localStorage.removeItem(TOKEN_KEY)
      // לבדוק אם זו הדרך הכי נכונה לרנדר מחדש את הדפדפן
      // nav("/admin")
    }
  
  },[])


  const onSub = (_bodyData) => {
    console.log(_bodyData)
    doApiPost(_bodyData)
  }


  const doApiPost = async (_bodyData) => { 
    try{
      const url = API_URL + "/users/logIn";
      const resp = await doApiMethod(url, "POST", _bodyData)
      
      if(resp.token){
        if(resp.role == "admin"){
          localStorage.setItem(TOKEN_KEY, resp.token)
          toast.success('Welcome, you login.');
            nav("/admin/users")
        }else{
          alert("this place for admin");
          
        }
       
      }
   
      console.log(resp);
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
