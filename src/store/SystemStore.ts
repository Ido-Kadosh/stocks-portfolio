import { action, makeObservable, observable } from 'mobx';
import { IMsg } from '../interfaces/msg.interface';

class SystemStore {
	msg: IMsg | null = null;
	isLoading: boolean = false;

	constructor() {
		makeObservable(this, {
			msg: observable,
			setMsg: action,
			isLoading: observable,
			setIsLoading: action,
		});
	}

	setIsLoading = (isLoading: boolean) => {
		this.isLoading = isLoading;
	};

	setMsg = (msg: IMsg | null) => {
		this.msg = msg;
	};

	showErrorMsg = (...args: any[]) => {
		const txt = args.join(' ');
		this.setMsg({ type: 'error', txt });
	};

	showSuccessMsg = (...args: any[]) => {
		const txt = args.join(' ');
		this.setMsg({ type: 'success', txt });
	};
}

export const systemStore = new SystemStore();
