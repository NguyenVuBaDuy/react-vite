import axios from './axios.customize';

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user"
    const data = { fullName, email, password, phone }

    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = () => {

}

export {
    createUserAPI,
    updateUserAPI
}