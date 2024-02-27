import {$authHost, $host} from "../../App/http";
import {jwtDecode} from "jwt-decode";
import {User} from "../../entities/user";

const url = import.meta.env.VITE_API_URL
    ?import.meta.env.VITE_API_URL+'api/user'
    :'http://localhost:5000/api/user'
export const registration = async (name: string, password: string) => {
  const {data} = await $host.post(url+'/registration', {name, password})
  document.cookie = `token=${data.token}`
  return jwtDecode<User>(data.token)
}
export const login = async (name: string, password: string) => {
  const {data} = await $host.post(url+'/login', {name, password})
  document.cookie = `token=${data.token}`
  return jwtDecode<User>(data.token)
}
export const check = async () => {
  const {data} = await $authHost.get(url+'/check')
  document.cookie = `token=${data.token}`
  return jwtDecode<User>(data.token)
}
