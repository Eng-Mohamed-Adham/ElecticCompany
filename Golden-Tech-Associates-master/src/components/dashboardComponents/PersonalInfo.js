import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../features/users/usersApiSlice'
import { useEffect, useState } from 'react'
import useData from '../../hooks/useData'

import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const PersonalInfo = () => {
    // const users = useSelector(selectAllUsers)

    const {username, status,isManager,isAdmin} = useAuth()
    const {users,notes,parts,clients} = useData()

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const onGoHomeClicked = () => navigate('/dash')
    
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton= null
    if(NOTES_REGEX.test(pathname)){
         newNoteButton = (
            <button
            className='icon-button'
            title='New Note'
            onClick={onNewNoteClicked}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )

    }

  let newUserButton ;

  if(USERS_REGEX.test(pathname)){
    newUserButton = (
        <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
    )
  }

  let userButton = null
  if (isManager || isAdmin) {
      if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
          userButton = (
              <button
                  className="icon-button"
                  title="Users"
                  onClick={onUsersClicked}
                  
              >
                  <FontAwesomeIcon icon={faUserGear} />
              </button>
          )
      }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
      notesButton = (
          <button
              className="icon-button"
              title="Notes"
              onClick={onNotesClicked}
          >
              <FontAwesomeIcon icon={faFilePen} />
          </button>
      )
  }


    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const matchUser = users.find(user => user.username === username)

    let countUsers
    if(users && clients){
        countUsers = users.length + clients.length
        
    }
    
    let goHomeButton = null
    if(pathname !== '/dash'){
        goHomeButton = (
            <button 
            title='Home'
            onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }
    const content = (

            <Box 
            sx={{
                display:'flex',
                flexDirection:'column',
                // flexGrow:1,
                justifyContent:'flex-start',
                alignItems:'center',
                alignContent:'center',
                width:'100%',
            }}
            >
                <img
                src={matchUser?matchUser.image:''} 
                alt={username}
                style={{
                    width:'120px',
                    height:'120px',
                    borderRadius:'20px',
                    margin:'0',

                }}
                />
                <Typography
                variant='h5'
                sx={{
                    color:'#1e72bd',
                    marginTop:'10px',
                    fontWeight:500,


                }}
                >
                    User: {username} 
                </Typography>

            <Typography
                variant='h6'
                sx={{
                    color:'#5b5b5b',
                    marginTop:'7px',
                    fontSize:'14px'
                    
                }}
                >
                    UserStatus: {status} 
                </Typography>
                <Button 
  variant="outlined" 
  onClick={() => navigate('face-register')}
>
  Register Face
</Button>

            </Box>
         
    )

  return content
}

export default PersonalInfo
