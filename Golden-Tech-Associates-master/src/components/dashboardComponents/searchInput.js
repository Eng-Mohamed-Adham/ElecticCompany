import { 
    Button,
    CssBaseline, 
    TextField,
    Container,
    Box,
    Stack,
    Alert,
    Typography
} from '@mui/material';
import { useState } from 'react';
import useData from '../../hooks/useData';

const  SearchInput= () => {

    const {users,notes,parts,clients} = useData()
    
    let content
    const [value,setValue] = useState('')
    const [dataId,setDataId] = useState('')
    const [validPart,setValidPart] = useState(false)
    const [name, setName] = useState('')
    

    const onValueChanged = e => setValue(e.target.value)


    const CheckPart = (e) => {
        const  matchPart = parts.find((item) => item.name === value) || 'notfound'
        const  matchUser = users.find((item) => item.username === value) || 'notfound'
        const  matchNote = notes.find((item) => item.username === value) || 'notfound'
        const  matchClient = clients.find((item) => item.username === value) || 'notfound'


        switch(value){
            case matchUser.username:
                setDataId(matchUser._id)
                setValidPart(true)
                setName(matchUser.username)
                break;
            case matchNote.usernae:
                setDataId(matchNote._id)
                setValidPart(true)
                setName(matchNote.username)
                break;

            case matchClient.username:
                setDataId(matchClient._id)
                setValidPart(true)
                setName(matchClient.username)
                break;

                case matchPart.name:
                    setDataId(matchPart._id)
                    setValidPart(true)
                    setName(matchPart.name)
                    break;

                default:
                    setName('Not Found...')
        }


    
        
    }
    if(name === value){

        content = (
            <Box 
            sx={{
                // width:'30px',
                background:'#efefef',
                color:'#2e72bd',
            "@hover":{
                background:'#fgfgfg'
            }
        }}
        >
            <Stack>
                <Typography variant='h5'>{name}</Typography>
                <Typography variant='h6'>{dataId}</Typography>
            </Stack>
        </Box>
        )
    }else if(dataId && name !== value ){
        content = (
            <Alert severity="error">Please Input Correct Data</Alert>

        )
    }else if(value === null){
        content = ''
    }

    return (
        <Container>
        <CssBaseline />
        <Stack
        direction="row"
        spacing={2}
        sx={{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',

        }}
        >

        <TextField
        type='text'
        value={value}
        onChange={onValueChanged}
        autoComplete="off"
        placeholder='Search Of Name Any Thing...'
        sx={{
            width:'100%',
            background:'#fff',
            padding:'0px',
            color:'1e72bd',
            boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'


        }}
        />

        <Button
        component="button"
        variant="contained"
        onClick={CheckPart}
        sx={{
            padding:'15px'
        }}
        >
            Search
        </Button> 
        </Stack>
            {content}
        </Container>
    )
}

export default SearchInput;