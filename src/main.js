import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/less/index.less'
import Axios from './http'
import 'lib-flexible'

const app = createApp(App)

// 给 axios 设置请求根路径
Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3000/api'
app.config.globalProperties.$axios = Axios
app.config.globalProperties.$message = ElMessage;
app.use(ElementPlus)

app.use(store).use(router).mount('#app')