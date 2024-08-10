import { Box, Typography, Button, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CreateToken, Material,MaterialDark} from "../imgs/index";

const Gen = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: { xs: "grid", md: "flex" },
        ml: "1%",
        mr: "1%",
        mb: "1%",
        justifyContent: { xs: "center", md: "space-between" },
        border: `3px solid ${
          theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
        }`,
        backgroundImage: `url(${
          theme.palette.mode == "dark" ? MaterialDark : Material
        })`,
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundSize: { xs: "0", md: "50%" },
        borderRadius: 11,
      }}
    >
      <Box
        src={CreateToken}
        alt="creat token imag"
        width="100%"
        display={{ md: "none", sm: "grid" }}
        component="img"
      />

      <Box
        sx={{
          mt: 10,
          width: { md: 395 },
          height: "100%",
          textAlign: "center",
          ml: { md: 5 },
          lineHeight: 2,
          display: { md: "block" },
        }}
      >
        <Typography variant="h3" fontSize={{ xs: 40, sm: 75, md: 50 }}>
          Token Generator
        </Typography>
        <Typography variant="p">
          Create your token without codingin a few clicks and support blockchain
        </Typography>
        <br />
        <NavLink to="/tokenGenerator">
          <Button
            variant="contained"
            onClick={() => CreateToken()}
            sx={{ mt: 2.5, mb: 5, fontSize: { xs: "10vw", md: 30 } }}
          >
            Create
          </Button>
        </NavLink>
      </Box>
      <Box
        src={CreateToken}
        alt="creat token imag"
        width={450}
        display={{ md: "grid", sm: "none", xs: "none" }}
        component="img"
      />
    </Box>
  );
};

export default Gen;
