import axios from "axios";
import {getCookie} from "../../shared/lib/utils/getCookie.ts";

const baseURL=import.meta.env.VITE_API_URL || 'http://localhost:5000/'
export const $host = axios.create({
    baseURL: baseURL,
})
export const $authHost = axios.create({
    baseURL: baseURL,
})
function authInterceptor (config: any) {
    config.headers.authorization = `Barer ${getCookie('token')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)