import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { DatePicker, Form, Input, Modal, Radio } from 'antd';
import { TaskType } from '../../types/type';
import { useState } from 'react';
import { UserType } from '../../../users/types/type';
import { addTask } from '../../services/addTasks';
import toast, { Toaster } from 'react-hot-toast';

interface addTaskProps {
    open: boolean;
    onCancel: () => void;
}

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const AddTaskForm: React.FC<addTaskProps> = ({
    open,
    onCancel,
}) => {
    const loginInfo = localStorage.getItem('login_info');
    const users: UserType = loginInfo ? JSON.parse(loginInfo) : { users: null };
    const [form] = Form.useForm();
    const onOk = () => {
        form
            .validateFields()
            .then((values) => {
                const task: TaskType = {
                    task_id: null,
                    user_id: users.id,
                    title: values.title,
                    description: values.description || null,
                    priority: values.priority,
                    status: 'pending',
                    start_at: Math.floor(values.time[0].$d.getTime() / 1000), // Chuyển đổi và làm tròn giống giây
                    deadline: Math.floor(values.time[1].$d.getTime() / 1000), 
                    created_at: null,
                    updated_at: null
                };
                console.log(task)
                addTask(task)
                .then((data) => {
                    console.log(data)
                    toast.success('Add Task successfully!');
                    form.resetFields()
                })
                .catch((e)=> {
                    if(e.response.data.error){
                        toast.error(e.response.data.error);
                    }
                })
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <Modal
            open={open}
            title="Create a new tasks"
            okText="Add"
            cancelText="Close"
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of task!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="priority" label="Priority" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="normal">Normal</Radio>
                        <Radio value="high">High</Radio>
                        <Radio value="very_high">Very high</Radio>
                    </Radio.Group>
                </Form.Item>
                <div className='d-flex justify-content-center'>
                    <Form.Item className='me-3' name="time" label="Time">
                        <RangePicker showTime />
                    </Form.Item>
                </div>
            </Form>
            <Toaster />
        </Modal>
    );
};

export default AddTaskForm;