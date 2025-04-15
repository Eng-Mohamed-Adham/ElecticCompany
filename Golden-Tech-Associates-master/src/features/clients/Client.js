import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


import { useSelector } from 'react-redux';
import {selectClientById} from './clientApiSlice'
import { TableRow,TableCell, Button, Typography } from '@mui/material';
import {selectAllNotes} from '../notes/notesApiSlice'
import { useEffect } from 'react';

const Client = ({clientId}) => {
    const client = useSelector(state => selectClientById(state,clientId))
    const navigate = useNavigate()

    const Notes = useSelector(selectAllNotes)


    const commonClientIdsArray = [];

    for (const obj of Notes) {
        if (obj.clientId == clientId){
       
          commonClientIdsArray.push(obj.title);
        }
      }


    if(client) {
        const handleEdit = () =>  navigate(`/dash/clients/${clientId}`)

        // const clientordersString = client.orders.toString().replaceAll(',',', ')

        return (
            <TableRow>
            <TableCell>{client.username}</TableCell>
            <TableCell>{commonClientIdsArray.map(item => {
                return(
                    <p style={{display:'inline-flex'}}>{item},</p>
                )
            })}</TableCell>
            <TableCell>
                <Button
                component='button'
                    onClick={handleEdit}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </TableCell>
        </TableRow>
        )
    }
}

export default Client