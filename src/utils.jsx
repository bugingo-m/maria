import axios from 'axios'


const customFetch = axios.create({
    baseURL:'http://localhost:5000/api/maria'
})

export default customFetch