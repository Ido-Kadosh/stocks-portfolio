import { IStock } from '../interfaces/stock.interface';
import { httpService } from './http.service';

const BASE_URL = 'stocks/';

const query = async (pageNumber: number = 5): Promise<{ stocks: IStock[]; count: number }> => {
	return httpService.get(BASE_URL, { page: pageNumber });
};

const addUserStock = async (stock: IStock): Promise<IStock[]> => {
	return httpService.put(BASE_URL + 'user/', stock);
};

const getUserStocks = async (): Promise<IStock[]> => {
	return httpService.get(BASE_URL + 'user/');
};

const removeUserStock = async (stock: IStock): Promise<IStock[]> => {
	return httpService.delete(BASE_URL + 'user/' + stock.symbol);
};

export const stockService = {
	query,
	addUserStock,
	getUserStocks,
	removeUserStock,
};
