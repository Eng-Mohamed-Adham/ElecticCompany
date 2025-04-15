import Client from './Client'
import { useGetClientsQuery } from "./clientApiSlice";

import * as React from 'react';
import { selectAllClients } from './clientApiSlice';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




const columns = [
    {
        width: 60,
        label: 'username',
        dataKey: 'username',
        numeric: false,

    },
    {
        width: 60,
        label: 'Orders',
        dataKey: 'Orders',
        numeric: false,
    },
    {
        width: 60,
        label: 'Edit',
        dataKey: 'Edit',
        numeric: false,
    },
];

const ClientsList = () => {


   
    const {
        data: clients,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetClientsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    // console.log(clients)
   
 

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = clients

        const tableContent = ids?.length&& ids.map(clientId => <Client key={clientId} clientId={clientId} />)
    
        

        content = (
            <TableContainer
            sx={{
                height:'500px',
                margin:'20px',
                marginTop:'100px',
                borderRadius:'10px',
                order:{xs:2,md:1}


                }}
            >
            <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.dataKey}
                            variant="head"
                            align={column.numeric || false ? 'right' : 'left'}
                            style={{ width: column.width }}
                            sx={{
                                backgroundColor: 'background.paper',
                            }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
            </TableContainer>

        )
    }

    return content
}
export default ClientsList