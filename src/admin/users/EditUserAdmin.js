import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';


export default function EditUserAdmin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const { id } = useParams();
  const [dataUser, setDataUser] = useState({})

  useEffect(() => {
    doApiDataUser();
  }, [])

  // data users
  const doApiDataUser = async () => {
    try {
      const url = API_URL + `/users/single/${id}` ;
      const resp = await doApiGet(url)
      setDataUser(resp)
      console.log(resp);
      
      
    }
    catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }
  }

  const onSubForm = async (_bodyData) => {
    try {
      const url = API_URL + `/users/${id}`
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.matchedCount) {
        toast.success('Edit User !');
        nav("/admin/users")
      }
    }
    catch (err) {
      console.log(err);
      alert("There problem, come back later");
    }
  }


  return (
    <div className='container'>
      {
        dataUser.nameDog ? 
        <React.Fragment>
        <h2 className='text-center my-4'>Edit User</h2>
        <div className='d-flex align-items-center justify-content-center' >
          <form onSubmit={handleSubmit(onSubForm)} className='col-lg-6 '>
            <label>Name Dog</label>
            <input defaultValue={dataUser.nameDog} {...register("nameDog", { required: true, minLength: 2 })} className="form-control" type="text" />
            {errors.nameDog && <div className="text-danger">* Enter valid Name Dog</div>}
            <label>Name Owner</label>
            <input defaultValue={dataUser.nameOwner} {...register("nameOwner", { required: true, minLength: 2 })} className="form-control" type="text" />
            {errors.nameOwner && <div className="text-danger">* Enter valid Name Owner</div>}
            <label>Type Dog</label>
            <input  defaultValue={dataUser.type_dogs} {...register("type_dogs", { required: true, minLength: 2 })} className="form-control" type="text" />
            {errors.type_dogs && <div className="text-danger">* Enter valid Type Dog</div>}
            <label>Email</label>
            <input  defaultValue={dataUser.email} {...register("email", { required: true, minLength: 2 })} className="form-control" type="email" />
            {errors.email && <div className="text-danger">* Enter valid Email</div>}
            <label>Password</label>
            <input defaultValue={dataUser.password} {...register("password", { required: true, minLength: 2 })} className="form-control" type="text" />
            {errors.password && <div className="text-danger">* Enter valid Password</div>}
            <label>City</label>
            <input defaultValue={dataUser.idCity} {...register("idCity", { required: true, minLength: 2 })} className="form-control" type="text" >
              {errors.idCity && <div className="text-danger">* Enter valid City</div>}
            </input>
            <button className='btn btn-dark my-4'>submit</button>
          </form>
        </div>
        </React.Fragment> :
        <h2>Loding....</h2>

      }


    </div>
  )
}
