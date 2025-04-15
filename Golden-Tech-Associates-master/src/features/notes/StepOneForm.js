import { useState } from 'react'
import {selectAllParts,useUpdatePartMutation} from '../parts/partsApiSlice'
import { useSelector } from 'react-redux'
import { Alert, Button, TextField } from '@mui/material';




const StepOne = ({
    clients,
    ismatch,
    isPart,
    clientName,
    onClientNameChanged,
    part,
    onPartChanged,
    checkStep1
}) => {

    
    return (
        <>
          {
                        (ismatch)&&
                        <Alert severity='success'>Found Client Name</Alert>
                        }
                            {
                        (!ismatch)&&
                        <Alert severity='error'>Client Name is Required</Alert>
                        }
                    {
                        (isPart)&&
                        <Alert severity='success'>Found Part</Alert>
                    }
                       {
                        (!isPart)&&
                        <Alert severity='error'>Part is required</Alert>
                    }
            

                    <TextField
                        margin="normal"
                        id="client"
                        label="Enter Client Name to add note for him:
                        "
                        autoComplete="off"
                        type="text"
                        value={clientName}
                        onChange={onClientNameChanged}
                        sx={{
                            width:'45%',
                            margin:'5px'
                        }}
                    />
                        <TextField
                                margin="normal"
                                id="part"
                                name="part"
                                label="Part"
                                type="text"
                                variant="outlined"
                                autoComplete="off"
                                value={part}
                                onChange={onPartChanged}
                                sx={{
                                    width:'45%',
                                    margin:'5px'
                                }}
                            />
                    <Button
                    component="button"
                    variant="contained"
                    onClick={checkStep1}
                    sx={{ mt: 3, mb: 2,width:'95%',margin:'5px' }}

                    >
                        Check 
                    </Button>
        </>
    );
}
 
export default StepOne;