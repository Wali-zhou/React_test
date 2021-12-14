/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react'
import {
  Form, Input, Button, Checkbox, message, Modal,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginAction, isloadingAction } from '../redux/actions/actions'
import { getLogin, getRegister } from '../service/api'

const Login = function Login(props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const onFinish = (values) => {
    // console.log(values)
    const { username } = values
    props.handleLoading(true)
    getLogin(JSON.stringify(values)).then((res) => {
      // console.log(res)
      if (res.data.isLogin) {
        message.success(res.data.msg)
        props.login(username)
        props.history.push('/shopcar')
        window.sessionStorage.setItem('isLogin', true)
        window.sessionStorage.setItem('username', username)
      } else {
        message.error(res.data.msg)
      }
    })
      .catch(() => {})
      .finally(() => { props.handleLoading(false) })
  }

  const register = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setRegisterLoading(false)
    setIsModalVisible(false)
  }

  const onRegisterFinish = (values) => {
    // console.log(values)
    setRegisterLoading(true)
    getRegister(JSON.stringify(values)).then((res) => {
      // console.log(res)
      const { data: { isSuccess, msg } } = res
      if (isSuccess) {
        message.success(msg)
        setIsModalVisible(false)
      } else {
        message.error(msg)
      }
      setRegisterLoading(false)
    }).catch(() => {})
  }

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300, margin: 'auto', marginTop: 30 }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Form.Item style={{ width: 130 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ width: 80 }}>
            <Button onClick={register}>Register</Button>
          </Form.Item>
          <Form.Item style={{ width: 70 }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Modal
        title="喜提账号一枚!"
        visible={isModalVisible}
        onCancel={handleCancel}
        cancelText="取消"
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]}
        destroyOnClose="true"
      >
        <Form
          name="normal_register"
          className="register-form"
          onFinish={onRegisterFinish}
          style={{ width: 300, margin: 'auto', marginTop: 30 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item style={{ width: 70 }}>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={registerLoading}>
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  login: (username) => { dispatch(loginAction(username)) },
  handleLoading: (data) => { dispatch(isloadingAction(data)) },
})

export default connect(null, mapDispatchToProps)(withRouter(Login))
