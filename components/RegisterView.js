import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/router';
import userService from '../services/user.service';
import MyLayout from "../layouts/Layout";
import AuthForm from '../components/AuthForm';


const RegisterView = () => {
    const { setAlert, setMessage, loggedIn, alert, message, credentials, setCredentials } = useAuthContext()
    const router = useRouter();

    const handleChange = e => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSignUp = e => {
        e.preventDefault()
        userService
            .register(credentials)
            .then((res) => {
                if (res.username) {
                    setMessage()
                    setAlert(false)
                    router.push(`/auth/login`)
                } else {
                    setMessage(res.message)
                    setAlert(true)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="container" >
            {!loggedIn ? <AuthForm
                username={credentials.username}
                password={credentials.password}
                message={message}
                handleChange={handleChange}
                submitMethod={handleSignUp}
                spaninfo={`Don't have an account? login `}
                spanlink={`here`}
                href={`/auth/login`}
                textButton={`Register`}
            /> : <p>Hey dude! you are already login here 😎</p>}

        </div>
    );
}

RegisterView.Layout = MyLayout


export default RegisterView;





