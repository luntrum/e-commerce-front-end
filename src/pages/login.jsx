import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import { loginUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, password } = values;
    const res = await loginUserApi(username, password);
    if (res && res.EC === 0) {
      notification.success({
        message: 'Login Success',
        description: 'success',
      });
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } else {
      notification.error({
        message: 'Login Error',
        description: res?.EM ?? `ERROR${res?.EC}`,
      });
    }
  };

  return (
    <div className="flex m-auto justify-center align-middle w-full max-w-[800px] min-h-screen ">
      <Form
        layout="vertical"
        className="m-auto w-1/2 "
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1 className="text-3xl my-5 mx-auto item-center ">Đăng Nhập</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
