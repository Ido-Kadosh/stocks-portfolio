import { LoadingOutlined } from '@ant-design/icons';
import { Button, Pagination, Spin } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import { IStock } from '../interfaces/stock.interface';
import { stockService } from '../services/stock.service';
import { systemStore } from '../store/SystemStore';
import { userStore } from '../store/UserStore';

const StocksPage = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [stocks, setStocks] = useState<IStock[]>([]);
	useEffect(() => {
		const getStocks = async () => {
			try {
				systemStore.setIsLoading(true);
				const { stocks, count } = await stockService.query(pageNumber);
				setPageCount(count);
				setStocks(stocks);
			} catch (err: any) {
				const errorMsg = err.response?.data?.message || 'Something went wrong';
				systemStore.showErrorMsg(errorMsg);
			} finally {
				systemStore.setIsLoading(false);
			}
		};
		getStocks();
	}, [pageNumber]);

	const onAddUserStock = async (stock: IStock) => {
		try {
			await userStore.addUserStock(stock);
			systemStore.showSuccessMsg('successfully added stock');
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Something went wrong';
			systemStore.showErrorMsg(errorMsg);
		}
	};

	return (
		<div className="flex flex-col flex-1">
			{!systemStore.isLoading && (
				<div className="overflow-auto flex-1">
					<div className="grid grid-cols-3 gap-4">
						{stocks.map(stock => (
							<StockCard stock={stock} key={stock.symbol}>
								<Button
									onClick={() => {
										onAddUserStock(stock);
									}}
									type="primary"
								>
									Add to portfolio
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
			<div className="my-4 self-center">
				<Pagination current={pageNumber} onChange={setPageNumber} total={pageCount} showSizeChanger={false} />
			</div>
		</div>
	);
};

export default observer(StocksPage);
