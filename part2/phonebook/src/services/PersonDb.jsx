import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personData => {
    return axios.post(baseUrl, personData)
}

const update = (id, personData) => {
    return axios.put(`${baseUrl}/${id}`, personData)
}

const deleteData = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    deleteData
}