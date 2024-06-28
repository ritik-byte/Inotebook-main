import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Alert from './Alert'



const Signup = (props) => {
  const { showAlert } = props
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
  let navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://www.localhost:5000/api/auth", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.AuthToken);
        navigate("/");
      }
      else {
        showAlert("The User Already Exists...", "Failed");
        // alert("User Already Exists");
      }
    }
    catch (error) {
      showAlert("Internal server Error", "Please try again");
    }
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container my-4 align-middle" style={{ color: props.mode === '#e3f2fd' ? '#042743' : 'white' }}>
      <h1 className='my-4'>Welcome to Inotebook</h1>
      <h2 className='my-2'>Create Account to use the app...</h2>
      <form onSubmit={handle}>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter the Name" value={credentials.name} onChange={onchange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onchange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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

export default Signup
