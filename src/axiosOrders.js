import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burgerbuilder-10fac.firebaseio.com/'
});

export default instance;