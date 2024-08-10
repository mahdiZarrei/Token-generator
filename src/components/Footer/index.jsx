import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import {
  UilLinkedin,
  UilInstagram,
  UilTelegram,
  UilWallet,
} from "@iconscout/react-unicons";
import { useTheme } from "@emotion/react";
import { copyToClipboard } from "../../utils";
const Footer = () => {
  const { open } = useWeb3Modal();
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          ml: "1%",
          mr: "1%",
          bgcolor: theme.palette.mode === "dark" ? "#141414" : "#f7e7ec",
          border: `3px solid ${
            theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
          }`,
          borderTopRightRadius: "40px",
          borderTopLeftRadius: "40px",
        }}
      >
        <Box
          sx={{
            pt: "4vh",
            border: { xs: "2px solid #1B3C73", md: "none" },
            bgcolor: {
              xs: theme.palette.mode === "dark" ? "black" : "white",
              md: theme.palette.mode === "dark" ? "#141414" : "#f7e7ec",
            },
            borderRadius: "40px",
            width: { xs: "40vw", md: "60vw" },
            m: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            pb: "2vh",
            mt: "1vh",
          }}
        >
          <Box
            component="a"
            href="/TokenGenerator"
            sx={{
              fontSize: { xs: "3vw", md: "1.3vw" },
              color: theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73",
              m: "auto",
              mt: "2vh",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Create your token
          </Box>
          <Typography
            component="a"
            href="/TokenGenerator#help"
            sx={{
              fontSize: { xs: "3vw", md: "1.3vw" },
              color: theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73",
              m: "auto",
              mt: "2vh",
              textDecoration: "none",
            }}
          >
            what is ERC20 token?
          </Typography>
          <Typography
            variant="a"
            onClick={() => {
              open({ view: "WhatIsANetwork" });
            }}
            sx={{
              fontSize: { xs: "3vw", md: "1.3vw" },
              color: theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73",
              cursor: "pointer",
              m: "auto",
              mt: "2vh",
            }}
          >
            what is network?
          </Typography>
          <Typography
            variant="a"
            onClick={() => {
              open({ view: "WhatIsAWallet" });
            }}
            sx={{
              fontSize: { xs: "3vw", md: "1.3vw" },
              color: theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73",
              cursor: "pointer",
              m: "auto",
              mt: "2vh",
            }}
          >
            what is wallet?
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", mt: "2vh", pb: "2vh" }}>
          <IconButton sx={{ mr: "2.5vw" }} target="_blank" href="#">
            <UilLinkedin
              color={theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73"}
              size="35"
            />
          </IconButton>
          <IconButton sx={{ mr: "1.25vw" }}>
            <UilInstagram
              color={theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73"}
              size="35"
            />
          </IconButton>
          <IconButton sx={{ ml: "1.25vw" }} target="_blank" href="#">
            <UilTelegram
              color={theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73"}
              size="35"
            />
          </IconButton>
          <IconButton sx={{ ml: "2.5vw" }}>
            <UilWallet
              onClick={() =>
                copyToClipboard("0x8dedDf9068B594310b8914079CA41CE1cb5Bf6D0")
              }
              color={theme.palette.mode === "dark" ? "#90caf9" : "#1B3C73"}
              size="35"
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
