import { useState, useEffect } from "react"
import { useUpdateClientMutation, useDeleteClientMutation } from "./clientApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { Box, Button, FormControlLabel, Typography } from "@mui/material"

const EditClientForm = ({ client }) => {

    const [updateClient, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateClientMutation()

    const [deleteClient, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteClientMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(client.username)
    const [location, setLocation] = useState(client.location)
    const [active, setActive] = useState(client.active)
    const [phonenumber, setPhoneNumber] = useState(client.phonenumber)




    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setLocation('')
            navigate('/dash/clients')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onLocationChanged = e => setLocation(e.target.value)
    const onPhoneChanged = e => setPhoneNumber(e.target.value)
    const onActiveChanged = () => setActive(pre => !pre)


    let canSave = [username,location,phonenumber].every(Boolean) && !isLoading
    const onSaveClientClicked = async (e) => {
        if (canSave) {
            await updateClient({ id: client.id, username,location, active, phonenumber })
            navigate('/dash/clients')


        } else {
            <Alert 
            severity="error"
            >All Fields Are Required!</Alert>
        }
    }

    const onDeleteClientClicked = async () => {
        await deleteClient({ id: client.id })
    }




    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const AlertErr = errContent ? (
        <Alert 
        severity="error"
        >{errContent}</Alert>
    ) : ''

    const content = (
        <>

            <Container maxWidth="xs">
            <CssBaseline />

            {AlertErr}

            <Box
            sx={{
                marginTop:9,
                display:'flex',
                flexDirection:'column',
                alignItems:'column'
            }}
            >
                
            <Box component='form'  onSubmit={e => e.preventDefault()}>
                
                    <Typography variant="h3">Edit User</Typography>
                  
                  
            

                <TextField
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    label="Username"
                    variant="outlined"
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                />


               

                <TextField
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="off"
                    value={location}
                    onChange={onLocationChanged}
                    label="Location"
                    variant="outlined"
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                />

          

                <TextField
                    id="Phone"
                    name="Phone"
                    type="tel"
                    autoComplete="off"
                    value={phonenumber}
                    onChange={onPhoneChanged}
                    label="Phone"
                    variant="outlined"
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                />

                
           

              

                    <FormControlLabel
                    control={<Checkbox
                        color="success"
                        value={active}
                        name="client-active"
                        id="client-active"
                        onChange={onActiveChanged}
                        checked={active}
                         />}
                         label="Active"
                        sx={{
                            width:'100%'
                        }}
                    />
                  
                <Button
                component="button"
                variant="contained"
                sx={{
                    widdth:'45%',
                    margin:'5px',
                    padding:'15px'
                }}
                            title="Save"
                            onClick={onSaveClientClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </Button>
                        <Button
                        component="button"
                        variant="contained"
                        sx={{
                            widdth:'45%',
                            margin:'5px',
                            padding:'15px'
                        }}
                            title="Delete"
                            onClick={onDeleteClientClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                 

        
            </Box>
            </Box>
            </Container>

        </>
    )

    return content
}
export default EditClientForm