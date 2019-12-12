import axios from 'axios';
import router from './router';
import { MessageBox } from 'mint-ui';

//请求拦截
axios.interceptors.request.use(req => {
    if (localStorage.usertoken) {
        req.headers.Authorization = localStorage.usertoken
    }
    return req;
}, err => {
    return Promise.reject(err)
})
//响应拦截
axios.interceptors.response.use(res => {
    if (res.data.statu) {
        if (res.data.statu == 401) {
            localStorage.removeItem('usertoken')
            MessageBox('提示', '登陆过期请重新登录');
            router.push('/login')
            return
        }
        return res;
    }
    return res;
}, err => {
    return Promise.reject(err)
})

export default axios;