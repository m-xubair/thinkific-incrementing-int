import Axios from 'axios';

export const userAuthentication = (user) => {

    return Axios.post(`/api/v1/login`, user);
    
}