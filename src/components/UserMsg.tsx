import { useEffect, useRef } from 'react';
import { systemStore } from '../store/SystemStore';
import { observer } from 'mobx-react';
import { Alert } from 'antd';
const UserMsg = () => {
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>();
	const msg = systemStore.msg;

	const closeMsg = () => {
		systemStore.setMsg(null);
	};

	useEffect(() => {
		if (msg !== null) {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
			timeoutIdRef.current = setTimeout(closeMsg, 3000);
		}
	}, [msg]);
	return (
		<>
			{msg && (
				<Alert
					message={msg.txt}
					type={msg?.type}
					showIcon
					style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999, minWidth: 'max' }}
				></Alert>
			)}
		</>
	);
};

export default observer(UserMsg);
