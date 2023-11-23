import api from '../../../../services/apiService';
import { RegisterProps } from '../types/type';

export const registerService = async (Register: RegisterProps): Promise<RegisterProps> => {
    const response = await api.post('/register', Register);
    return response.data;
};
