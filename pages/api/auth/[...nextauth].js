import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import userService from '../../../services/user.service'


export default NextAuth({
	providers: [
		Providers.Credentials({
			name: 'credentials',

			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Your email' },
				password: { label: 'Password', type: 'password', placeholder: 'Your password' },
			},

			authorize: async (credentials) => {

				const { username, password } = credentials;

				const theUser = await userService
					.register(credentials)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => console.error(err));

				if (theUser) return theUser;
				return null;
			},
		}),
	],

	pages: {
		signIn: '/auth/login',
	},
	site: 'http://localhost:3001',


	theme: 'light',
})

