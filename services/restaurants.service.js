import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import axios from 'axios';

const { APIURL } = publicRuntimeConfig

const baseUrl = `${APIURL}/api/restaurants`;

class RestaurantsService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}
	getAllRestaurants = () => this.instance.get('/');

	getRestaurantDetails = (id) => {
		return this.instance
			.get(`/${id}`)
			.then(res => Promise.resolve(res))
			.catch(error => console.error(error))
	}

	myfavourites = () => this.instance.get(`/myfavourites`);

	editRestaurantDetails = (id, restaurant) => this.instance.post(`/${id}`, restaurant);

	addNewRestaurant = (restaurant) => this.instance.post(`/new`, restaurant);
	
	deleteRestaurant = (id) => this.instance.delete(`/${id}`);
}

const restaurantsService = new RestaurantsService();

export default restaurantsService;
