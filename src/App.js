import { Typography, CssBaseline, AppBar, Toolbar, Container } from '@mui/material';
import Login from './component/Auth/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar';
import Landing from './component/Landing/Landing';
import Dashboard from './component/Dashboard/Dashboard';
import Register from './component/Auth/Register';
import Account from './component/Account/Account';
import { AuthProvider } from './component/Auth/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import ResetPassword from './component/Auth/ResetPassword';
import RequestResetPasswordWithEmail from './component/Auth/RequestPasswordResetWithEmail';

import Logout from './component/Auth/Logout';
import RequireAuth from './component/Auth/RequireAuth';
import EnergyGraph from './component/Dashboard/CarbonIntensity/CarbonIntensityGraph';
import EnergyMixChart from './component/Dashboard/EnergyMix/EnergyMixChart';

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />

              {/* <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link> */}
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/login" element={<Login />}></Route>s
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/landing" element={<Landing />}></Route>
                <Route path="/logout" element={<Logout />}></Route>

                <Route path="/reset-password/:token" element={
                  <ResetPassword />
                }></Route>
                <Route path="/reset-password" element={<RequestResetPasswordWithEmail />}></Route>
                <Route path="/account" element={
                  <RequireAuth redirectTo="/login">
                    <Account />
                  </RequireAuth>
                }></Route>

              </Routes>
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>

  );
}


export default App;
