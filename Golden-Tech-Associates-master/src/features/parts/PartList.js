import { useGetPartsQuery } from "./partsApiSlice"
import Part from "./Part"
import useAuth from "../../hooks/useAuth"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    {
        width: 120,
        label: 'name',
        dataKey: 'name',
        numeric: true,

    },
    {
        width: 120,
        label: 'Created',
        dataKey: 'Created',
        numeric: true,
    },
    {
        width: 120,
        label: 'Desc',
        dataKey: 'Desc',
        numeric: true,
    },
    {
        width: 120,
        label: 'ProductionDate',
        dataKey: 'ProductionDate',
        numeric: true,
    },
    {
        width: 120,
        label: 'Count',
        dataKey: 'Count',
        numeric: true,
    },

    {
        width: 120,
        label: 'Buy',
        dataKey: 'Buy',
        numeric: true,
    },
    {
        width: 60,
        label: 'Edit',
        dataKey: 'Edit',
        numeric: false,
    },
];
const PartsList = () => {
    const {username, isManager,isAdmin} = useAuth()

    const {
        data: parts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPartsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids,entities } = parts
        let fillteredIds;
        if(isManager || isAdmin){
            fillteredIds = [...ids]
        }else{
            fillteredIds = ids.filter(partId => entities[partId].username === username)
        }

        const tableContent = ids?.length&& ids.map(partId => <Part key={partId} partId={partId} />)
            

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
export default PartsList