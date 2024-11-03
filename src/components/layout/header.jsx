import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Drawer, Input, Menu } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const location = useLocation();

  const getPathKey = (pathname) =>
    pathname === '/' ? 'home' : pathname.split('/')[1];

  const [current, setCurrent] = useState(getPathKey(location.pathname));

  useEffect(() => {
    setCurrent(getPathKey(location.pathname));
  }, [location.pathname]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'Account',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        ...(auth?.isAuthenticated
          ? [
              {
                label: <Link to="/user">Your infomation</Link>,
                key: 'user',
                icon: <UserOutlined />,
              },
              {
                label: 'Logout',
                key: 'logout',
                icon: <LogoutOutlined />,
                onClick: () => {
                  localStorage.removeItem('auth');
                  setAuth({ isAuthenticated: false, user: {} });
                  setCurrent('home');
                  navigate('/');
                },
              },
            ]
          : [
              {
                label: <Link to="/login"> Sign In </Link>,
                key: 'login',
                icon: <LoginOutlined />,
              },
              {
                label: <Link to="/register"> Sign Up </Link>,
                key: 'register',
                icon: <UserAddOutlined />,
              },
            ]),
      ],
    },
  ];
  const [headerItems, setHeaderItems] = useState([]);
  useEffect(() => {
    setHeaderItems(items);
  }, [auth]);
  const onSearch = () => {
    console.log('search');
  };

  return (
    <div className="flex justify-between align-middle mt-2 h-12">
      <div className="m-auto flex align-middle justify-between  ">
        <img
          src="public\favicon\android-chrome-192x192.png"
          className="w-1/2 h-12 m-auto pr-2"
        ></img>
        <span className="m-auto">KelvinMall</span>
      </div>
      <Input.Search
        placeholder="Type what you need to find..."
        onSearch={onSearch}
        className="w-1/3 m-auto"
      />

      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="flex mx-auto justify-end sm:w-1/6"
        items={items}
      />
    </div>
  );
};

export default Header;
