import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import { Button } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";
import Link from 'next/link'


const RegisterUser = () => {
  const { setAlert, setMessage, alert, message, credentials, setCredentials } = useAuthContext()
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
      <div>
        <form noValidate onSubmit={handleSignUp} className="form form-container form-align">
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
          <span>Have an account? login <Link href="/auth/login">here</Link></span>
          <div className="btn-group">
            <Button variant="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

RegisterUser.Layout = MyLayout


export default RegisterUser;





