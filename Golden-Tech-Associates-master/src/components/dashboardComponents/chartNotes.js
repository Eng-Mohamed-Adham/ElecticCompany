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
import { useGetNotesQuery } from '../../notes/notesApiSlice'

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale, //Y
    Tooltip,
    Legend,
    
)

const BarNote = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined,{
        pollingInterval:1500,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
    })
    let count =0
    let complete=0
    let open=0

    if(isSuccess){
        const {ids,entities} = notes
        count = ids.length

        Object.values(entities).map(item => {
            if(item.completed){
                complete++
            }else if(!item.completed){
                open++
            }

            return{
                count,
                complete,
                open
            }
        })
    }

    const data = {
        labels: ['Count','Completed','Open'],
        datasets: [
            {
                label:'Notes',
                data:[count,complete,open],
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
 
export default BarNote;