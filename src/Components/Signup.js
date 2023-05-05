import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
const[credentials, setCredentials] =useState({name: "", email: "", password: "", cpassword: "", phone: ""})
let navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    fetch()
    const {name,email, password,phone} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password, phone})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account Created Sucessfully !!", "success")

    }
    else{
        props.showAlert("Invalid credentials", "danger")
    }
}

const onChange= (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className='mt-3'>
        <h2>Signup to continue iNotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="my-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name"name='name' onChange={onChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="phone" className="form-label">Mobile Number</label>
            <input type="number" className="form-control" id="phone"name='phone' onChange={onChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"onChange={onChange} required/>
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}minLength={5} required/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup