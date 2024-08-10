import { useState } from "react";
import { UilCreateDashboard } from "@iconscout/react-unicons";
import {
    useWeb3ModalProvider,
    useWeb3ModalAccount,
    useWeb3Modal,
} from "@web3modal/ethers/react";
import { BrowserProvider, ethers } from "ethers";
import {
    Box,
    Typography,
    Button,
    useTheme,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import AppBar from "../../components/AppBar/AppBar.jsx";
import SucceedModal from "./Modal.jsx";
import Help from "./Help.jsx";
import { executorFunction } from "./functions.js";
import { GeneratorValid } from "../../validations/GeneatorValid.js";
import { hashData } from "./hashData.js";
import Footer from "../../components/Footer/index.jsx";
import image from "./generatorImage.png";

export default function SignUp() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [network, setNetwork] = useState("");
    const [btn, setBtn] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const { address, isConnected, chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { open } = useWeb3Modal();
    const formik = useFormik({
        initialValues: {
            name: "",
            symbol: "",
            supply: Number,
            cap: "",
            Burn: false,
            Mint: false,
            Puase: false,
            Permit: false,
        },
        validationSchema: GeneratorValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });

    const onclick = async (props) => {
        try {
            setBtn(false);
            if (!isConnected) {
                open();
                throw toast.error("User disconnected");
            }
            const type = `burn:${props.burn},mint:${props.mint},pause:${props.pause},permit:${props.permit}`;
            const salt = hashData(
                props.name,
                props.symbol,
                type,
                address,
                chainId
            );

            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            try {
                const [tokenAddress, kind, owner] = await toast.promise(
                    executorFunction(props, signer, salt),
                    {
                        pending: "pending transaction",
                        success: "token deployed successfully",
                        error: "ERROR",
                    }
                );
                setTokenAddress(tokenAddress);
                setNetwork(kind);
                setOpenModal(true);
            } catch (error) {
                toast.error(error.code);
                console.log(error);
            }
            if (props.link !== "") {
                console.log(props.link);
            }
            setBtn(true);
        } catch (error) {
            setBtn(true);
            console.log(error);
        }
        console.log(props);
    };
    const theme = useTheme();

    return (
        <>
            <AppBar number={1} />
            <Box
                sx={{
                    mt: { md: 15, sm: 12, xs: 10 },
                    display: { xs: "grid", md: "flex" },
                    ml: "1%",
                    mr: "1%",
                    mb: "1%",
                    justifyContent: { xs: "center", md: "space-between" },
                    border: `3px solid ${
                        theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
                    }`,
                    borderRadius: 11,
                }}>
                <Box
                    display={{ md: "none", sm: "grid" }}
                    sx={{ width: "100%" }}
                    component='img'
                    src={image}
                />
                <Box
                    sx={{
                        marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: { md: 400, sm: "100%", xs: "100%" },
                        ml: { md: 10 },
                    }}>
                    <UilCreateDashboard size='50' />
                    <Typography component='h1' variant='h5'>
                        Token Generator
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={formik.handleSubmit}
                        sx={{ mt: 3 }}>
                        <Grid
                            container
                            spacing={2}
                            sx={{ textAlign: "center" }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={
                                        formik.touched.name &&
                                        formik.errors.name
                                            ? true
                                            : false
                                    }
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                            ? formik.errors.name
                                            : null
                                    }
                                    name='name'
                                    required
                                    type={null}
                                    sx={{
                                        width: {
                                            xs: "92%",
                                            md: "100%",
                                            sm: "98%",
                                        },
                                    }}
                                    id='name'
                                    label='Token Name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={
                                        formik.touched.symbol &&
                                        formik.errors.symbol
                                            ? true
                                            : false
                                    }
                                    value={formik.values.symbol}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.symbol &&
                                        formik.errors.symbol
                                            ? formik.errors.symbol
                                            : null
                                    }
                                    name='symbol'
                                    required
                                    sx={{
                                        width: {
                                            xs: "92%",
                                            md: "100%",
                                            sm: "98%",
                                        },
                                    }}
                                    id='symbol'
                                    label='Token Symbol'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={
                                        formik.touched.supply &&
                                        formik.errors.supply
                                            ? true
                                            : false
                                    }
                                    value={formik.values.supply}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.supply &&
                                        formik.errors.supply
                                            ? formik.errors.supply
                                            : null
                                    }
                                    name='supply'
                                    type='number'
                                    required
                                    sx={{
                                        width: {
                                            xs: "92%",
                                            md: "100%",
                                            sm: "98%",
                                        },
                                    }}
                                    id='supply'
                                    label='supply'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={
                                        formik.touched.cap && formik.errors.cap
                                            ? true
                                            : false
                                    }
                                    value={formik.values.cap}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.cap && formik.errors.cap
                                            ? formik.errors.cap
                                            : null
                                    }
                                    name='cap'
                                    type='number'
                                    sx={{
                                        width: {
                                            xs: "92%",
                                            md: "100%",
                                            sm: "98%",
                                        },
                                    }}
                                    id='cap'
                                    label='Cap'
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}></Grid>
                            <Grid
                                item
                                xs={12}
                                textAlign='center'
                                alignItems='center'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.Burn}
                                            onChange={formik.handleChange}
                                            name={"Burn"}
                                            color='primary'
                                        />
                                    }
                                    label={"Burn"}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.Mint}
                                            onChange={formik.handleChange}
                                            name={"Mint"}
                                            color='primary'
                                        />
                                    }
                                    label={"Mint"}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.Puase}
                                            onChange={formik.handleChange}
                                            name='Puase'
                                            color='primary'
                                        />
                                    }
                                    label='Puase'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.Permit}
                                            onChange={formik.handleChange}
                                            name={"Permit"}
                                            color='primary'
                                        />
                                    }
                                    label={"Permit"}
                                />
                            </Grid>
                        </Grid>
                        <Box textAlign='center'>
                            <Button
                                disabled={
                                    formik.errors.name ||
                                    formik.errors.supply ||
                                    formik.errors.symbol ||
                                    formik.errors.link ||
                                    formik.errors.cap ||
                                    !btn
                                        ? true
                                        : false
                                }
                                type='submit'
                                variant='contained'
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: { xs: "92%", md: "100%", sm: "98%" },
                                    fontSize: 25,
                                }}>
                                Generate
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display={{ md: "grid", sm: "none", xs: "none" }}
                    sx={{ mt: 5, width: 500 }}
                    component='img'
                    src={image}
                />
                <SucceedModal
                    onChange={(newOpen) => setOpenModal(newOpen)}
                    open={openModal}
                    tokenAddress={tokenAddress}
                    network={network}
                />
            </Box>
            <Help />
            <Footer />
        </>
    );
}
