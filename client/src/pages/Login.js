import React, { useState, useEffect } from 'react'
import {Form, Input, message, Button, Typography} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Spinner from '../components/Spinner';
import axios from 'axios';

const { Title, Text } = Typography;


const Login = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
    const submitHandler = async (values) => {
        try {
          setLoading(true)
          const {data} = await axios.post("/users/login" ,values)
          setLoading(false)
          message.success('Login Successfull !!')
          localStorage.setItem('user', JSON.stringify({...data.user,password:''}))
          navigate('/')
        } catch(error) {
          setLoading(false)
          message.error("Something Went Wrong !!")
        }
    }

    useEffect(() => {
      if(localStorage.getItem("user")) {
        navigate("/");
      }
    }, [navigate]);


  return (
    <>
      <div className="login-page">
      {loading && <Spinner />}
      <div className="login-container">
        <div className="form-container">
          <Title level={3} className="login-title">
            Welcome Back
          </Title>
          <Text type="secondary" className="login-subtitle">
            Please login to continue
          </Text>
          <Form
            layout="vertical"
            onFinish={submitHandler}
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                className="login-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="login-input"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              block
            >
              Login
            </Button>
          </Form>
          <div className="login-footer">
            <Text>
              Not a user?{' '}
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
