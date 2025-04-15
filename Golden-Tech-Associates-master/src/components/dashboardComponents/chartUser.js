import { Box } from '@mui/material'
import{
Chart as ChartJs,
BarElement,
CategoryScale,
LinearScale, //Y
Tooltip,
Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import { useGetUsersQuery } from '../../users/usersApiSlice'

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale, //Y
    Tooltip,
    Legend,
    
)
const BarUsers = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined,{
        pollingInterval:1500,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
    })
    let Manager=0
    let Admin=0
    let Employee=0
    let count=0
    if(isSuccess){

        const {ids,entities } = users
        count = ids.length

        Object.values(entities).map(item => {
            if(item?.roles[0] === "Employee"){
            Employee++
            }
            if(item?.roles[1] === "Manager"){
            Manager++
            }
            if(item?.roles[2] === "Admin"){
            Admin++
            }
            // console.log(Admin,Manager,Employee)
            return{
            Employee,
            Manager,
            Admin,
            count
            }
        })

    }
    const data = {
        labels: ['Count','Employees','Admins','Managers'],
        datasets: [
            {
                label:'Users',
                data:[count,Employee,Admin,Manager],
                backgroundColor: '#1e72bd',
                borderColor:'#07346f',
                borderWidth:1,
                borderRadius:'20px'

            }
        ]
    }
    const options = {
    
    };

    return(
        <Box>
        <Bar
        style={
            {padding:'20px',width:'80%'}
        }
        data={data}
        options={options}
        >

        </Bar>
    </Box>
    )
}
 
export default BarUsers;