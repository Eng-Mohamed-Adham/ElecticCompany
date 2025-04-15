import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditClientForm from './EditClientForm'
import {selectClientById} from './clientApiSlice'

const EditClient = () => {
    const { id } = useParams()

    const client = useSelector(state => selectClientById(state, id))

    const content = client ? <EditClientForm client={client} /> : <p>Loading...</p>

    return content
}
export default EditClient