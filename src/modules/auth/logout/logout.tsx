import React, {useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Modal from 'antd/es/modal/Modal';
import toast, { Toaster } from 'react-hot-toast';

import { useAuth } from '../../../providers/AuthProvider';

const Logout:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useAuth();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (localStorage.getItem('token')) {
            toast.success('Logout successful!')
            localStorage.removeItem('token');
            localStorage.removeItem('login_info');
            logout();
        }
        else {
            toast.error("Invalid Operation!")
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button size="small" variant="outlined" startIcon={<LogoutIcon />} onClick={showModal}></Button>
            <Modal title="LOGOUT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to end the login session ...</p>
            </Modal>
            <Toaster />
        </>

    )
}

export default Logout