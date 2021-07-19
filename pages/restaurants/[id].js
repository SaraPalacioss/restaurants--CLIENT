import MyLayout from "../../layouts/Layout";
import RestaurantDetailsView from '../../components/RestaurantDetailsView.js';

const RestaurantDetails = () => {

    return (
        <div>
            <RestaurantDetailsView />
        </div>
    );
}


RestaurantDetails.Layout = MyLayout

export default RestaurantDetails;