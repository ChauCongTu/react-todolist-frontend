import api from '../../../services/apiService';
import { TaskType } from '../types/type';

export const addTask = async (Task : TaskType): Promise<TaskType> => {
    try {
        const response = await api.post('/task', Task);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};