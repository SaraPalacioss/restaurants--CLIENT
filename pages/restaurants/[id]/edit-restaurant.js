import React, { useEffect } from 'react';

import MyLayout from "../../../layouts/Layout";
import { useAuthContext } from '../../../context/authContext';

import EditRestaurantView from '../../../components/EditRestaurantView';
import LoginUserView from '../../../components/LoginView';

const EditRestaurant = () => {

    const { loggedIn } = useAuthContext()

    return (
        <div>
            {loggedIn ? <EditRestaurantView /> : <LoginUserView />}
        </div>
    );
}

EditRestaurant.Layout = MyLayout

export default EditRestaurant;