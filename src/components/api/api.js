import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000000,
    responseType: "json",
    withCredentials: false,
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})