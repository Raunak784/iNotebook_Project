import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const[credentials, setCredentials] =useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success")
            navigate("/");

        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange= (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
     
    return (
        <div className='mt-3'>
            <h2>Login to continue iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div class="my-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name='email'value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name='password' value={credentials.password} onChange={onChange}  id="password" />
                </div>
                <button type="submit" class="btn btn-primary" >Submit</button>
            </form >    
        </div>
    )
}

export default Login