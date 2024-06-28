import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let navigate = useNavigate()
    const handlelogout = () => {

        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`} style={{ backgroundColor: "#8fd7da" }}>
                <NavLink className="navbar-brand" href="/"><h4>{props.title}</h4></NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/"><h4>Home</h4></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about"><h4>About</h4></NavLink>
                        </li>

                    </ul>

                </div>
                {!localStorage.getItem('token') ? <form className="d-flex">
                    <Link className="btn btn-secondary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-secondary mx-1" to="/signup" role="button">Signup</Link>
                </form> : <button className='btn btn-secondary mx-1' onClick={handlelogout}>Logout</button>}
                <div className="form-check form-switch">
                    <input className="form-check-input" onClick={props.tooglemode} type="radio" role="switch" id="flexSwitch" />
                    <label className={`form-check-label text-${props.m}`} htmlFor="flexSwitchCheckDefault"><h5>{props.m} Mode</h5></label>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
