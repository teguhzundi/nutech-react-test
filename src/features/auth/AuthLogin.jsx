import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from './auth.slice';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const AuthLogin = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ auth }) => auth.authLoading);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await dispatch(authLogin(values)).unwrap();
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="flex bg-white h-full flex-col md:flex-row">
      <div className="md:flex-1 bg-blue-200 flex md:items-center md:justify-center flex-col p-4">
        <h3 className="mb-2">React Test</h3>
        <p className="mt-0">Silahkan isi username dan password untuk masuk ke halaman admin.</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="md:min-w-[300px]">
          <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthLogin);
