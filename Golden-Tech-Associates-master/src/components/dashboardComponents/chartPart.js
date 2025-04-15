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
import { useGetPartsQuery } from '../../parts/partsApiSlice'


ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale, //Y
    Tooltip,
    Legend,
    
)
const  BarChart = () => {

    let count

    let buy =0
    const {
        data:parts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPartsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    if(isSuccess) {
        const {ids,entities } = parts
        count = ids.length
        Object.values(entities).map(item => {
            buy += item.buy
            return buy

        })
    
    }

    const data = {
        labels: ['Types','CountOfBuy'],
        datasets: [
            {
                label:'Parts',
                data:[count, buy],
                backgroundColor: '#1e72bd',
                borderColor:'#07346f',
                borderWidth:1,

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
export default BarChart