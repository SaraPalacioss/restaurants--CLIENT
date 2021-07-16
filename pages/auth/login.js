

import { useRouter } from 'next/router';
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client';

import React, { useEffect, useState } from 'react';
import router from 'next/router';
import userService from '../../services/user.service';
import { useAuthContext } from '../../context/authContext';


const LoginUser = () => {
  const { user, loggedIn,session, setUser, setLoggedIn, setSession} =useAuthContext()

  

	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});



	


  const handleLogin = (e) => {
  
    e.preventDefault()
    userService.login(credentials)
    .then(
      (user) => {
        router.push("/")
        setLoggedIn(true)
        setUser(user.data.username)

      },
      (error) => {
        console.error(error)
      }
    )
  }



	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({
			...credentials,
			[name]: value,
		});
	
	};



    return (
        <div >
         {!session && <>
     <div>
     <form noValidate onSubmit={handleLogin}>
             
            
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
             
              <div>
                <button
                 
                  type="submit"
                  
                >
                  Login
                </button>
              </div>
            </form>
     </div>
    </>}
    {session && <>
      Signed  <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
      </div>
    );
}


export default LoginUser;







// const validators = {
// 	username: (value) => {
// 		let message;
// 		if (!value) message = 'Username is required';
// 		return message;
// 	},
// 	password: (value) => {
// 		let message;
// 		if (!value) message = 'Password is required';
// 		else if (value.length < 6) message = 'Password must be longer than 6 characters';
// 		return message;
// 	},
// };


