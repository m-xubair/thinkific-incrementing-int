import Axios from 'axios';
import { setAuthHeader } from '../useAuthHeader';

export const resetCurrent = (current) => {
    return Axios.put(`/api/v1/current`, {current}, setAuthHeader());
    
}