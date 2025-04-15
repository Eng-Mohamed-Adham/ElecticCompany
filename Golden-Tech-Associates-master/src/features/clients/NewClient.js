import { useSelector } from 'react-redux'
import { selectAllClients } from '../clients/clientApiSlice'
import NewClientForm from './NewClientForm';


const NewNote = () => {
    const clients = useSelector(selectAllClients)

    if(!clients?.length) return <p>Not Currently Available....</p>
    
    const content = <NewClientForm  clients={clients} />

    return content
}
export default NewNote