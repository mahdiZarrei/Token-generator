import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { burnValid } from "../../../../validations/Validation";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import { UilFire } from "@iconscout/react-unicons";
import {
    sendWithDecimals,
    showWithoutDecimals,
} from "../../../../helper/Decimals";

const BurnToken = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [burnButtonDisable, setBurnButtonDisable] = useState(false);
    const { tokenInfo, setTokenInfo, tokenType, tokenIsPause ,TokenContract} =
        useContext(TokenContext);
    const { open } = useWeb3Modal();

    const burnValidFormik = useFormik({
        initialValues: {
            value: Number,
        },
        validationSchema: burnValid,
        onSubmit: (values, { resetForm }) => {
            burnOnClick(values);
            resetForm();
        },
    });

    const burnOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            setBurnButtonDisable(true);
            try {
                const tx = await TokenContract.burn(value);
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
                    userInventory: userInventory,
                    totalSupply: totalSupply.toString(),
                }));
            } catch (error) {
                toast.error(error.code);
            }
            setBurnButtonDisable(false);
        }
    };

    return (
        <Box
            component='form'
            onSubmit={burnValidFormik.handleSubmit}
            id='burn'
            className='inputBox'
            sx={{
                pt: "1vh",
                mt: "1vh",
                ml: "1vw",
                width: { xs: "97vw", md: "47.5vw" },
                boxShadow: "0px 0px 5px rgb(119, 119, 119)",
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
                burn
            </Typography>
            <TextField
                id='value'
                name='value'
                label='value'
                disabled={!tokenType.burnable}
                value={burnValidFormik.values.value}
                onChange={burnValidFormik.handleChange}
                onBlur={burnValidFormik.handleBlur}
                error={
                    burnValidFormik.touched.value &&
                    Boolean(burnValidFormik.errors.value)
                }
                helperText={
                    burnValidFormik.touched.value &&
                    burnValidFormik.errors.value
                }
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
                    burnValidFormik.errors.value ||
                    burnButtonDisable ||
                    !tokenType.burnable ||
                    tokenIsPause
                }
                type='submit'
                sx={{
                    mb: "2vh",
                    ml: "2vw",
                    mt: "4vh",
                    width: { xs: "42vw", md: "30vw" },
                }}>
                burn
            </Button>
        </Box>
    );
};

export default BurnToken;
