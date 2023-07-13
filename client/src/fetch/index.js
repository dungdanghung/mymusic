import axios from "axios"

const baseimage = "http://localhost:4000/images/"

const requet = axios.create({
    baseURL: 'http://localhost:4000/api/',
});

export { baseimage }
export default requet
