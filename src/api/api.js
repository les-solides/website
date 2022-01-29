import axios from 'axios';

export default axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	headers: {
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}
});