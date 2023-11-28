import { AxiosRequestConfig } from 'axios';
import api from '../../../services/apiService';
import { TaskType } from '../types/type';

export const getTasks = async (user_id:number, params?: AxiosRequestConfig['params']): Promise<TaskType[]> => {
    try {
        const response = await api.get('/task/'+user_id, { params });
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};