import React, { createRef, useRef } from "react";
import BalanceGraph from "./OtherSections/BalanceGraph";
import EnergyGraph from "./CarbonIntensity/CarbonIntensityGraph";
import EnergyMixChart from "./EnergyMix/EnergyMixChart";
import About from "./OtherSections/About";
import News from "./OtherSections/News";
import Transactions from "./Transaction/Transactions";
import "./dashboard.css";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
} from "chart.js";
import { Card, CardContent, Container, Grid, Box } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import DashboardContainer from "./DashboardContainer";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement
);

function Dashboard() {
  return (
    <Box sx={{ display: "flex", bgcolor: "#000326", color: "white" }}>
      <Sidebar position="fixed" />
      <Grid container sx={{ width: "100%" }} rowSpacing={2}>
        <Grid item xs={12} sx={{ mt: 8 }}>
          <DashboardContainer
            children={
              <Grid container id="carbon-intensity">
                <Grid item xs={12} sm={12} md={12} lg={9}>
                  <EnergyGraph />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  sx={{ mt: { xs: 2, sm: 2, md: 2 } }}
                  id="energy-mix"
                >
                  <EnergyMixChart />
                </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container rowSpacing={2} id="about">
            <Grid item xs={12} sm={12} md={5} lg={6}>
              <DashboardContainer children={<About />} />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={6} id="news">
              <DashboardContainer children={<News />} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} id="transaction">
          <DashboardContainer children={<Transactions />} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
