import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import userService from '../../../services/user.service'


export default NextAuth({
	providers: [
		Providers.Credentials({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'credentials',

			// The fields of the form
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Your email' },
				password: { label: 'Password', type: 'password', placeholder: 'Your password' },
			},

			// Authorization logic
			authorize: async (credentials) => {
				
				const { username, password } = credentials;
			

				const theUser =  await userService
                .register(credentials)
                .then((res) => {
                    console.log(res.data); 
            } )
                .catch((err) => console.error(err));


				//If no error and we have user data, return it
				if (theUser) return theUser;
				//Return null if user data could not be retrieved
				return null;
			},
		}),
	],

	// //Custom auth pages
	pages: {
		signIn: '/auth/login',
	},
	site:  'http://localhost:3001',


	theme: 'light',
})

