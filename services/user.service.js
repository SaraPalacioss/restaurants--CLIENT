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
	login = () => this.instance.post('/login');
    register = (id) => this.instance.get(`/register`);
}

const userService = new UserService();

export default userService;
