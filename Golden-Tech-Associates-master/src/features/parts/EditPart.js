import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPartsById } from './partsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditPartForm from './EditPartForm'

const EditPart = () => {
    const { id } = useParams()
    const part = useSelector(state => selectPartsById(state, id))
    const users = useSelector(selectAllUsers)

    const content = part  ? <EditPartForm part={part}  /> : <p>Loading...</p>

    return content
}
export default EditPart