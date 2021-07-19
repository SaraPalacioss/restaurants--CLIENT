import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../../context/authContext';

import NewRestaurantForm from '../../components/NewRestauranteForm';
import LoginUserView from "../../components/LoginView";

const NewResturant = () => {
    const { getUser, restaurants, currentUser, setViewFav, loadingFavDetails, viewFav, loggedIn, session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession } = useAuthContext()


    return (

        <div>
           {loggedIn ?<NewRestaurantForm /> : <LoginUserView/> } 
        </div>
    )
}


NewResturant.Layout = MyLayout

export default NewResturant;
