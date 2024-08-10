import image from "./image.png";
import {
    Box,
    useTheme,
    Typography,
    Button,
    TextField,
    Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UilLock } from "@iconscout/react-unicons";
import { object, string } from "yup";
import { useFormik } from "formik";

const User = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const addressValid = object({
        address: string()
            .required("address to is required")
            .max(45, "More than 45 characters"),
    });
    const addressValidFormik = useFormik({
        initialValues: {
            address: "",
        },
        validationSchema: addressValid,
        onSubmit: (values, { resetForm }) => {
            manageTokenOnClick(values);
            resetForm();
        },
    });

    const manageTokenOnClick = (values) => {
        navigate(`/TokenManager/${values.address}`);
    };
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
                borderRadius: "40px",
            }}>
            <Box display={{ md: "grid", sm: "none", xs: "none" }}>
                <Box
                    component='img'
                    src={image}
                    sx={{ width: { md: 450, sm: "100%" }, ml: "8%", mr: 21 }}
                    alt='TokenManager'
                />
            </Box>
            <Box
                sx={{
                    width: 395,
                    height: "100%",
                    mt: 10,
                    mr: 10,
                    display: { md: "block", xs: "none" },
                    lineHeight: 2,
                }}>
                <Typography variant='h5' textAlign='center'>
                    If you made a token from our site
                </Typography>
                <Box
                    component='form'
                    sx={{ width: "100%" }}
                    onSubmit={addressValidFormik.handleSubmit}>
                    <Box
                        textAlign='center'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mt: 2,
                            alignItems: "center",
                        }}>
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: "primary.main",
                                color: "white",
                                textAlign: "center",
                            }}>
                            <UilLock />
                        </Avatar>
                        <Typography variant='h4'>sign in</Typography>
                    </Box>
                    <Typography sx={{ mt: 2 }} variant='h6'>
                        address :
                    </Typography>
                    <TextField
                        id='address'
                        name='address'
                        label='address'
                        value={addressValidFormik.values.address}
                        onChange={addressValidFormik.handleChange}
                        onBlur={addressValidFormik.handleBlur}
                        error={
                            addressValidFormik.touched.address &&
                            Boolean(addressValidFormik.errors.address)
                        }
                        helperText={
                            addressValidFormik.touched.address &&
                            addressValidFormik.errors.address
                        }
                        sx={{ mt: 2 }}
                        required
                        fullWidth
                        autoFocus
                    />
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        onClick={() => manageTokenOnClick()}
                        sx={{ mt: 3, fontSize: 15 }}>
                        manage
                    </Button>
                </Box>
            </Box>
            <Box display={{ md: "none", sm: "grid" }}>
                <Box
                    component='img'
                    src={image}
                    sx={{ width: "100%" }}
                    alt='TokenManager'
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
                <Typography variant='h2' fontSize={{ xs: 20, sm: 35 }}>
                    If you made a token from our site
                </Typography>
                <Box
                    textAlign='center'
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 2,
                        alignItems: "center",
                    }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: "primary.main",
                            color: "white",
                            textAlign: "center",
                        }}>
                        <UilLock />
                    </Avatar>
                    <Typography variant='h4'>sign in</Typography>
                </Box>
                <Box
                    component='form'
                    sx={{ width: "100%" }}
                    onSubmit={addressValidFormik.handleSubmit}>
                    <Typography sx={{ mt: 2 }} variant='h6'>
                        address
                    </Typography>
                    <Box sx={{ textAlign: "center" }}>
                        <TextField
                            id='address'
                            name='address'
                            label='address'
                            value={addressValidFormik.values.address}
                            onChange={addressValidFormik.handleChange}
                            onBlur={addressValidFormik.handleBlur}
                            error={
                                addressValidFormik.touched.address &&
                                Boolean(addressValidFormik.errors.address)
                            }
                            helperText={
                                addressValidFormik.touched.address &&
                                addressValidFormik.errors.address
                            }
                            sx={{ mt: 2, width: "90%" }}
                            required
                            fullWidth
                            autoFocus
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={() => manageTokenOnClick()}
                            sx={{ mt: 3, fontSize: 15, width: "90%", mb: 4 }}>
                            manage
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default User;
