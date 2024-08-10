import AppBar from "../../components/AppBar/AppBar.jsx";
import { Box } from "@mui/material";
import { Generator,Help,Table,TokenManager } from "./index.jsx";
import Footer from "../../components/Footer";
const Main = () => {
  return (
    <>
      <AppBar number={0} />
      <Box sx={{ marginTop: { xs: 10, md: 15 } }}>
        <Generator />
        <TokenManager />
        <Help />
        <Table />
        <Footer />
      </Box>
    </>
  );
};

export default Main;
