import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import useData from '../../hooks/useData';
import { Box } from "@mui/material";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  



  const ChartLine = () => {
    const { users, notes, clients, parts } = useData();
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let previousOneMonth = currentDate.getMonth();
    let previousTwoMonth = currentDate.getMonth() - 1;
    let previousThreeMonth = currentDate.getMonth() - 2;


    let monthNotesData =0
    let previousOneNoteData=0
    let previousTwoNoteData =0
    let previousThreeNoteData=0

    let monthClientsData = 0;
    let previousOneClientData = 0;
    let previousTwoClientData = 0;
    let previousThreeClientData =0

    let monthPartsData =0
    let previousOnePartData=0
    let previousTwoPartData =0
    let previousThreePartData=0    

    const matchNote = notes.forEach(item => {
      const noteDate = new Date(item.createdAt);
      const noteMonth = noteDate.getMonth() + 1;


          if (noteMonth === currentMonth && item.completed) {
            monthNotesData++;
          } else if (noteMonth === previousOneMonth && item.completed) {
            previousOneNoteData++;
          } else if (noteMonth === previousTwoMonth && item.completed) {
            previousTwoNoteData++;
          }else if(noteMonth === previousThreeMonth && item.completed){
            previousThreeNoteData++
          }

          return {
            monthNotesData,
            previousOneNoteData,
            previousTwoNoteData,
            previousThreeNoteData
          };
        });

  
    const matchClient = clients.forEach(item => {
      const clientDate = new Date(item.createdAt);
      const clientMonth = clientDate.getMonth() + 1;
  
          if (clientMonth === currentMonth && item.active) {
            monthClientsData++;
          } else if (clientMonth === previousOneMonth && item.active) {
            previousOneClientData++;
          } else if (clientMonth === previousTwoMonth && item.active) {
            previousTwoClientData++;
          }else if(clientMonth === previousThreeMonth && item.active){
            previousThreeClientData++
          }

          return {
            monthClientsData,
            previousOneClientData,
            previousTwoClientData,
            previousThreeClientData
          };
        });
      
        const matchPart = parts.forEach(item => {
          const {buy,createdAt} =item
          const partDate = new Date(createdAt);
          const partMonth = partDate.getMonth() +1;
          if(partMonth === currentMonth && buy){
            monthPartsData++
          }else if(partMonth === previousOneMonth && buy){
            previousOnePartData++
          }else if(partMonth === previousTwoMonth && buy){
            previousTwoPartData++
          }else if(partMonth === previousThreeMonth && buy){
            previousThreePartData++
          }
          return{
            monthPartsData,
            previousOnePartData,
            previousTwoPartData,
            previousThreePartData
          }
        })

      const labels = [`${previousThreeMonth}Month`,`${previousTwoMonth}Month`, `${previousOneMonth}Month`,`${currentMonth}Month`];
  
      const options = {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      };
      
      const data = {

    
        labels,
        datasets: [
          {
            label: "Notes",
            data: [previousThreeNoteData,previousTwoNoteData, previousOneNoteData, monthNotesData],
            backgroundColor: "#2196F3",
            borderColor: "#2196F3",
          },
          {
            label: "Clients",
            data: [  previousThreeClientData,previousTwoClientData, previousOneClientData, monthClientsData],
            backgroundColor: "#F44236",
            borderColor: "#F44236",
          },
          {
            label: "Parts",
            data: [previousThreePartData, previousTwoPartData, previousOnePartData, previousThreePartData, ],
            backgroundColor: "#FFCA29",
            borderColor: "#FFCA29",
          },
          
        ],
      };

    return (
      <Box
      sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          height: 300,
          width:'100%'
          }}>
        <Line options={options} data={data} />
      </Box>
    );
  };
  
  export default ChartLine;