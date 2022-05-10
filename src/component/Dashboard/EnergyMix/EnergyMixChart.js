import { Coffee } from '@mui/icons-material'
import { Typography, Skeleton, Box } from '@mui/material';
import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useQuery } from 'react-query';

function EnergyMixChart() {
  const { isLoading, isError, isSuccess, data } = useQuery("EnergyMix", fetchMix);

  async function fetchMix() {
    const res = await fetch('https://api.carbonintensity.org.uk/generation');
    return res.json();
  }

  // useEffect(()=>{console.log(data?.data?.generationmix)}, [data]);


  let graphComponent;

  if (isLoading) {
    graphComponent = <Skeleton variant="rectangular" width={"100%"} height={318} sx={{ bgcolor: "grey.900", borderRadius: 3 }} />
  } else if (isError) {
    graphComponent = <Typography>Sorry, something went wrong...</Typography>;
  } else if (isSuccess) {
    let labels = [];
    let values = [];
    data.data.generationmix.map((mix) => {
      labels.push(mix.fuel);

      values.push(mix.perc);
    });

    graphComponent = <Doughnut
      data={{
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: values,
            backgroundColor: [
              "#7a5dc3",
              "#37a3cc",
              "#f5b945",
              "#ca5199",
              "#309786",
              "#c67e32", 
              "#77b23d",
              "#1c549f",
              "#c13923"
            ],
            hoverOffset: 4,
          },
        ],
      }}
    />
  }





  return (
    <>

      <div>
        <Typography sx={{ color:"#078707", fontSize: 26 }}>
          Current energy mix
          <Coffee style={{ marginLeft: '10px' }} />
        </Typography>
      </div>

      <Box sx={{mt:2}}>
        <Box sx={{width: {xs: "70%", sm:"60%", md:"60%", lg:"100%"}, height: {xs: "70%", sm:"60%", md:"60%", lg:"100%"}, margin: "auto"}}>
        {graphComponent}
        </Box>
      </Box>
      
    </>

  )
}

export default EnergyMixChart