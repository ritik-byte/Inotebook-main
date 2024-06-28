import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Alert from './Alert';

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
const {showAlert} = props
   
        const handle = async (e) => {
            e.preventDefault();
            try{
            const response = await fetch("http://www.localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.AuthToken);
                navigate("/");
            }
            else {
                showAlert("Invalid Credentials , Please Check the Email and Password", "Failed");                
            }
        }catch(error){
            showAlert("Internal Servor Error" , "Please try again");
        }
        }
        const onchange = (e) => {
            setcredentials({ ...credentials, [e.target.name]: e.target.value })
        }
        return (
            <div className="container my-4 align-middle" style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
                <h1 className='my-4'>Please login to continue...</h1>
                <form onSubmit={handle}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onchange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' className="form-control" id="password" placeholder="Password" value={credentials.password} onChange={onchange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

export default Login
