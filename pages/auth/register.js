import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import AuthForm from '../../components/AuthForm';
import RegisterView from '../../components/RegisterView';


const RegisterUser = () => {



  return (
    <div className="container" >
      <RegisterView
      />
    </div>
  );
}

RegisterUser.Layout = MyLayout


export default RegisterUser;





