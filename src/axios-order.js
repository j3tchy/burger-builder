import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8e7cc.firebaseio.com/'
});

export default instance;