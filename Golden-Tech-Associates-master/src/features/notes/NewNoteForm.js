import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faNotesMedical } from "@fortawesome/free-solid-svg-icons"
import TextField from '@mui/material/TextField';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Avatar, Step, StepLabel, Stepper, Typography } from "@mui/material"
import {selectAllParts,useUpdatePartMutation} from '../parts/partsApiSlice'
import { useSelector } from 'react-redux'
import StepOne from "./StepOneForm"
import StepTwoForm from "./StepTwoForm"

const NewNoteForm = ({ users, clients }) => {


    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
    }] = useAddNewNoteMutation()

    const [updatePart, {
        Loading,
        Success,
        Error
    }] = useUpdatePartMutation()

    const Parts = useSelector(selectAllParts)


    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [clientName, setClientName] = useState('')
    const [validClient, setValidClient] = useState(false)
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [clientId, setClientId] = useState('')
    const [ismatch, setIsMatch] = useState(false)
    const [part,setPart] = useState('')
    const [isPart,setIsPart] = useState(false)
    const [partId,setPartId] = useState('')
    const [count,setCount] = useState(1)

    let NewNumberCount = parseInt(count)

    const steps = ['Check', 'Submit', ];

    function getStepContent(step) {
        switch (step) {
          case 0:
            return <StepOne
            clients={clients}
            ismatch={ismatch}
            isPart={isPart}
            clientName={clientName}
            onClientNameChanged={onClientNameChanged}
            part={part}
            onPartChanged={onPartChanged}
            checkStep1={checkStepOne}
            />;
          case 1:
            return <StepTwoForm
            title={title}
            onTitleChanged={onTitleChanged}
            userId={userId}
            onUserIdChanged={onUserIdChanged}
            users={users}
            count={count}
            onCountChange={onCountChange}
            text={text}
            onTextChanged={onTextChanged}
             />;
         
          default:
            throw new Error('Unknown step');
        }
      }


    const matchingClient = clients.find((client) => client.username === clientName);

    const matchPart = Parts.find(p => p.name === part);


    const checkStepOne = () => {

        if (matchingClient && matchPart) {
            setClientId(matchingClient._id)
            setValidClient(true)
            setIsMatch(true)
            setPartId(matchPart.id)
            setIsPart(true)
            setActiveStep(activeStep + 1);


        } else {
            setIsMatch(false)
            setIsPart(false)


        }
      
    }

    useEffect(() => {
        if (isSuccess) {
            setTitle()
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, navigate, validClient])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onClientNameChanged = e => setClientName(e.target.value)
    const onPartChanged = e => setPart(e.target.value)
    const onCountChange = e => setCount(e.target.value)

    const canSave = [title, text, userId,part].every(Boolean) && !isLoading
    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
            console.log(typeof(NewNumberCount))

        const newCount = matchPart.count - NewNumberCount
        const calcBuy = matchPart.buy + NewNumberCount
        if (canSave) {

            
            if( newCount < 0) {
                return(
                    <Alert severity="error">count of part is not available in Storage</Alert>
                )
            }else{

            await addNewNote({ user: userId, title, text, clientId,part,count })
          
            await updatePart({ id: matchPart.id, name:matchPart.name, desc:matchPart.desc, productiondate: matchPart.productiondate, lifespan:matchPart.lifespan, count: newCount ,buy:calcBuy })

            setActiveStep(activeStep + 1);


            }
        }
    }
    const [activeStep, setActiveStep] = useState(0);


  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
 


    
    const content = (
        <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
        
        

                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                </Stepper>

                <Box component="form" onSubmit={onSaveNoteClicked}>

                {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is . We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 &&
                <Button
                  variant="contained"
                  onClick={onSaveNoteClicked}
                  disabled={!canSave}
                  type="submit"

                  sx={{ mt: 3, ml: 1 }}
                >
                  Confirm 
                </Button>
                }
                </Box>
            </React.Fragment>
            )}
                
                </Box>
                </Box>
            </Container>
        </>
    )

    return content
}

export default NewNoteForm