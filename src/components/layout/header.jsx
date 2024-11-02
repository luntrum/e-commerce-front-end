import {
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    label: <Link to="/">home</Link>,
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/user">User</Link>,
    key: 'user',
    icon: <UserOutlined />,
  },

  {
    label: 'welcome',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        label: <Link to="/login"> Đăng nhập </Link>,
        key: 'login',
      },
      {
        label: <Link to="/register"> Đăng ký </Link>,
        key: 'register',
      },
    ],
  },
];

const Header = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        lineHeight: '4rem',
        margin: 'auto',
        justifyItems: 'right',
        width: '100%',
      }}
      items={items}
    />
  );
};

export default Header;
