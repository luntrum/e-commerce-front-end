import { App } from 'antd';
import { createContext, useEffect, useState } from 'react';
import { getUserApi, selectProductApi } from '../../util/api';
import { data } from 'autoprefixer';

export const AuthContext = createContext({});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      userId: '',
      username: '',
      email: '',
      name: '',
      role: '',
      selectedProducts: [
        {
          productId: '',
          quantity: 0,
        },
      ],
    },
  });

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const parsedata = JSON.parse(auth);
        if (parsedata) {
          setAuth(parsedata);
        }
        // console.log(parsedata);
      } catch (error) {
        console.log('error parsing auth', error);
      }
    }
  }, []);
  useEffect(() => {
    if (auth?.user && auth?.isAuthenticated === true) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth]);
  const handleAddtoCart = async (productId) => {
    try {
      const selectedProductsData = await selectProductApi(
        auth.user._id,
        productId,
      );

      if (selectedProductsData) {
        const fetchUser = async () => {
          const username = auth.user.username;
          const res = await getUserApi(username);
          // console.log(res);
          if (res?.data && res.status === 200) {
            setAuth({
              isAuthenticated: true,
              user: res.data,
            });
          }
        };
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, handleAddtoCart }}>
      {props.children}
    </AuthContext.Provider>
  );
};
