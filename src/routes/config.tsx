import { Routes, Route } from 'react-router-dom';
import Home from '../modules/home/home';
import Task from '../modules/tasks/tasks';
import User from '../modules/users/users'

const RouteConfig = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/tasks'} element={<Task />} />
            <Route path={'/users'} element={<User/>} />
        </Routes>
    )
    
}

export default RouteConfig