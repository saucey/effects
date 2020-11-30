import axios from 'axios';

const mediaRegisteredApi = async (url, data) => {
	try {
		const resp = await axios.post(url, data);
		console.log(resp, 'Sucecess the api service!!!!')
		return resp

	} catch (error) {
		throw error.response.data.error
	}
}

export default mediaRegisteredApi;