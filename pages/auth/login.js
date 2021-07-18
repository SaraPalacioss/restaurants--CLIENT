import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap';
import Link from 'next/link'

const LoginUser = () => {
  const { setAlert, setMessage,alert, message, checkIfLoggedIn, credentials, setCredentials } = useAuthContext()
  const router = useRouter();



  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

  };

  const handleLogin = (e) => {

    e.preventDefault();
    userService
      .login(credentials)
      .then((res) => {
        if (res.username) {
          checkIfLoggedIn()
          setMessage()
          setAlert(false)
          router.push(`/`)
          console.log('huhu')

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

      <div >
        <form onSubmit={handleLogin} className="form form-container form-align">
        {alert && <span>{message}</span>}
          <div>
            <label htmlFor="Username">Username</label>

            <input
              onChange={handleChange}
              value={credentials.username}
              name="username"
              id="username"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              value={credentials.password}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <span>Don't have an account? register <Link href="/auth/register">here</Link></span>
          <div className="btn-group">
            <Button variant="light"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginUser.Layout = MyLayout
export default LoginUser;








