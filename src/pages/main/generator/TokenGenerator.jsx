import { Box, Typography, Button, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { CreateToken, material, materialDark } from "../imgs/index";
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
                    theme.palette.mode == "dark" ? materialDark : material
                })`,
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: { xs: "0", md: "50%" },
                borderRadius: "40px",
            }}>
            <Box
                sx={{
                    mt: 10,
                    width: 395,
                    height: "100%",
                    textAlign: "center",
                    ml: 5,
                    lineHeight: 2,
                    display: { md: "block", xs: "none" },
                }}>
                <Typography variant='h3'>Token Generator</Typography>
                <Typography variant='p'>
                    Create your token without codingin a few clicks and support
                    blockchain
                </Typography>
                <br />
                <NavLink to='/tokenGenerator'>
                    <Button
                        variant='contained'
                        onClick={() => CreateToken()}
                        sx={{ mt: 5, mb: 5, fontSize: { md: "2vw" } }}>
                        Create Token
                    </Button>
                </NavLink>
            </Box>
            <Box display={{ md: "grid", sm: "none", xs: "none" }}>
                <Box
                    component='img'
                    src={CreateToken}
                    style={{ width: 450 }}
                    alt='TokenGenerator'
                />
            </Box>
            <Box display={{ md: "none", sm: "grid" }}>
                <Box
                    component='img'
                    src={men}
                    style={{ width: "100%" }}
                    alt='TokenGenerator'
                />
            </Box>
            <Box
                sx={{
                    mt: 10,
                    width: "100%",
                    textAlign: "center",
                    lineHeight: 2,
                    display: { md: "none", xs: "block" },
                }}>
                <Typography variant='h2' fontSize={{ xs: "3vw", sm: "8vw" }}>
                    Token Generator
                </Typography>
                <Typography variant='p'>
                    Create your token without codingin a few clicks and support
                    blockchain
                </Typography>
                <br />
                <NavLink to='/tokenGenerator'>
                    <Button
                        variant='contained'
                        sx={{ mt: 5, mb: 5, fontSize: { xs: "10vw" } }}>
                        Create
                    </Button>
                </NavLink>
            </Box>
        </Box>
    );
};

export default Gen;
