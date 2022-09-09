import axios from 'axios'
const baseUrl = '/api/blogs'
let bearerToken = null

const setToken = token => {
  bearerToken = `bearer ${token}`
}
const createNew = async newObject=>{
const config = {
  headers: {Authorization: bearerToken}
}
const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, createNew, setToken }