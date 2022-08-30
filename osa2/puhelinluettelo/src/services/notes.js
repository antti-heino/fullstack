import axios from "axios";

const getAll = () =>
    axios
        .get(`http://localhost:3002/persons`)
        .then((response) => response.data)

const create = (contact) =>
    axios
        .post(`http://localhost:3002/persons`, contact)
        .then(response => response.data)

const update = (id, contact) =>
    axios
        .put(`http://localhost:3002/persons/${id}`, contact)
        .then(response => response.data)

const remove = (id) =>
    axios
    .delete(`http://localhost:3002/persons/${id}`)


export default { getAll, remove, update, create }