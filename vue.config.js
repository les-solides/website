const Dotenv = require("dotenv-webpack");

module.exports = {
	configureWebpack: {
		plugins: [
			new Dotenv()
		],
	},
	devServer: {
		host: 'localhost',
		hot: true,
		https: {
			key: './ssl/localhost.key',
			cert: './ssl/localhost.crt'
		}
	}
}