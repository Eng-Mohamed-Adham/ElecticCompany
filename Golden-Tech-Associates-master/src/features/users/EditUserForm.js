import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"


import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControlLabel, MenuItem, Typography } from "@mui/material"
import Checkbox from '@mui/material/Checkbox';

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [image,setImage] = useState('')


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active,image })
        } else {
            await updateUser({ id: user.id, username, roles, active,image })
            navigate('/dash/users')
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

 

    // convert image src from buffer to base4
    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }
    //   handel image file to upload 
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log(base64)
        setImage(base64)
    }

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword,image].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername,image].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
        <Container maxWidth="xs">
        <CssBaseline />

            {/* <p className={errClass}>{errContent}</p> */}
                <Box
                sx={{
                    marginTop:9,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'column',
                    width:'100%'
                }}
                >

            <Box component="form"  onSubmit={e => e.preventDefault()}>
                    <Typography variant="h3" marginBottom='20px'>
                        Edit User
                    </Typography>
                   
               
              
                <TextField
                    id="username"
                    name="username"
                    label="UserName"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                />

                <TextField
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                    />
                    <TextField 
                    type="file"
                    id="image"
                    // label="Photo"
                    name="image"
                    accept='image/*'
                    onChange={(e) => handleFileUpload(e)}
                    required
                    sx={{
                        width:'45%',
                        margin:'5px'
                    }}
                    />
                
                <TextField
                                id="username"
                                select
                                label="Select"
                                value={roles[0]}
                                onChange={onRolesChanged}
                                multiple
                                sx={{
                                    width:'45%',
                                    margin:'5px',
                                    marginBottom:0
                                }}
                            >
                                {Object.values(ROLES).map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </TextField>
            
                    <FormControlLabel
                    label="Active"
                    sx={{
                        width:'95%',
                        margin:'5px',
                        marginTop:'0px'
                    }}
                    control={<Checkbox value='true'                         
                    checked={active}
                    onChange={onActiveChanged}
                    type="checkbox"

                    />}
                    />
            
         
    
                <Button
                component="button"
                            variant="contained"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                            sx={{
                                width:'45%',
                                margin:'5px'
                            }}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </Button>
                        <Button
                                        component="button"

                            variant="contained"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                            sx={{
                                width:'45%',
                                margin:'5px'
                            }}
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
export default EditUserForm