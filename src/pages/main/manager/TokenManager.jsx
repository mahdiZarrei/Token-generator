import { Box, Typography, Button, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

import { ManagerMaterial, ManagerMaterialDark, Manage } from "../imgs/index";
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
                    theme.palette.mode == "dark"
                        ? ManagerMaterialDark
                        : ManagerMaterial
                })`,
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",
                backgroundSize: { xs: "0", md: "50%" },
                borderRadius: "40px",
            }}>
            <Box
                component='img'
                src={Manage}
                width={{ md: 450, xs: "100%" }}></Box>
            <Box
                sx={{
                    mt: { md: 10 },
                    width: { md: 395, xs: "100%" },
                    height: "100%",
                    textAlign: "center",
                    lineHeight: 2,
                    mr: 10,
                }}>
                <Typography variant='h3' fontSize={{ xs: 40, sm: 75, md: 50 }}>
                    Token Manger
                </Typography>
                <Typography variant='p'>
                    Easily manage your tokens by entering your token address
                </Typography>
                <br />
                <NavLink to='/TokenManager'>
                    <Button
                        variant='contained'
                        sx={{
                            mt: 2.5,
                            mb: 5,
                            fontSize: { xs: "10vw", md: 30 },
                        }}>
                        manage
                    </Button>
                </NavLink>
            </Box>
        </Box>
    );
};

export default Gen;
