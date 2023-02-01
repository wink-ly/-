import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import router from './router/index'


// 请求拦截
axios.interceptors.request.use(config => {
    if (localStorage.mytoken) {
        // 设置统一的请求头 header
        config.headers.Authorization = localStorage.mytoken
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    return response
}, error => {
    // 错误提醒
    ElMessage.error(error.response.data)

    // 获取错误状态码
    const { status } = error.response
    if (status == 401) {
        ElMessage.error("token失效，请重新登录")
        // 清除token
        localStorage.removeItem('mytoken')
        // 重新跳转登录页面
        router.push("/login")
    }
    return Promise.reject(error)
})

export default axios