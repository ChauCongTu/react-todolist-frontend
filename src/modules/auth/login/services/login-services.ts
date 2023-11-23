import api from '../../../../services/apiService';
import { LoginProps } from '../types/type';

export const loginService = async (login: LoginProps): Promise<LoginProps> => {
    const response = await api.post('/login', login);
    return response.data;
};