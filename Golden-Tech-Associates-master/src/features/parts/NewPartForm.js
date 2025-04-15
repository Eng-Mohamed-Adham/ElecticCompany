import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewPartMutation } from "./partsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, Typography } from "@mui/material"

const NewPartForm = () => {

    const [addNewPart, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPartMutation()

    const navigate = useNavigate()
    const [id,setId] = useState(Number)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [productiondate, setProductionDate] = useState('')
    const [lifespan,setLifeSpan] = useState(''
    )
    const [count,setCount] = useState(0)
    const [buy,setBuy] = useState(0)

    useEffect(() => {
        if (isSuccess) {
            setId(null)
            setName('')
            setDesc('')
            setProductionDate('')
            setLifeSpan('')
            setCount()
            navigate('/dash/parts')
        }
    }, [isSuccess, navigate])

    const onIdChanged = e => setId(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onDescChanged = e => setDesc(e.target.value)
    const onProductionDateChanged = e => setProductionDate(e.target.value)
    const onLifeSpanChanged = e => setLifeSpan(e.target.value)
    const onCountChanged = e => setCount(e.target.value);
    const onBuyChanged = e => setBuy(e.target.value)


    const canSave = [id,name, desc, productiondate,count].every(Boolean) && !isLoading

    const onSavePartClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewPart({ id,name,desc,productiondate,lifespan,count,buy })
        }
    }



    const errClass = isError ? "errmsg" : "offscreen"



    const content = (
        <>
            <Container maxWidth="xs">
            <CssBaseline />
                <Box
                sx={{
                    marginTop:9,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'column'
                }}
                >

                <Box component='form' onSubmit={onSavePartClicked}>
                        <Typography variant="h3">
                            New Part</Typography>
                    
                
                    <TextField
                        variant="outlined"
                        label="Id"
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={id}
                        onChange={onIdChanged}
                        sx={{
                            width:'45%',
                            margin:'5px'

                        }}
                    />
            
                    <TextField
                        variant="outlined"
                        id="Name"
                        label="Name"
                        name="Name"
                        type="text"
                        autoComplete="off"
                        value={name}
                        onChange={onNameChanged}
                        sx={{
                            width:'45%',
                            margin:'5px'

                        }}
                    />
                      <TextField
                        variant="outlined"
                        id="production"
                        label="production"

                        name="production"
                        type="text"
                        autoComplete="off"
                        value={productiondate}
                        onChange={onProductionDateChanged}
                        sx={{
                            width:'45%',
                            margin:'5px'

                        }}
                    />
                
                    <TextField
                        variant="outlined"
                        id="life-span"
                        label="LifeSpan"
                        name="life-span"
                        type="text"
                        autoComplete="off"
                        value={lifespan}
                        onChange={onLifeSpanChanged}
                        sx={{
                            width:'45%',
                            margin:'5px'

                        }}
                    />
            
                    <TextField
                        variant="outlined"
                        type="number"
                        label="Count"
                        id="count"
                        name="text"
                        value={count}
                        onChange={onCountChanged}
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
                        variant="standard"
                        id="desc"
                        name="desc"
                        label="Description"
                        multiline
                        rows={4}
                        value={desc}
                        onChange={onDescChanged}
                        sx={{
                            width:'95%',
                            margin:'5px'

                        }}
                    />
                    <Button 
                    component="button"
                                variant="contained"
                                label="Save"
                                disabled={!canSave}
                                type='submit'
                                sx={{
                                    width:'90%',
                                    padding:'20px'
                                }}
                            >
                                <FontAwesomeIcon icon={faSave} />
                    </Button>
                </Box>
                
                      
                  
                   
                    
                </Box>

            </Container>
        </>
    )

    return content
}

export default NewPartForm