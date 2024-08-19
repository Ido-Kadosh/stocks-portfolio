import { action, makeObservable, observable } from 'mobx';
import { ICredentials, IUser } from '../interfaces/user.interface';
import { authService } from '../services/auth.service';
import { IStock } from '../interfaces/stock.interface';
import { stockService } from '../services/stock.service';

class UserStore {
	user: IUser | null = authService.getLoggedInUser();
	userStocks: IStock[] = [];

	constructor() {
		makeObservable(this, {
			user: observable,
			login: action,
			logOut: action,
			signUp: action,
			userStocks: observable,
			addUserStock: action,
			getUserStocks: action,
			removeUserStock: action,
		});
	}
	logOut = async () => {
		await authService.logout();
		this.user = null;
	};

	signUp = async (credentials: ICredentials) => {
		const user = await authService.signup(credentials);
		this.user = user;
	};

	login = async (credentials: ICredentials) => {
		const user = await authService.login(credentials);
		this.user = user;
	};

	addUserStock = async (stock: IStock) => {
		const userStocks = await stockService.addUserStock(stock);
		this.userStocks = userStocks;
	};

	getUserStocks = async () => {
		const userStocks = await stockService.getUserStocks();
		this.userStocks = userStocks;
	};

	removeUserStock = async (stock: IStock) => {
		const userStocks = await stockService.removeUserStock(stock);
		this.userStocks = userStocks;
	};
}

export const userStore = new UserStore();
