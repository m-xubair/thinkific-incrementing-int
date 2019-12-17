import React, { useEffect, useState } from "react";
import Loader from '../loader/Loader';
import {userAuthentication} from '../hooks/user/useUserAuthentication';

const Login = (props) => {
    const [user, setUser] = useState({email: '', password: ''});
    const [errors, setErrors] = useState(null)
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        const api_key = localStorage.getItem('_api_key');
        if(api_key) {
            props.history.push('/dashboard');
        }
    }, [])
    const handleLogin = () => {
        setLoader(true);
        userAuthentication(user).then((response) => {
            if(response.data.api_key) {
                props.handleUpdateLogin(true);
                localStorage.setItem('_api_key', response.data.api_key);
                props.history.push('/dashboard');
            }
            setLoader(false);
        }).catch((err) => {
            setErrors(err.response.data.errors);
            setLoader(false);
        });
    }
    return (
        <div className="inner-container">
             
                <form>
                    <h3>Sign In</h3>
                    {
                        errors ?
                        <div className="alert alert-danger">
                            {errors.map((e) => <div>{e}</div>)}
                        </div>
                        :null

                    }
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
                    {
                        loader ?
                            <Loader />
                        : 
                            <button type="button" onClick={handleLogin} className="btn btn-primary btn-block">Submit</button>
                    }
                    
                </form>
            
        </div>
    );
}

export default Login;