import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import '../Login/Login.scss'
import { register } from '../../services/users'
import { NavLink, useNavigate } from 'react-router-dom'
import { setCookie } from '../../../helpers/cookie'
import { useDispatch } from 'react-redux'
import { checkLogin } from '../../actions/login'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = async (values) => {
    console.log(values)
    try {
      const result = await register(values)
      console.log(result)
      if (result.code === 200) {
        messageApi.open({
          type: 'success',
          content: result.message, // ✅ lấy từ backend
        })
        setCookie('token', result.token, 1)
        dispatch(checkLogin(true))
        navigate('/')
      } else {
        messageApi.open({
          type: 'error',
          content: result.message || 'Đăng nhập thất bại',
        })
      }
    } catch (error) {
      console.error(error)
      messageApi.open({
        type: 'error',
        content: 'Có lỗi xảy ra, vui lòng thử lại',
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div className="login">
        <div className="login__card">
          <h2 className="login__title">Register</h2>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
            className="login__form"
          >
            {/* Username */}
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: 'Please input your fullName!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="fullName"
                size="large"
              />
            </Form.Item>
            {/* email */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="email"
                size="large"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            {/* Remember & Forgot */}
            <Form.Item>
              <div className="login__options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="login__checkbox">Remember me</Checkbox>
                </Form.Item>
              </div>
            </Form.Item>

            {/* Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="login__button"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <div className="login__footer">
            Already have an account?{' '}
            <NavLink to="/login" className="login__register">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
