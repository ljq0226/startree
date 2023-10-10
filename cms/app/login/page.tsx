'use client'
import { Avatar, Form, Input, Checkbox, Button, TabsProps, Tabs } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserStore } from '@/store';
import { redirect } from 'next/navigation';

import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = UserStore(s => [s.user, s.setUser])
  const clickHandle = () => {
    console.log('name', name)
    console.log('password', password)
    setUser({ ...user, name })
    console.log(user)
    router.push('/home')
  }
  const LoginForm = () => (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input allowClear prefix={<UserOutlined rev={undefined} />} placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password value={password} prefix={<LockOutlined rev={undefined} />} type="password" placeholder="请输入密码" />
      </Form.Item>

      <Form.Item>
        <Button className='w-full' onClick={(e) => {
          e.preventDefault()
          clickHandle()
        }}>Login</Button>
      </Form.Item>
    </Form>
  )
  const RegisterForm = () => (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input allowClear prefix={<UserOutlined rev={undefined} />} placeholder="账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password prefix={<LockOutlined rev={undefined} />} type="password" placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Button className='w-full' onClick={clickHandle}>Register</Button>
      </Form.Item>
    </Form>
  )
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '登录',
      children: <LoginForm />
    },
    {
      key: '2',
      label: '注册',
      children: <RegisterForm />
    },
  ];


  return (
    <div className='flex w-full h-screen bg-center bg-no-repeat bg-cover border login flex-center'
    >
      <div className={'loginTop flex flex-center '}>
        <h1 className='text-3xl'>论坛后台管理系统</h1>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default page
