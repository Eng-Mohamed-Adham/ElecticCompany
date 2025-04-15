import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { partsApiSlice } from '../parts/partsApiSlice';
import { clientsApiSlice } from '../clients/clientApiSlice';

const Prefetch = () => {
    useEffect(() => {
        const clients = store.dispatch(clientsApiSlice.endpoints.getClients.initiate())
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const parts = store.dispatch(partsApiSlice.endpoints.getParts.initiate())
       
        
        return () => {
            notes.unsubscribe()
            users.unsubscribe()
            parts.unsubscribe()
            clients.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch