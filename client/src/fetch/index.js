import axios from "axios"

const baseimage = "http://localhost:4000/"

const requet = axios.create({
    baseURL: 'http://localhost:4000/api/',
});

export { baseimage }
export default requet
