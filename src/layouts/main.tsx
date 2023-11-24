import React from 'react';
import './assets/main.scss';
import { HomeOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu, theme } from 'antd';
import Logout from '../modules/auth/logout/logout';
import { Link, NavLink } from 'react-router-dom';
import UserBox from '../components/avatar/avatar';
import RouteConfig from '../routes/config';
import { UserType } from '../modules/users/types/type';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const loginInfo = localStorage.getItem('login_info');
  const users : UserType = loginInfo ? JSON.parse(loginInfo) : { users: null };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className='full-height'
        >
          <Link to={'/'} className={'logo'}>
            <div className='p-5 fw-bold'>NTodo List</div>
          </Link>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to={'/'}>Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileDoneOutlined />}>
            <NavLink to={'/Tasks'}>Tasks</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <NavLink to={'/Users'}>Users</NavLink>
          </Menu.Item>
          <Divider />
          <div className='user-box'>
            <div className='d-flex align-items-center'>
              <UserBox />
              <div className='ms-3 mt-3'>
                <p>{users.full_name}</p>
                <Logout />
              </div>
            </div>

          </div>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <RouteConfig />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          NTodo List By <a href="http://facebook.com/xoxvp">NhonCQ</a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;