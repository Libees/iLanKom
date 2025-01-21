import axios, { Axios } from "axios"
import { Alert } from "react-native"
import { CONFIG_STORAGE_KEY, LAN_URL } from "../constansts/config"
import { isValidIP } from "./utils"
import { store } from '../redux/redux';
const request = axios.create({
    timeout: 1000,
    baseURL: LAN_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

request.interceptors.request.use(async (request) => {
    const config  = store.getState()
    console.log('config=======',config)
    if(!config?.ip) {
        throw Promise.reject({error:{text:'服务器地址不能为空',code: -1}})
    } 
    if(!isValidIP(config.ip)) {
        throw Promise.reject({error:{text:'服务器地址不能为空',code: -2}})
    }
    request.baseURL = `http://${config.ip}`
    return request
})


request.interceptors.response.use((response) => {
    const {data,status} = response
    if(status === 200) return data
    return data
})

export default request