import { RemoveRedEye } from '@mui/icons-material'
import { TextField, Typography, Skeleton, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useQuery, useQueryClient } from 'react-query';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CarbonIntensityStats from './CarbonIntensityStats';

function EnergyGraph() {
  const [date, setDate] = useState(new Date());
  const queryClient = useQueryClient()
  const {isLoading, isError, isSuccess, data } = useQuery(["CarbonIntensity", date], fetchAIData);

  async function fetchAIData() {
    const dateString = date.toLocaleDateString('en-CA');
    const res = await fetch("https://cors-everywhere-me.herokuapp.com/http://3.8.138.22:6001/requests/getCarbonData?fromDate=" + dateString + "&toDate=" + dateString);
    return res.json();
  }

  let graphComponent;
  let graphTitle;
  let datePicker;

  if(isLoading){
    graphComponent = <Skeleton variant="rectangular" width={"100%"} height={318} sx={{ bgcolor: "grey.900", borderRadius: 3 }}/>
    datePicker = <Skeleton variant="rectangular" width={300} height={100} sx={{ bgcolor: "grey.900" , mt: 2, borderRadius: 3}}/>
    graphTitle = <Skeleton variant="rectangular" width={200} height={20} sx={{ bgcolor: "grey.900" , mb: 2, borderRadius: 3}}/>
  }else if(isError){
    graphComponent = <Typography>Sorry, something went wrong...</Typography>;
  }else if(isSuccess){
    let intervals = [];
    let actual = [];
    let forecast = [];
    data.days[0].intervals.map((interval) => {
      intervals.push(interval.fromDate.substring(11, 16));
      if(interval.actual !== 0)
        actual.push(interval.actual);
      
      forecast.push(interval.forecast);
    });

    graphComponent = <Line
      data={{
        labels: intervals,
        datasets: [
          {
            label: "Actual",
            data: actual,
            fill: false,
            borderColor: "rgb(80, 12, 22)",
            tension: 0.1,
          },
          {
            label: "Forecast",
            data: forecast,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          }

        ],
      }}
      options = {{
        scales : {
          y: {
            title: {
              display: true,
              text: "Carbon intensity"
            }
          },
          x: {
            title: {
              display: true,
              text: "Time"
            }
          }
        }
      }}
      
    />
    graphTitle = <Typography sx={{fontSize:15}}>for: {data.days[0].date}</Typography>;


    datePicker =       <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DesktopDatePicker
      label="Pick a date"
      value={date}
      onChange={(newValue) => {
        setDate(newValue);

        queryClient.invalidateQueries('CarbonIntensity');
        queryClient.invalidateQueries('CarbonIntensityStats', {dateFromParent: date});
      }}
      renderInput={(params) => <TextField {...params} sx={{
        svg: { color: '#fff' }, input: { color: '#fff' }, label: { color: '#fff' }, mt: 2,
        "& .MuiOutlinedInput-root ": {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          }
        },
      }} />}
    />
  </LocalizationProvider>
  }


  return (
    <>
      <div>
        <Typography sx={{color:"#078707", fontSize:26}}>
          Carbon Intensity
          <RemoveRedEye style={{ marginLeft: '10px' }} />
        </Typography>
        <Typography sx={{color:"white", fontSize:1}}>
          {graphTitle}
        </Typography>

      </div>
      <div >
        {graphComponent}
      </div>
      {
        isSuccess &&
        <CarbonIntensityStats dateFromParent={date ?? new Date()}/>
      }
    {datePicker}
    </>
  )
}

export default EnergyGraph