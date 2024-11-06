import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import SearchBar from './searchBar';
import { ProductContext } from '../context/product.context';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { products } = useContext(ProductContext);

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
      label: <Link to="/shopping-cart">Your Cart</Link>,
      key: 'shoppingCart',
      icon: <ShoppingCartOutlined />,
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

  const handleSearch = (value) => {
    const searchReSults = products.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });
    return searchReSults;
  };

  return (
    <div className="flex justify-between align-middle mt-2 h-12">
      <div className="m-auto flex align-middle justify-between  ">
        <Link
          to={'/'}
          className="flex
        "
        >
          <img
            src="/favicon/android-chrome-192x192.png"
            alt="favicon"
            type="image/png"
            sizes="16x16"
            className="w-8 h-8 mr-2"
          />
          <span className="m-auto">KelvinMall</span>
        </Link>
      </div>
      <div className="w-1/2 m-auto align-middle">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="flex mx-auto justify-end sm:w-1/6 md:w-1/4 lg:w-1/4"
        items={items}
      />
    </div>
  );
};

export default Header;
