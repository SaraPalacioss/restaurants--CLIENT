import axios from 'axios';
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {APIURL} = publicRuntimeConfig

const baseUrl = `${APIURL}/api/auth`;

class UserService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			// withCredentials: true,
		});
	}
	login = (user) => this.instance.post('/login', user);
    register = (user) => this.instance.post(`/register`, user);
	logout = () => this.instance.post("/logout");
	loggedin = () => this.instance.get("/loggedin");
	logout = () => this.instance.post("/logout");

	  ;
}

const userService = new UserService();

export default userService;
