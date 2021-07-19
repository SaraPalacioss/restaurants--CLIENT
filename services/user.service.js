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

	getUser = (id) => {
		return this.instance.post('/get-user', { id: id })
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	}

	loggedIn = () => {
		return this.instance.get('/loggedin', {
			headers: {
				'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjFhMjA0MDYxOTY0NDYyNzRlMDNkMyIsInVzZXJuYW1lIjoiMTJAMTIuY29tIiwiZmF2b3VyaXRlcyI6WyI2MGYyYmZlNTkwOTFkYjkxZmVhZGIxZTUiLCI2MGY0MTZhMDQ0OWZhNDFhZGJjNDk5NGUiLG51bGwsIjYwZjM5MmViZjg0YTdhMDlmZjRkMjA1OCIsIjYwZjJiZmU1OTA5MWRiOTFmZWFkYjFjZCIsIjYwZjJiZmU1OTA5MWRiOTFmZWFkYjFkMSJdLCJpYXQiOjE2MjY2MzcyODgsImV4cCI6MTY1ODE5NDIxNH0.o4CFJReVE0irE7yVuVuTG2onjouYxPV_R6KAdYZLOUk',
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				console.lod(response)
			})
			.catch((error) => {
			});
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
