import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, 
  create,
  updatePerson,
  deletePerson
}