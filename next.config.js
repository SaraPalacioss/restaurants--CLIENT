
module.exports = {
	images: {
		domains: [
			'video-images.vice.com',
			'media-cdn.tripadvisor.com',
			'www.livingfla.com',
			'c8.alamy.com',
			'es.nycgo.com',
			'www.wazwu.com',
			'resizer.otstatic.com',
			'i.pinimg.com',
			'media.istockphoto.com',
		],
	},
  reactStrictMode: true,
  publicRuntimeConfig: {
    APIURL: process.env.APIURL
  },
  source: "/api/:path*",
  headers: [
	{ key: "Access-Control-Allow-Credentials", value: "true" },
	{ key: "Access-Control-Allow-Origin", value: "*" },
	{ key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
	{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  ]
};
