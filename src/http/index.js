import axios from "axios"

const instance = axios.create({
    baseURL: '/api'
});

instance.interceptors.response.use((res) => {
    const { Code, Message, Data } = res.data;
    if (Code === 100) {
        return Data;
    }
    return Promise.reject(Message);
},
    () => {
        return Promise.reject('请求服务器失败')
    });

const buildformData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
    })
    return formData;
}

export default {
    getCategories() {
        return instance.get('/classify/list')
    }
}