import {
  CssBaseline,
  Fab,
  Container,
  AppBar,
  Box,
  Toolbar,
  Button,
  useTheme,
} from "@mui/material";
import { UilAngleUp } from "@iconscout/react-unicons";
import { NavLink } from "react-router-dom";

import { ScrollTop, ElevationScroll } from "../../utils/index";
import { MenuBar, Mode } from "./index";
import WalletConnect from "../../components/WalletConnectButton";

const Appbar = (props) => {
  const theme = useTheme();
  const pages = [
    { name: "home", href: "/" },
    { name: "generator", href: "/TokenGenerator" },
    { name: "manager", href: "/TokenManager" },
  ];
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          className="appBar"
          sx={{
            width: "98%",
            ml: "1%",
            mt: "1%",
            mr: "1%",
            borderRadius: "20px",
            backdropFilter: "blur(3px)",
            border: "2px solid rgba(255, 202, 212,0.7) ",
            WebkitBackdropFilter: "blur(3px)",
            zIndex: 9,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box component="a" target="_blank" href="#"></Box>
              <Box
                sx={{
                  flexGrow: { xs: 1, sm: 0 },
                  mr: { sm: 2 },
                  display: { xs: "flex", md: "none" },
                }}
              >
                <MenuBar index={props.number} />
              </Box>

              <Box
                sx={{
                  display: {
                    sm: "flex",
                    md: "none",
                    xs: "none",
                  },
                  flexGrow: 1,
                  fontSize: "30px",
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page, index) => (
                  <NavLink
                    key={index}
                    to={page.href}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                  >
                    <Button
                      color="inherit"
                      key={page.name}
                      sx={{
                        my: 2,
                        display: "block",
                        fontSize: "20px",
                      }}
                    >
                      {page.name}
                    </Button>
                  </NavLink>
                ))}
              </Box>
              <Box sx={{ flexGrow: { xs: 1, sm: 0 } }} display={"flex"}>
                <WalletConnect />
              </Box>
              <Mode />
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Box id="back-to-top-anchor" />
      <ScrollTop>
        <Fab color="primary" size="small">
          <UilAngleUp />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Appbar;
