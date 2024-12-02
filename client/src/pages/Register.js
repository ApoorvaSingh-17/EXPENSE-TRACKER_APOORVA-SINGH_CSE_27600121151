import React, { useState, useEffect } from 'react'
import {Form, Input, message} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Register = () => {

  const navigate = useNavigate();

  const[loading, setLoading] = useState(false);


    const submitHandler = async (values) => {
        try {
          setLoading(true)
          await axios.post("/users/register", values);
          message.success("Registration Successfull");
          setLoading(false)
          navigate("/login");
        } catch(error) {
          setLoading(false)
          message.error("Invalid Credentials!!")
          
        }
    };

    //prevent for login user
    useEffect(() => {
      if(localStorage.getItem("user")) {
        navigate("/");
      }
    }, [navigate]);

    
  return (
    <>
      <div className="register-page">
      {loading && <Spinner />}
      <div className="register-container">
        <h1 className="register-title">REGISTER</h1>
        <p className="register-subtitle">Join us and start your journey!</p>
        <Form layout="vertical" onFinish={submitHandler} className="register-form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input type="password" className="register-input" />
          </Form.Item>
          <button className="register-button" type="submit">
            REGISTER
          </button>
        </Form>
        <div className="register-footer">
          <p>
            Already a user?{" "}
            <Link to="/login" className="login-link">
              Click here to login
            </Link>
          </p>
        </div>
      </div>
    </div>

    </>
  )
}

export default Register
