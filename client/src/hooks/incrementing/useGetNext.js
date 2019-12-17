import Axios from 'axios';
import { setAuthHeader } from '../useAuthHeader';
export const getNext = () => {
    return Axios.get(`/api/v1/next`, setAuthHeader())
}