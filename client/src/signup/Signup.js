import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../loader/Loader';
import {userRegister} from '../hooks/user/useUserRegister';

const SignUp = (props) => {
    const [user, setUser] = useState({name: '', email: '', password: ''});
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        const api_key = localStorage.getItem('_api_key');
        if(api_key) {
            props.history.push('/dashboard');
        }
    }, []);

    const handleRegister = () => {
        setLoader(true);
        userRegister(user).then((response) => {
            localStorage.setItem('_api_key', response.data.api_key);
            props.history.push('/dashboard');
        }).catch((err) => {
            setErrors(err.response.data.errors);
            setLoader(false);
        })
    }

    return (
        <div className="auth-inner">
            <form>
                <h3>Sign Up</h3>
                {
                    errors ?
                    <div className="alert alert-danger">
                        {errors.map((e) => <div>{e}</div>)}
                    </div>
                    :null

                }
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={user.name} onChange={(e)=> setUser({...user, name: e.target.value})} 
                    className="form-control" placeholder="Full Name" required />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} 
                    className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} 
                    className="form-control" placeholder="Enter password" />
                </div>

                <button type="button" onClick={handleRegister} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <Link to={'/sign-in'}>sign in?</Link>
                </p>
            </form>
        </div>
    );
}


export default SignUp;