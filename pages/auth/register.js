

import { useRouter } from 'next/router';
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client';

import React, { useEffect, useState } from 'react';
import router from 'next/router';
import userService from '../../services/user.service';



const RegisterUser = () => {

	const [session, setSession] = useSession();
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});


	

	useEffect(() => {
		if (session) router.push('/');
	}, [session]);


    const newUser = async (user) => {

        await userService
            .register(user)
            .then((res) => {
                console.log(res.data)
                router.push('/auth/login')
               
            }

            )
            .catch((err) => console.error('error', err));
    }
  


	const handleSubmit = async (e) => {
		e.preventDefault();
        const { username, password } = credentials;

        newUser({
            username, password
        })
      
			
		
	};

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
     <form noValidate onSubmit={handleSubmit}>
             
            
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
                  Register
                </button>
              </div>
            </form>
     </div>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
      </div>
    );
}


export default RegisterUser;







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


