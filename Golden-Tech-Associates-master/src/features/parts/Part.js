import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPartsById } from './partsApiSlice'
import useAuth from '../../hooks/useAuth'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Part = ({ partId }) => {
    const {isManager,isAdmin} = useAuth()


    const part = useSelector(state => selectPartsById(state, partId))
    const navigate = useNavigate()

    if (part) {
        const created = new Date(part.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(part.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/parts/${partId}`)
        let editButton;
        if(isManager || isAdmin) {
            editButton = (

            <button
                className="icon-button table__button"
                onClick={handleEdit}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            
            )
        }
        return (
                <TableRow>

            
                <TableCell
                    align='right'
                    >{part.name}</TableCell>

                <TableCell
                    align='right'
                    >{created}</TableCell>
                <TableCell
                    align='right'
                    >{part.desc}</TableCell>
                 <TableCell
                    align='right'
                    >{part.productiondate}</TableCell>
                 <TableCell
                    align='right'
                    >{part.count}</TableCell>
                     <TableCell
                    align='right'
                    >{part.buy}</TableCell>
                 <TableCell
                    align='right'
                    >

                {editButton}
                </TableCell>
                </TableRow>
        )
            

    } else return null
}
export default Part