import React, { useEffect } from "react";
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {useAuth} from "./Auth/auth";

import {isUserLoggedIn} from "../services/AuthService";

const pages = ["dashboard", "landing", "account"];
const settings = ["account", "logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const auth = useAuth(); 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{backgroundColor: "#01031d"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 10, display: { xs: "none", md: "flex" }, fontWeight: 'bold', color: "#078707" }}
          >
            Industria Grid
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } } } position="relative">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
                            position="absolute"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "inline", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>

                  {/* <Typography textAlign="center"><Link to={`/${page}`}>{page}</Link></Typography>*/}
                  <Button
                      onClick={() => {
                        navigate(`/${page}`)
                      }}
                      sx={{ my: 1, color: "black", display: "block" }}
                    >
                      {page}
                    </Button>

                </MenuItem>

              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, color: "#078707", fontWeight: 'bold' }}
          >
            Industria Grid
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { navigate(`/${page}`) }}
                sx={{ my: 2, color: "#7a7d78", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!auth.isLoggedIn() && (
            <>
              <Button
                onClick={() => {
                  navigate("/login")
                }}
                sx={{ my: 2, color: "white", display: "block" ,}}
              >
                Login
              </Button>

              {/* <Button
                onClick={() => {
                  navigate("/register")
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Register
              </Button> */}
            </>
          )}

          {auth.isLoggedIn() && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px"}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {/* <Typography textAlign="center">{setting}</Typography> */}
                    <Button
                      onClick={() => {
                        navigate(`/${setting}`)
                      }}
                      sx={{ my: 1, color: "black", display: "block"}}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
