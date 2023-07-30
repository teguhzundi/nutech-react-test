import React, { useCallback, useMemo } from 'react';
import { Button, Layout, Menu, Popconfirm } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../auth/auth.slice';

const { Header, Content, Sider } = Layout;

const PrivateLayout = () => {
  const menuItems = useMemo(() => {
    return [{ label: 'Barang', key: 'product', icon: <ProfileOutlined /> }];
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(authLogout());
    navigate('/auth/login');
  }, [dispatch, navigate]);

  return (
    <Layout className="h-full">
      <Sider breakpoint="lg" collapsedWidth="0" className="!bg-blue-100">
        <Menu
          defaultSelectedKeys={['product']}
          mode="inline"
          items={menuItems}
          className="p-3 !bg-blue-100"
        />
      </Sider>
      <Layout>
        <Header className="bg-blue-50 p-4 flex items-center justify-between">
          <div>
            <span className="font-bold">REACT</span> TEST
          </div>
          <div>
            <Popconfirm
              title="Konfirmasi"
              description="Yakin akan keluar ?"
              okText="Ya"
              cancelText="Tidak"
              onConfirm={handleLogout}>
              <Button type="primary" size="small" icon={<LogoutOutlined />}>
                Logout
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content className="overflow-y-auto bg-white">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default React.memo(PrivateLayout);
