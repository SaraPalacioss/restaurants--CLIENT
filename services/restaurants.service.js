import axios from 'axios';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
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
	getRestaurantDetails = (id) => this.instance.get(`/${id}`);


	myfavourites = (id) => {
		return this.instance.get('/myfavourites', id)
			.then(res => Promise.resolve(res.data))
			.catch(error => console.error(error))
	}
	editRestaurantDetails = (id, restaurant) => this.instance.post(`/${id}`, restaurant);
	addNewRestaurant = (restaurant) => this.instance.post(`/new`, restaurant);
	deleteRestaurant = (id) => this.instance.delete(`/${id}`);
}

const restaurantsService = new RestaurantsService();

export default restaurantsService;
