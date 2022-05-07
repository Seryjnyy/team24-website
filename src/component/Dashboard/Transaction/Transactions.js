import { LocalAtm } from "@mui/icons-material";
import { Typography, Box, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useAuth } from "../../Auth/auth";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Transactions() {
  const { isLoading, isError, isSuccess, data } = useQuery(
    "transactions",
    fetchTransactions
  );
  const [transactions, setTransactions] = useState([]);
  const auth = useAuth();

  async function fetchTransactions() {
    let token = auth.getAccessToken();
    const res = await fetch("https://z8tf5117oc.execute-api.eu-west-2.amazonaws.com/tester", {
      headers: { Authorization: "Bearer " + token },
    });
    return res.json();
  }

  useEffect(() => {
    setTransactions(data);
  }, [data]);

  const columns = [
    { field: "id", hide: true },
    { field: "userID", headerName: "User ID", width: 100 },
    { field: "chargeAmount", headerName: "Charge amount", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "startTime", headerName: "Start time", width: 300 },
  ];

  let graphComponent;
  let cardComponent;

  if (isLoading) {
    graphComponent = (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={318}
        sx={{ bgcolor: "grey.900", borderRadius: 3 }}
      />
    );
    cardComponent = (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={318}
        sx={{ bgcolor: "grey.900", mt: 2, borderRadius: 3 }}
      />
    );
  } else if (isError || data == null) {
    graphComponent = <Typography>Sorry, something went wrong...</Typography>;
  } else if (isSuccess) {
    let buys = [];
    let sells = [];
    let tempLabels = [];
    let previousDate; //used to check if date changed
    data.map((transaction) => {
      // the length till milliseconds are introduced
      if (transaction.startTime.length > 19) {
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
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            sx={{
              color: "white",
              "& .MuiDataGrid-columnHeaders": {
                color: "white",
              },
              "& .MuiDataGrid-menuIconButton": {
                color: "white",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
              "& 			.MuiTablePagination-root ": {
                color: "white",
              },
            }}
            rows={transactions}
            columns={columns}
            initialState={{
              ...data.initialState,
              sorting: {
                sortModel: [{ field: "startTime", sort: "desc" }],
              },
            }}
          />
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

    graphComponent = 
    <Box sx={{width:"100%", minHeight:{xs:200, sm:400, md:600}}}>
      <Bar options={options} data={graphData}/>      
    </Box>;
  }

  return (
    <>
      <div>
        <Typography sx={{ color: "#078707", fontSize: 26 }}>
          Recent Transactions
          <span>
            <LocalAtm style={{ marginLeft: "10px" }} />
          </span>
        </Typography>
      </div>

      {graphComponent}

      {cardComponent}
    </>
  );
}

export default Transactions;
