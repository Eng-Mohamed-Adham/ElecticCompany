import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useGetUsersQuery } from "./usersApiSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function UsersTable() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const navigate = useNavigate()
    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }
    const style = {
        Container: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
        }
    }

    if (isSuccess) {
        if (users) {
            const { entities } = users;

            function createData(object) {
                const { id, active, roles, username, image } = object;
                return { id, active, roles, username, image };
            }

            let obj = [];

            for (let key in entities) {
                obj.push(createData(entities[key]));
            }

            content = (
                <TableContainer
                sx={{
                    height:'500px',
                    borderRadius:'10px',
                    background:'#fff',
                    margin:'20px',
                    marginTop:'100px',
                    order:{xs:2,md:1}
                    }}
                 >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Image:</TableCell>
                                <TableCell align="right">Name:</TableCell>
                                <TableCell align="left">Status:</TableCell>
                                <TableCell align="left">Edit:</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {obj.map((row) => {
                                const handleEdit = () =>  navigate(`/dash/users/${row.id}`)

                                return(
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="right">
                                        <img
                                            style={style.Container}
                                            src={row.image}
                                            alt={row.username}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                    {row.username}
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                        row.roles.toString().replaceAll(',', ', ')
                                        }   
                                    
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                            component="button"                    onClick={handleEdit}
                                        >
                                                            
                                        <FontAwesomeIcon icon={faPenToSquare} />

                                        </Button>
                                        </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }

    return content;
}
