export type TaskType = {
    task_id: number|null;
    user_id: number;
    title: string;
    description: string|null;
    priority: 'normal' | 'high' | 'very_high'; 
    status: 'pending' | 'completed'; 
    start_at: number; // Unix timestamp, giả sử kiểu là number.
    deadline: number; // Unix timestamp, giả sử kiểu là number.
    created_at: string|null; 
    updated_at: string|null;
}