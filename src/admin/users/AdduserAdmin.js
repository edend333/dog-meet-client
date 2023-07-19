import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdduserAdmin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [arCity, setArCity] = useState([])
    const [inputValue, setInputValue] = useState("");
    // לשנות את השם של הסטייס
    const [inputValue2, setInputValue2] = useState("");
    const [cityMatches, setCityMatches] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        doApiCitys();
    }, [])

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);

        _bodyData.idCity = inputValue2;
        
        try {
            const url = API_URL + "/users"
            const data = await doApiMethod(url, "POST", _bodyData);

            if (data._id) {
                toast.success('Add User !');
                nav("/admin/users")
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem, come back later");
        }
    }

    // Data Citys
    const doApiCitys = async () => {
        try {
            const url = API_URL + "/citys/citysList";
            const resp = await doApiGet(url)
            console.log(resp);
            setArCity(resp)
        }
        catch (err) {
            console.log(err);
            alert("There problem, come back later");
        }
    }

    //  Click City Selection
    const onClickCitySelection = (nameCity) => {
        console.log(nameCity);
        setInputValue2(nameCity);
        setInputValue(nameCity)
        setCityMatches([])
    }



    // 
    const onChangeCityValue = (e) => {
        let matches = [];
        let text = e.target.value

        setInputValue(text);

        if (text.length > 0) {
            matches = arCity.filter(city => {
                return city.name.startsWith(text)
            })

        }
        // הגבלת התוצאות ל-10 תוצאות
        matches = matches.slice(0, 10);

        console.log(matches);
        setCityMatches(matches);
    };


    return (
        <div className='container'>
            <h2 className='text-center my-4'>Add User</h2>
            {arCity.length > 0 ?
                <div className='d-flex align-items-center justify-content-center' >
                    <form onSubmit={handleSubmit(onSubForm)} className='col-lg-6   '>
                        <label>Name Dog</label>
                        <input name="nameDogInput" {...register("nameDog", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.nameDog && <div className="text-danger">* Enter valid Name Dog</div>}
                        <label>Name Owner</label>
                        <input {...register("nameOwner", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.nameOwner && <div className="text-danger">* Enter valid Name Owner</div>}
                        <label>Type Dog</label>
                        <input {...register("type_dogs", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.type_dogs && <div className="text-danger">* Enter valid Type Dog</div>}
                        <label>Email</label>
                        <input {...register("email", { required: true, minLength: 2 })} className="form-control" type="email" />
                        {errors.email && <div className="text-danger">* Enter valid Email</div>}
                        <label>Password</label>
                        <input {...register("password", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.password && <div className="text-danger">* Enter valid Password</div>}
                        <label>City</label>
                        <input placeholder='name city' name="idCity"  {...register("idCity", { required: true, minLength: 2 })}
                            className="form-control" type="text"
                            value={inputValue}
                            onChange={onChangeCityValue}>
                            {errors.idCity && <div className="text-danger">* Enter valid City</div>}
                        </input>
                        {
                            cityMatches && cityMatches.map(city => {
                                return (
                                    <div key={city._id} onClick={() => onClickCitySelection(city.name)} className='col-md-12 div-arCity '  > {city.name} </div>
                                )
                            })
                        }


                        <button className='btn btn-dark my-4'>submit</button>
                    </form>
                </div> :
                <h2>Loding....</h2>
            }

        </div>
    )
}



{/* <Select options={options} onChange={handleChange} autoFocus={true} />
{errors.idCity && <div className="text-danger">* Enter valid City</div>} */}