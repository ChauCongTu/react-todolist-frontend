import { Button, Form, Input, Modal, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

import TaskTable from './features/taskTimeline/taskTable'
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const Task: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect (() => {
    document.title = 'Task Management';
  });
  const onChangeFrom: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(dateString);
  };
  const onChangeEnd: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(dateString);
  };
  return (
    <div>
      <h2>My Tasks</h2>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <Button>All</Button>
          <Button className='ms-2'>Today</Button>
          <Button className='ms-2'>Tomorrow</Button>
        </div>
        <div>
          Select Date:  <DatePicker onChange={onChangeFrom} /> - <DatePicker onChange={onChangeEnd} />
        </div>

      </div>
      <TaskTable startDate={startDate} endDate={endDate} />
      
    </div>
  )
}

export default Task


