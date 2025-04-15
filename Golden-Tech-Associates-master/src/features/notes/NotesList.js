import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
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
        label: 'Status',
        dataKey: 'Status',
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
        label: 'Updated',
        dataKey: 'Updated',
        numeric: true,
    },
    {
        width: 120,
        label: 'Title',
        dataKey: 'Title',
        numeric: true,
    },
    {
        width: 120,
        label: 'Owner',
        dataKey: 'Owner',
        numeric: true,
    },

    {
        width: 120,
        label: 'Manage',
        dataKey: 'Manage',
        numeric: true,
    },
    {
        width: 120,
        label: 'Edit',
        dataKey: 'Edit',
        numeric: false,
    },
];

const NotesList = () => {
    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined, {
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
        const { ids, entities } = notes
        let fillteredIds;
        if (isManager || isAdmin) {
            fillteredIds = [...ids]
        } else {
            fillteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && ids.map(noteId => <Note key={noteId} noteId={noteId} />)


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

        );
    }

    return content
}
export default NotesList