import getConfig from 'next/config'
import axios from 'axios';

const getNodeEnv = () => {
	const { publicRuntimeConfig } = getConfig();
  
	const APIURL = publicRuntimeConfig.APIURL || false;
  
	return  APIURL 
  };
  
  const env = getNodeEnv()
  
  console.log(env)

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
