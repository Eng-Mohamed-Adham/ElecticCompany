import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersApiSlice";
import { selectAllParts } from "../features/parts/partsApiSlice";
import {selectAllNotes} from '../features/notes/notesApiSlice'
import {selectAllClients} from '../features/clients/clientApiSlice'

const useData = () => {
    const users = useSelector(selectAllUsers)
    const notes = useSelector(selectAllNotes)
    const parts = useSelector(selectAllParts)
    const clients = useSelector(selectAllClients)
    return{
        users,
        notes,
        parts,
        clients
    }
}
 
export default useData;