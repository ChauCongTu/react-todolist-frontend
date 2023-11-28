import api from '../../../services/apiService';
import { TaskType } from '../types/type';

export const deleteTask = async (user_id:number): Promise<TaskType[]> => {
    try {
        const response = await api.delete('/task/'+user_id);
        return response.data;
    } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
    }
};