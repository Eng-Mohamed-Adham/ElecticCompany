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
import { useGetClientsQuery } from '../../features/clients/clientApiSlice'


ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale, //Y
    Tooltip,
    Legend,
    
)

const BarClient = () => {
    const {
        data: clients,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetClientsQuery(undefined,{
        pollingInterval:1500,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
    })
    let count =0
    let active =0
    let unactive =0
    let orders =0 
    if(isSuccess){
        const {ids,entities} = clients
        count = ids.length

        Object.values(entities).map(item => {
                orders = item.orders.length
                if(item.active){
                    active++
                }else if(!item.active){
                    unactive++
                }
                return{
                    count,
                    orders,
                    active,
                    unactive
                }
        })
    
    }

    const data = {
        labels: ['Count','Orders','Active','Unactive'],
        datasets: [
            {
                label:'Clients',
                data:[count,orders,active,unactive],
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
 
export default BarClient;