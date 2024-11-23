import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "../util/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, username, password, email } = values;
    const res = await createUserApi(name, username, email, password);
    if (res) {
      notification.success({
        message: "Create User",
        description: "success",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Create User",
        description: "ERROR",
      });
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-full max-w-[800px] justify-center bg-white align-middle">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="m-auto w-1/2"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
