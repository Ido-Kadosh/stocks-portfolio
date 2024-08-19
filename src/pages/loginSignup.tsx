import { Button, Form, FormProps, Input } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICredentials } from '../interfaces/user.interface';
import { systemStore } from '../store/SystemStore';
import { userStore } from '../store/UserStore';

const LoginSignUp = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setIsSignUp(location.pathname.includes('signup'));
	}, [location]);

	const onSubmit: FormProps<ICredentials>['onFinish'] = async credentials => {
		try {
			const authFunction = isSignUp ? 'signUp' : 'login';
			const user = await userStore[authFunction](credentials);
			const successMsg = `${isSignUp ? 'signUp' : 'login'} successful`;
			systemStore.showSuccessMsg(successMsg);
			navigate('/');
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Something went wrong';
			systemStore.showErrorMsg(errorMsg);
		}
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			autoComplete="off"
		>
			<Form.Item<ICredentials>
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<ICredentials>
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					{isSignUp ? 'Sign Up' : 'Login'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default observer(LoginSignUp);
