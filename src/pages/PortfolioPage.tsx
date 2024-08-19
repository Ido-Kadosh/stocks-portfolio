import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Button } from 'antd/es/radio';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import StockCard from '../components/StockCard';
import { IStock } from '../interfaces/stock.interface';
import { systemStore } from '../store/SystemStore';
import { userStore } from '../store/UserStore';
const PortfolioPage = () => {
	useEffect(() => {
		try {
			userStore.getUserStocks();
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Something went wrong';
			systemStore.showErrorMsg(errorMsg);
		}
	}, []);

	const onRemoveUserStock = async (stock: IStock) => {
		try {
			await userStore.removeUserStock(stock);
			systemStore.showSuccessMsg('successfully removed stock');
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Something went wrong';
			systemStore.showErrorMsg(errorMsg);
		}
	};

	if (!userStore.user) return <div>Please login to view this page</div>;
	if (!userStore.userStocks.length && !systemStore.isLoading) return <div>No stocks added yet.</div>;
	return (
		<div className="flex flex-col flex-1">
			{!systemStore.isLoading && (
				<div className="overflow-auto flex-1">
					<div className="grid grid-cols-3 gap-4">
						{userStore.userStocks.map(stock => (
							<StockCard stock={stock} key={stock.symbol}>
								<Button
									onClick={() => {
										onRemoveUserStock(stock);
									}}
									type="primary"
								>
									Remove from portfolio
								</Button>
							</StockCard>
						))}
					</div>
				</div>
			)}
			{systemStore.isLoading && (
				<div className="flex-1">
					<Spin indicator={<LoadingOutlined spin />} size="large" />
				</div>
			)}
		</div>
	);
};

export default observer(PortfolioPage);
