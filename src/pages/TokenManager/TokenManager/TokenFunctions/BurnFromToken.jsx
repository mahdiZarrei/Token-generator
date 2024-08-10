import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { burnFromValid } from "../../../../validations/Validation";
import { UilFire } from "@iconscout/react-unicons";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import {
    sendWithDecimals,
    showWithoutDecimals,
} from "../../../../helper/Decimals";

const BurnFromToken = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [burnFromButtonDisable, setBurnFromButtonDisable] = useState(false);
    const { tokenInfo, setTokenInfo, tokenType, tokenIsPause ,TokenContract} =
        useContext(TokenContext);
    const { open } = useWeb3Modal();

    const burnFromValidFormik = useFormik({
        initialValues: {
            from: "",
            value: Number,
        },
        validationSchema: burnFromValid,
        onSubmit: (values, { resetForm }) => {
            burnFromOnClick(values);
            resetForm();
        },
    });

    const burnFromOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const from = values.from;
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            setBurnFromButtonDisable(true);
            try {
                const tx = await TokenContract.burnFrom(from, value);
                await toast.promise(tx.wait(), {
                    pending: "transaction pending",
                    success: "the transaction was completed successfully!",
                    error: "transaction failed",
                });
                let userInventory = await TokenContract.balanceOf(address);
                let totalSupply = await TokenContract.totalSupply();
                userInventory = showWithoutDecimals(
                    userInventory,
                    tokenInfo.decimals
                );
                totalSupply = showWithoutDecimals(
                    totalSupply,
                    tokenInfo.decimals
                );
                setTokenInfo((prev) => ({
                    ...prev,
                    totalSupply: totalSupply.toString(),
                    userInventory: userInventory,
                }));
            } catch (error) {
                toast.error(error.code);
            }
            setBurnFromButtonDisable(false);
        }
    };

    return (
        <Box
            component='form'
            onSubmit={burnFromValidFormik.handleSubmit}
            id='burnFrom'
            className='inputBox'
            boxShadow='0px 0px 5px rgb(119, 119, 119)'
            sx={{
                pt: "1vh",
                mt: "1vh",
                ml: "1vw",
                width: { xs: "97vw", md: "47.5vw" },
                borderRadius: "20px",
                textAlign: { xs: "center", md: "none" },
            }}>
            <UilFire size='140' />{" "}
            <Typography
                variant='h4'
                sx={{
                    pt: "2vh",
                    mt: "2vh",
                    ml: "2vw",
                    fontSize: "1.8rem",
                }}>
                burnFrom
            </Typography>
            <TextField
                id='from'
                name='from'
                label='from'
                disabled={!tokenType.burnable}
                value={burnFromValidFormik.values.from}
                onChange={burnFromValidFormik.handleChange}
                onBlur={burnFromValidFormik.handleBlur}
                error={
                    burnFromValidFormik.touched.from &&
                    Boolean(burnFromValidFormik.errors.from)
                }
                helperText={
                    burnFromValidFormik.touched.from &&
                    burnFromValidFormik.errors.from
                }
                sx={{
                    ml: "2vw",
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <TextField
                id='value'
                name='value'
                label='value'
                disabled={!tokenType.burnable}
                value={burnFromValidFormik.values.value}
                onChange={burnFromValidFormik.handleChange}
                onBlur={burnFromValidFormik.handleBlur}
                error={
                    burnFromValidFormik.touched.value &&
                    Boolean(burnFromValidFormik.errors.value)
                }
                helperText={
                    burnFromValidFormik.touched.value &&
                    burnFromValidFormik.errors.value
                }
                type='number'
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    ml: "2vw",
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <Button
                color='secondary'
                variant='contained'
                size='large'
                disabled={
                    burnFromValidFormik.errors.from ||
                    burnFromValidFormik.errors.value ||
                    burnFromButtonDisable ||
                    !tokenType.burnable ||
                    tokenIsPause
                }
                type='submit'
                sx={{
                    mb: "2vh",
                    ml: "2vw",
                    mt: "4vh",
                    width: "30vw",
                }}>
                burn
            </Button>
        </Box>
    );
};

export default BurnFromToken;
