import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './Login.scss'
import { login } from '../../services/productService'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../../helpers/cookie'

function Login() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = async (values) => {
    try {
      const result = await login(values)
      console.log(result)

      if (result.code === 200) {
        setCookie('token', result.token, 1)
        navigate('/')
        messageApi.open({
          type: 'success',
          content: result.message, // ✅ lấy từ backend
        })
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
          <h2 className="login__title">Login</h2>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
            className="login__form"
          >
            {/* Username */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<UserOutlined />}
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
                <a href="#" className="login__forgot">
                  Forgot password?
                </a>
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
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="login__footer">
            Don’t have an account?{' '}
            <a href="#" className="login__register">
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
