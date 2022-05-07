import React from 'react'
import { useQuery } from 'react-query';
import { useAuth } from '../Auth/auth';
import jwt_decode from "jwt-decode";
import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';

function BatteryStateGraph() {
    const { data, status } = useQuery("userBattery", fetchBattery);
    const auth = useAuth();

    async function fetchBattery() {
        let token = auth.getAccessToken();
        let username = jwt_decode(token).sub;
        const res = await fetch("https://ln016k6u46.execute-api.eu-west-2.amazonaws.com/UserBattery?username=" + username, { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    let graphComponent;
    let cardComponent;
    if (status === "loading") {
      cardComponent = <Typography>Loading...</Typography>;
    } else if (status === "error" || data?.httptatus != null) {
        cardComponent = <Typography> {data?.message ?? "Sorry, something went wrong..."}</Typography>;
    } else if(Object.keys(data).length === 0){
        cardComponent = <Typography> {"Sorry, no battery state found..."}</Typography>
            } 
    else {
      cardComponent = <></>;
        let labels = [];
        let x = [];
        data[0].uasoc.map((state, i) => {
            x.push(state);
            labels.push(i);
        })

        graphComponent = <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Battery charge",
              data: x,
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
                text: "Charge"
              }
            },
            x: {
              title: {
                display: true,
                text: ""
              }
            }
          }
        }}
        
      />

    }

  return (
<>
              <div className="title mb-4">
          <h3>Battery state
            <span></span>
          </h3>
        </div>
        {cardComponent}
    <Box sx={{width:{xs:"100%",lg: "80%"}, margin:"auto"}}>
        {graphComponent}
    </Box>
    </>
  )
}

export default BatteryStateGraph