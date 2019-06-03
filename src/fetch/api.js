import axios from 'axios';
import qs from 'qs'


axios.interceptors.request.use((config) => {
    
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

 

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then((res) => {
                resolve(res)
            })
            .catch(error => {
                console.log(error);
            })
    })
}


export default {
    mineBaseMsgApi() {
        return fetch('http://localhost:8002/list/news');
    },
    addNewsList(title) {
        return fetch('http://localhost:8002/list/addNews',title)
    }
}