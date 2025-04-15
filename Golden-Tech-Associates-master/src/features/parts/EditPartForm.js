import { useState, useEffect } from "react"
import { useUpdatePartMutation, useDeletePartMutation } from "./partsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import useAuth from '../../hooks/useAuth';
import { Box, Button, ButtonGroup, Container, CssBaseline, TextField, Typography } from '@mui/material';
const EditNoteForm = ({ part }) => {
    const { isManager, isAdmin } = useAuth()


    const [updatePart, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdatePartMutation()

    const [deletePart, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeletePartMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(part.name)
    const [desc, setDesc] = useState(part.desc)
    const [productiondate, setProductionDate] = useState(part.productiondate)
    const [lifespan, setLifeSpan] = useState(part.lifespan)
    const [count, setCount] = useState(part.count)
    const [buy,setBuy] = useState(part.buy)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setDesc('')
            setProductionDate('')
            setLifeSpan('')
            navigate('/dash/parts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    const onProductionDateChanged = e => setProductionDate(e.target.value)
    const onLifeSpanChanged = e => setLifeSpan(e.target.value)
    const onCountChanged = e => setCount(e.target.value);
    const onBuyChanged = e => setBuy(e.target.value)


    const canSave = [name, desc, productiondate, lifespan,count,buy].every(Boolean) && !isLoading


    const onSavePartClicked = async (e) => {
        if (canSave) {
            await updatePart({ id: part.id, name, desc, productiondate, lifespan, count:count,buy:buy })
        }
    }

    const onDeletePartClicked = async () => {
        await deletePart({ id: part.id })
    }

    const created = new Date(part.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(part.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })


   

    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <Button
            component="button"
            variant="contained"
            sx={{
                width:'45%',
                margin:'5px'

            }}
                label="Delete"
                onClick={onDeletePartClicked} >
                <FontAwesomeIcon icon={faTrashCan} />
            </Button>
        )
    }


    const content = (
        <>
            {/* <p className={errClass}>{errContent}</p> */}
            <Container maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 9,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'column'
                    }}
                >


                    <Box component='form' onSubmit={e => e.preventDefault()}
                  
                    >
                        <Typography variant="h3" marginBottom="20px">

                            <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: "#1e72bd", }} />
                            {part.name}
                        </Typography>


                        <TextField
                            margin="normal"
                            id="PartTitle"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={onNameChanged}
                            label="Title"
                            sx={{
                                width:'45%',
                                margin:'5px'
                            }}
                        />




                        <TextField
                            id="Part-text"
                            name="text"
                            value={productiondate}
                            onChange={onProductionDateChanged}
                            margin='normal'
                            label="ProductionDate"
                            sx={{
                                width:'45%',
                                margin:'5px'

                            }}
                        />
              
                        <TextField
                            id="Part-LifeSpan"
                            name="text"
                            value={lifespan}
                            onChange={onLifeSpanChanged}
                            label="LifeSpan"
                            margin='normal'
                            sx={{
                                width:'45%',
                                margin:'5px'

                            }}
                        />
                
                        <TextField
                            type="number"
                            id="Count"
                            name="text"
                            value={count}
                            onChange={onCountChanged}
                            margin="normal"
                            label="Count"
                            sx={{
                                width:'45%',
                                margin:'5px'

                            }}

                        />

                        <TextField
                            type="number"
                            id="Buy"
                            name="text"
                            value={buy}
                            onChange={onBuyChanged}
                            margin="normal"
                            label="Buy"
                            sx={{
                                width:'45%',
                                margin:'5px'

                            }}

                        />
                        <TextField
                            margin="normal"
                            label="Desc"
                            id="Part-Desc"
                            name="Desc"
                            type="text"
                            autoComplete="off"
                            value={desc}
                            onChange={onDescChanged}
                            multiline
                            rows={4}
                            variant="standard"
                            sx={{
                                width:'95%',
                                margin:'5px'

                            }}

                        />
                        <Typography variant="h6" >
                            Created:<br />{created}
                            Updated:<br />{updated}
                        </Typography>
                                
                    </Box>
                    <ButtonGroup>
                    <Button
                    component="button"
                        variant="contained"
                        sx={{
                            width:'45%',
                            margin:'5px',
                            padding:'15px'

                        }}
                        title="Save"
                        onClick={onSavePartClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </Button>
                    {deleteButton}
                    </ButtonGroup>
                    </Box>
                  
            </Container>
        </>
    )

    return content
}

export default EditNoteForm