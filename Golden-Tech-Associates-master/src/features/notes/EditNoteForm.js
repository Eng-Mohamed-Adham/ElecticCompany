import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { useDeleteClientMutation } from "../clients/clientApiSlice"
import { selectClientById } from "../clients/clientApiSlice"
import useAuth from '../../hooks/useAuth';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert, Button, Checkbox, Container, CssBaseline, FormControlLabel, MenuItem, Typography } from "@mui/material"
import { selectAllParts,useUpdatePartMutation } from '../parts/partsApiSlice'



const EditNoteForm = ({ note, users }) => {
    const { isManager, isAdmin } = useAuth()


    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const Parts = useSelector(selectAllParts)

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()
    const [updatePart, {
        Loading,
        Success,
        Error
    }] = useUpdatePartMutation()

    const [deleteClient, {
        isSuccess: isDelSuccessClient,

    }] = useDeleteClientMutation()

    const client = useSelector(state => selectClientById(state, note.clientId))


    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)
    const [part, setPart] = useState(note.part)
    const [count,setCount] = useState(note.count)

    const matchPart = Parts.find(p => p.name === part);

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)
 


    const canSave = [title, text, userId, part].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            if( !canSave < 0) {
                return(
                    <Alert severity="error">count of part is not available in Storage</Alert>
                )
            }else{
            await updateNote({ id: note.id, user: userId, title, text, completed, clientId: note.clientId, part,count })

            
            }
        }
    }

    const onDeleteNoteClicked = async () => {
        if (client) {
            if (client.id === note.clientId) {
                const calcCount = matchPart.count + count
                const calcBuy = matchPart.buy - count

                    await deleteNote({ id: note.id })
                    await updatePart({ id: matchPart.id, name:matchPart.name, desc:matchPart.desc, productiondate: matchPart.productiondate, lifespan:matchPart.lifespan,count:calcCount,buy:calcBuy })

                }

            

        }
    }
  
    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })





    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <Button
                component="button"
                variant="contained"
                label="Delete"
                onClick={onDeleteNoteClicked}
                sx={{
                    width: '40%',
                    margin: '10px',
                    padding: '20px'
                }}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
        )
    }
  

    const content = (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Box component='form' onSubmit={e => e.preventDefault()}>
                        <Typography variant="h3" marginTop='20px'>

                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#1e72bd", }} /> Order
                        </Typography>
            


                        <TextField
                            margin="normal"
                            id="note-title"
                            name="title"
                            type="text"
                            label="Title"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                            sx={{
                                width: '50%'
                            }}
                        />

                        <TextField
                            margin="normal"
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                            label="Text"
                            sx={{
                                width: '50%'
                            }}
                        />
                    
                        <TextField
                            id="username"
                            select
                            label="Assined To:"
                            sx={{ width: '50%' }}
                            value={userId}
                            onChange={onUserIdChanged}

                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        

                        <FormControlLabel
                            control={
                                <Checkbox
                                    value='Work Complete'
                                    color='primary'
                                    onChange={onCompletedChanged}
                                    checked={completed}
                                />}
                            label="Work Complete"
                            sx={{
                                // width:'50%'
                                marginLeft: '20px'
                            }}
                        />



                        <p >Created:<br />{created}</p>
                        <p >Updated:<br />{updated}</p>
                        <p>Count Of Part:<br/>{count}</p>
                        <p>Name Of Part<br/>{part}</p>
                        <Button
                            component="button"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                            label="Save"
                            variant="contained"
                            sx={{
                                width: '40%',
                                margin: '10px',
                                padding: '20px'
                            }}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </Button>
                        {deleteButton}
                    </Box>
                </Box>

            </Container>
        </>
    )

    return content
}

export default EditNoteForm
