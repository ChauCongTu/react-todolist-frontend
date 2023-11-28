import React, { useEffect, useState } from 'react'
import { parse, getTime, format } from 'date-fns';
import { getTasks } from '../../services/getTasks';
import { UserType } from '../../../users/types/type'
import './taskTable.scss'
import { Button, Col, Divider, Pagination, Row } from 'antd';

import AddTaskForm from '../addTask/addTask';
import { TaskType } from '../../types/type';
import { any } from 'zod';
import { deleteTask } from '../../services/delete';
import UpdateTaskForm from '../updateTask/updateTask';
import { completeTask } from '../../services/completeTask';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@mui/material';
interface FilterProp {
    startDate: string,
    endDate: string
}


const TaskTable = (Props: FilterProp) => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    const fetchData = (page?: number) => {
        const i_page = page ? page : 1;
        getTasks(users.id, { page: i_page })
            .then((data: any) => {
                setTasks(data.data)
                setCurrent(data.current_page);
                setTotal(data.total);
            })
            .catch((e) => console.log(e))
    }
    const loginInfo = localStorage.getItem('login_info');
    const users: UserType = loginInfo ? JSON.parse(loginInfo) : { users: null };
    const [tasks, setTasks] = useState<TaskType[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    const handleCancel = () => {
        fetchData();
        setOpen(false);
    }
    const handleCancelUpdate = () => {
        fetchData();
        setOpenUpdate(false);
    }
    const convertTime = (dateString: string) => {
        const dateObject = parse(dateString, 'yyyy-MM-dd', new Date());
        const unixTimestamp = getTime(dateObject) / 1000;
        return unixTimestamp;
    };
    const handlePageChange = (page: number) => fetchData(page);
    const handleDelete = (task_id: number) => {
        deleteTask(task_id)
            .then(() => {
                fetchData(current);
                toast.success('Deleted Task');
            })
            .catch((e) => {
                throw e;
            })
    }
    const startDate = Props.startDate ? convertTime(Props.startDate) : '';
    const endDate = Props.startDate ? convertTime(Props.endDate) : '';
    const handleComplete = (id: number) => {
        completeTask(id)
            .then((data) => {
                fetchData(current);
                toast.success('The Task has been completed');
            })
            .catch((e) => {
                throw e;
            });
    }
    return (
        <div>
            <Button
                className='mt-3'
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Add Task
            </Button>
            <div className='row'>
                {tasks.map((value: any, index) => {
                    let start = new Date(value.start_at * 1000);
                    let end = new Date(value.deadline * 1000);
                    return (
                        <div className='col-sm-4' key={index}>
                            <div className="mt-3 border pt-3 px-3">
                                <div className='d-flex justify-content-between aligns-item-center'>
                                    <div className='fw-bold'>{value.title}</div>
                                    <div>{value.status == 'completed' ?
                                        <span className='text-success'>Completed</span>
                                        : <span className='text-warning'>Pending</span>
                                    }</div>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>{value.description ? value.description : ''}</div>
                                    <p>{format(start, 'HH:mm')} - {format(end, 'HH:mm')}</p>
                                </div>
                                <Divider />
                                <div className='d-flex justify-content-center pb-3'>
                                    <Button className='mx-2' onClick={() => handleComplete(value.task_id)}>Complete</Button>
                                    <Button className='mx-2' onClick={() => setOpenUpdate(true)}>Update Task</Button>
                                    <Button className='mx-2' onClick={() => handleDelete(value.task_id)}>Delete</Button>
                                </div>
                            </div>
                            <UpdateTaskForm
                                open={openUpdate}
                                onCancel={() => {
                                    handleCancelUpdate()
                                }}
                                dataTask={value}
                            />
                        </div>
                    );
                })}
            </div>
            <AddTaskForm
                open={open}
                onCancel={() => {
                    handleCancel()
                }}
            />
            <Toaster />
            <div className='mt-3 text-end'>
                <Pagination showQuickJumper defaultCurrent={1} onChange={handlePageChange} defaultPageSize={6} current={current} total={total} />
            </div>
        </div >
    )
}

export default TaskTable