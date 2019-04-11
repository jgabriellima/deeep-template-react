import axios from 'axios';
import apiRoutes from './apiRoutes';

let auth = {};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

axios.interceptors.request.use(request => {
    const token = window.localStorage.getItem('deeep.public.token');
    if (token) {
        request.headers.common['Authorization'] = token;
    }
    return request;
});

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    try {
        if (error.response.status === 401) {
            auth = {};
            window.localStorage.removeItem('deeep.public.token');
        }
    } catch (e) {
        console.log(error);
    }
    return Promise.reject(error.response);
});

const prepareUrl = (route) => {
    let url = `${process.env.REACT_APP_API}${route.url}`;
    if (route.private) {
        url += `?apikey=${auth.token || window.localStorage.getItem('deeep.public.token')}`
    }
    return url;
};

const get = async (route) => {
    return axios.get(prepareUrl(route), {headers});
};

const post = async (route, body) => {
    return axios.post(prepareUrl(route), body, {headers});
};

const put = async (route, body) => {
    return axios.put(prepareUrl(route), body, {headers});
};

const del = async (route) => {
    return axios.delete(prepareUrl(route), {headers});
};

const setAuth = user => {
    this.auth = user;
};

const getSaliencyImg = (id, cache=true) => {
    const route = Object.assign({},apiRoutes.Processes.getSaliency);
    route.url = route.url.replace(':id', id);
    const url = cache ? prepareUrl(route) : `${prepareUrl(route)}&version=${Date.now()}`;
    return url;
};

export default {
    get,
    post,
    put,
    del,
    setAuth,
    getSaliencyImg,
}
