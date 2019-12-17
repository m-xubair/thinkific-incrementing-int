import Axios from 'axios';

export const userRegister = (user) => {

    return Axios.post(`/api/v1/register`, user);
    
}