import React, { useEffect, useState } from 'react'
import { getUserToken } from '../../services/AuthService';
import jwt_decode from "jwt-decode";
import { Skeleton, Typography } from '@mui/material';
import AccountDataCard from './AccountDataCard';
import { useQuery } from 'react-query';
import { useAuth } from '../Auth/auth';
import { DataGrid } from '@mui/x-data-grid';
import { LocalAtm } from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from '@mui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function UserTransactions() {
    const { isLoading, isError, isSuccess, data} = useQuery("userTransactions", fetchUserTransactions);
    const auth = useAuth();

      const columns = [
        { field: "id", hide: true },
        { field: "userID", hide: true },
        { field: "chargeAmount", headerName: "Charge amount", width: 150 },
        { field: "type", headerName: "Type", width: 150 },
        { field: "startTime", headerName: "Start time", width: 300 }
      ];

    async function fetchUserTransactions() {
        let token = auth.getAccessToken();
        const res = await fetch("http://172.31.12.142:6786/blockchain/user-transactions?userID=" + auth.getUserID(), { headers: { "Authorization": "Bearer " + token } });
        return res.json();
    }

    let cardComponent;
    let graphComponent;
    if (isLoading) {
        cardComponent = <Skeleton variant="rectangular" width={"100%"} height={318} sx={{ bgcolor: "grey.300", borderRadius: 3}}/>
      } else if (isError) {
        cardComponent = <Typography>Sorry, something went wrong...</Typography>;
      }else if(Object.keys(data).length === 0){
        cardComponent = <Typography>Sorry, no transactions...</Typography>;
      } else if (isSuccess) {
        let buys = [];
        let sells = [];
        let tempLabels = [];
        let previousDate; //used to check if date changed
        data.map((transaction)=> {
          // the length till milliseconds are introduced
          if(transaction.startTime.length > 19){
            let newStartTime = transaction.startTime.substring(0, 21);
            newStartTime = newStartTime.replace("T", " | ");
            transaction.startTime = newStartTime;
          }

                // take data for graphs
      // transactions are in order, so go day by day and get count of buys and sells
      // if new date then add 1 for that transaction type, and 0 for the other as placeholder.
      // if the same date then increment the count.
      if (previousDate == transaction.startTime.substring(0, 10)) {
        
        if (transaction.type == "SELL") {
          sells[(sells.length - 1) > 0 ? (sells.length - 1) : 0] += 1;
        } else if (transaction.type == "BUY"){
          buys[(buys.length - 1) > 0 ? (buys.length - 1) : 0] += 1;
        }

      } else {
        
        tempLabels.push(transaction.startTime.substring(0, 10));
        previousDate = transaction.startTime.substring(0, 10);

        if (transaction.type == "SELL") {
          sells.push(1);
          buys.push(0);
        } else if (transaction.type == "BUY") {
          buys.push(1);
          sells.push(0);
        }
      }
    });

        cardComponent = (
            <>
            <Typography sx={{m : 2, fontWeight:'bold', fontSize:18}} >Your transactions</Typography>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={data} columns={columns} />
            </div>
            </>
            );

            const options = {
              plugins: {
                title: {
                  display: true,
                  text: "Transactions",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Date"
                  }
                },
                y: {
                  stacked: true,
                  display: true,
                  title: {
                    display: true,
                    text: "Amount"
                  }
                },
              },
            };
            const labels = tempLabels;
        
            const graphData = {
              labels,
              datasets: [
                {
                  label: "Buy",
                  data: buys,
                  backgroundColor: "rgb(255, 99, 132)",
                  stack: "Stack 0",
                },
                {
                  label: "Sell",
                  data: sells,
                  backgroundColor: "rgb(0, 0, 255)",
                  stack: "Stack 0",
                },
              ],
            };
        
            graphComponent = <Bar options={options} data={graphData}/>;
            
    }


    return (
        <>
        <div className="title mb-4">
          <h3>Recent Transactions
            <span><LocalAtm style={{ marginLeft: '10px' }} /></span>
          </h3>
        </div>
        <Box sx={{width:"100%", minHeight:{xs:200, sm:400, md:600}}}>
          {graphComponent}
        </Box>
        {cardComponent}
        </>
    )
}

export default UserTransactions