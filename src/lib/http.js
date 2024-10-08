import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5186"
})

instance.interceptors.request.use({
    function(config) {
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
})


export default instance