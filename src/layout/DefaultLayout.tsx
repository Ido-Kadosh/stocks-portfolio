import { DesktopOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { userStore } from '../store/UserStore';
import { observer } from 'mobx-react';
import { systemStore } from '../store/SystemStore';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem(<Link to="/">Stocks</Link>, '/', <PieChartOutlined />),
	getItem(<Link to="/portfolio">Portfolio</Link>, '/portfolio', <DesktopOutlined />),
];

const DefaultLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const location = useLocation();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={[location.pathname]} />
			</Sider>

			<Layout className="max-h-screen">
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<div className="flex gap-4">
						{!userStore.user && <Link to={'/signup'}>Sign up</Link>}
						{!!userStore.user && (
							<div>
								<span>Logged in by: {userStore.user.email}</span>
								<Button type="primary" icon={<LogoutOutlined />} onClick={userStore.logOut}>
									Logout
								</Button>
							</div>
						)}
					</div>
				</Header>
				<Content style={{ margin: '0 16px' }} className="flex-1">
					<div
						style={{
							padding: 24,
							flex: 1,
							height: '100%',
							display: 'flex',
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Stock Portfolio ©{new Date().getFullYear()} Created by Ido Kadosh
				</Footer>
			</Layout>
		</Layout>
	);
};

export default observer(DefaultLayout);
