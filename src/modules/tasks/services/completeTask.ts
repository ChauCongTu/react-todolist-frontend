import api from '../../../services/apiService';
import { TaskType } from '../types/type';

export const completeTask = async (id: number): Promise<TaskType[]> => {
    try {
        const response = await api.put('/task/' + id + '/complete');
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};