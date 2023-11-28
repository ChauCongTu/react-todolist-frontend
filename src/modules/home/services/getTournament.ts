import api from '../../../services/test-vebo';

export const getTour = async (): Promise<any> => {
    const response = await api.get('/tournament/menu');
    return response.data;
};