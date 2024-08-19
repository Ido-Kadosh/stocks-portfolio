import { Card } from 'antd';
import React from 'react';
import { IStock } from '../interfaces/stock.interface';

interface PropTypes {
	stock: IStock;
	children?: React.ReactNode;
}

const StockCard = ({ stock, children }: PropTypes) => {
	return (
		<Card title={stock.name} bordered>
			<div className="flex justify-between mb-2">
				<p>{stock.exchange}</p>
				<p>{stock.price}$</p>
			</div>
			{children}
		</Card>
	);
};

export default StockCard;
