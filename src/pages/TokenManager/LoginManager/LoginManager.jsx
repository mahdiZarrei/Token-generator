import { Box } from "@mui/material";
import User from "./UserLogin.jsx";
import AppBar from "../../../components/AppBar/AppBar.jsx";
import Footer from "../../../components/Footer/index.jsx";

const LoignMangager = () => {
  return (
    <>
      <AppBar number={2} />
      <Box sx={{ marginTop: { xs: 10, md: 15 } }}>
        <User />
      </Box>
      <Footer/>
    </>
  );
};

export default LoignMangager;
