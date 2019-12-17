import Axios from 'axios';
import { setAuthHeader } from '../useAuthHeader';
export const getCurrent = () => {
    return Axios.get(`/api/v1/current`, setAuthHeader())
}