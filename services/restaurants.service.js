import axios from 'axios';

const baseUrl = `${process.env.URL}/api/restaurants`;

class RestaurantsService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}
	
	getAllRestaurants = () => this.instance.get('/');
    getRestaurantDetails = (id) => this.instance.get(`/${id}`);
    editRestaurantDetails = (id) => this.instance.post(`/${id}`);
    addNewRestaurant = (id) => this.instance.get(`/new`);
    deleteRestaurant = (id) => this.instance.delete(`/${id}`);
}

const restaurantsService = new RestaurantsService();

export default restaurantsService;
