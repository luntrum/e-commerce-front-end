import { App } from 'antd';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    username: '',
    email: '',
    name: '',
    role: '',
  },
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      username: '',
      email: '',
      name: '',
      role: '',
    },
  });

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  useEffect(() => {
    if (auth?.user && auth?.isAuthenticated === true) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
