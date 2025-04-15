import {Routes,Route} from 'react-router-dom'
import DashLayout from './components/DashLayout';
import Layout from './components/Layout'
import Welcome from './components/dashboardComponents/Welcome';
import NotesList from './features/notes/NotesList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import Prefetch from './features/auth/Prefetch';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import PartsList from './features/parts/PartList';
import EditPart from './features/parts/EditPart';
import NewPart from './features/parts/NewPart';
import UsersTable from './features/users/UsersTable';
import ClientsList from './features/clients/ClientsList';
import EditClient from './features/clients/EditClient';
import NewClientForm from './features/clients/NewClientForm';
import Login from './components/Login';
import HomePage from './components/HomePage';
import FaceLogin from './pages/FaceLogin';
import FaceRegister from './features/users/FaceRegister';



function App() {
  return (
    <Routes>
            <Route path='login' element={<Login />} />
            <Route path='face-login' element={<FaceLogin />} />



      <Route path='/' element={<Layout />}>
        {/* public Routes  */}
      <Route index element={<HomePage/>} />

      {/* Protected Routes  */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
      <Route element={<Prefetch />} >
      <Route path='dash' element={<DashLayout />}>
        <Route index element={<Welcome />}/>
        <Route path="face-register" element={<FaceRegister />} />

        <Route path='clients'>
        <Route index element={<ClientsList/>}/>
        <Route element={<RequireAuth allowedRoles={[ROLES.Employee,ROLES.Admin]} />}>

        <Route path=':id' element={<EditClient />} />
        <Route path='new' element={<NewClientForm />} />
          </Route>
        </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]} />}>

        <Route path='users'>
          <Route index element={<UsersTable />}/>
          <Route path=':id' element={<EditUser />} />
          <Route path='new' element={<NewUserForm />} />

        </Route>
    
        </Route>
        <Route path='notes'>
          <Route index element={<NotesList />}/>
          <Route path=':id' element={<EditNote />} />
          <Route path='new' element={<NewNote />} />
        </Route>

        

        <Route path='parts'>
          <Route index element={<PartsList />}/>
          <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]} />}>
            
          <Route path=':id' element={<EditPart />} />
          
          <Route path='new' element={<NewPart />} />
        </Route>

        </Route>

      </Route>{/*End Dash Routing*/}
      </Route>
      </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
