import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import { selectAllClients  } from "../clients/clientApiSlice"

const NewNote = () => {

    


    let content


    const users = useSelector(selectAllUsers)
    const clients = useSelector(selectAllClients)


    if (!users?.length) return <p>Not Currently Available</p>
    if(!clients?.length) return <p>uploading Clients....</p>

    content = <NewNoteForm users={users} clients={clients} /> 



    return content

}

export default NewNote