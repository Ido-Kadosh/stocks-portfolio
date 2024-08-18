import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../interfaces/user.interface';
import { authService } from '../services/auth.service';

class UserStore {
	user: IUser | null = authService.getLoggedInUser();

	constructor() {
		makeObservable(this, {
			user: observable,
			setUser: action,
		});
	}

	setUser = (user: IUser) => {
		this.user = user;
	};
}

export const userStore = new UserStore();
