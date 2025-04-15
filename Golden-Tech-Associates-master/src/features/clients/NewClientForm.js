import { useState, useEffect } from "react";
import { useAddNewClientMutation } from "./clientApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Box, Button, Typography } from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;

const NewClientForm = ({client}) => {
  const [addNewClient, { isLoading, isSuccess, isError, error }] =
    useAddNewClientMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [phonenumber, setPhone] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setLocation("");
      navigate("/dash/notes/new");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  const canSave =
    [ username, location, phonenumber].every(Boolean) && !isLoading;

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewClient({ username,  location, phonenumber });
    }
  };

  const content = (

    <>

      <Container maxWidth="xs">
      <CssBaseline />
        <Box
        sx={{
          marginTop:9,
          display:'flex',
          flexDirection:'column',
          alignItems:'column',
          width:'100%'
        }}
        >

        <Box component='form'  onSubmit={(e) => e.preventDefault()}>
            <Typography variant="h3" marginBottom='10px'>Add Client</Typography>
          
         
   

          <TextField
          sx={{
            width:'45%',
            margin:'5px'
          }}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
            label="Username"
            variant="outlined"
          />


          <TextField
          sx={{
            width:'45%',
            margin:'5px'
          }}
            id="location"
            name="location"
            type="text"
            autoComplete="off"
            value={location}
            onChange={onLocationChanged}
            label="Location"
            variant="outlined"
          />


          <TextField
          sx={{
            width:'45%',
            margin:'5px'
          }}
            id="Phone"
            name="Phone"
            type="tel"
            autoComplete="off"
            value={phonenumber}
            onChange={onPhoneChanged}
            label="Phone"
            variant="outlined"
          />

         
  
              <Button
              component='button'
              variant="contained"
                title="Save"
                onClick={onSaveClientClicked}
                sx={{
                  width:'95%',
                  margin:'5px',
                  padding:'15px'
                }}
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
        </Box>
        </Box>

      </Container>
    </>
  );

  return content;
};
export default NewClientForm;
