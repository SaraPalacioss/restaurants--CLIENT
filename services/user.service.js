import axios from 'axios';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { APIURL } = publicRuntimeConfig

const baseUrl = `${APIURL}/api/auth`;

class UserService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}


	register = (user) => {
		return this.instance
			.post('/register', user)
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	}

	login = (user) => {
		return this.instance
			.post('/login', user)
			.then(res => Promise.resolve(res.data))
			.catch((err) => console.error(err));
	};

	loggedin = () => {
		return this.instance.get('/loggedin')
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	}

	logout = () => {
		return this.instance.post('/logout')
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	}
		;


	addFavourite = (restaurantID, userID) => {
		return this.instance
			.post(`/favourites`, { restaurantID: restaurantID, userID: userID })
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	};
	deleteFavourite = (restaurantID, userID) => {
		return this.instance
			.post(`/deletefavourite`, { restaurantID: restaurantID, userID: userID })
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	};
}

const userService = new UserService();

export default userService;
