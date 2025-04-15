import { Button, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faNotesMedical } from "@fortawesome/free-solid-svg-icons"

export default function StepTwoForm({
    title,
    onTitleChanged,
    userId,
    onUserIdChanged,
    users,
    count,
    onCountChange,
    text,
    onTextChanged,
}) {
  return (
    <div>
      
      <TextField
                                margin="normal"
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                variant="outlined"
                                autoComplete="off"
                                value={title}
                                onChange={onTitleChanged}

                            />

                    
                        

                            <TextField
                                margin="normal"
                                id="username"
                                select
                                label="Select"
                                value={userId}
                                onChange={onUserIdChanged}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username}
                                    </MenuItem>
                                ))}
                            </TextField>
                        {/* </Box> */}
                    
                      

                        <TextField
                                margin="normal"
                                id="count"
                                name="count"
                                label="Count"
                                type="number"
                                variant="outlined"
                                autoComplete="off"
                                value={count}
                                onChange={onCountChange}
                                sx={{
                                    width:'45%',
                                    margin:'5px'
                                }}

                            />

                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="standard"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                        // fullWidth
                        sx={{
                            width:'45%',
                            margin:'5px'
                        }}
                    />
                
                        
    </div>
  )
}
