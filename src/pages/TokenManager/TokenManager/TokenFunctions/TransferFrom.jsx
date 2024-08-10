import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { transferFromValid } from "../../../../validations/Validation";
import { UilExchangeAlt } from "@iconscout/react-unicons";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import {
    sendWithDecimals,
    showWithoutDecimals,
} from "../../../../helper/Decimals";

const TransferFromToken = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [transferFromButtonDisable, setTransferFromButtonDisable] =
        useState(false);
    const { tokenInfo, setTokenInfo, tokenIsPause, TokenContract } =
        useContext(TokenContext);
    const { open } = useWeb3Modal();

    const transferFromValidFormik = useFormik({
        initialValues: {
            from: "",
            to: "",
            value: Number,
        },
        validationSchema: transferFromValid,
        onSubmit: (values, { resetForm }) => {
            transferFromOnCLick(values);
            resetForm();
        },
    });

    const transferFromOnCLick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const from = values.from;
            const to = values.to;
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            setTransferFromButtonDisable(true);
            try {
                const tx = await TokenContract.transferFrom(from, to, value);
                await toast.promise(tx.wait(), {
                    pending: "transaction pending",
                    success: "the transaction was completed successfully!",
                    error: "transaction failed",
                });
                let userInventory = await TokenContract.balanceOf(address);
                userInventory = showWithoutDecimals(userInventory);
                setTokenInfo((prev) => ({
                    ...prev,
                    userInventory: userInventory,
                }));
            } catch (error) {
                toast.error(error.code);
            }
            setTransferFromButtonDisable(false);
        }
    };
    return (
        <Box
            component='form'
            onSubmit={transferFromValidFormik.handleSubmit}
            id='transferFrom'
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
            <UilExchangeAlt size='140' />
            <Typography
                variant='h4'
                sx={{
                    pt: "2vh",
                    fontSize: "1.8rem",
                }}>
                transferFrom
            </Typography>
            <TextField
                id='from'
                name='from'
                label='from'
                value={transferFromValidFormik.values.from}
                onChange={transferFromValidFormik.handleChange}
                onBlur={transferFromValidFormik.handleBlur}
                error={
                    transferFromValidFormik.touched.from &&
                    Boolean(transferFromValidFormik.errors.from)
                }
                helperText={
                    transferFromValidFormik.touched.from &&
                    transferFromValidFormik.errors.from
                }
                sx={{
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <TextField
                id='to'
                name='to'
                label='to'
                value={transferFromValidFormik.values.to}
                onChange={transferFromValidFormik.handleChange}
                onBlur={transferFromValidFormik.handleBlur}
                error={
                    transferFromValidFormik.touched.to &&
                    Boolean(transferFromValidFormik.errors.to)
                }
                helperText={
                    transferFromValidFormik.touched.to &&
                    transferFromValidFormik.errors.to
                }
                sx={{
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <TextField
                id='value'
                name='value'
                label='value'
                type='number'
                value={transferFromValidFormik.values.value}
                onChange={transferFromValidFormik.handleChange}
                onBlur={transferFromValidFormik.handleBlur}
                error={
                    transferFromValidFormik.touched.value &&
                    Boolean(transferFromValidFormik.errors.value)
                }
                helperText={
                    transferFromValidFormik.touched.value &&
                    transferFromValidFormik.errors.value
                }
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <Button
                variant='contained'
                size='large'
                id='TransferFromButton'
                color='secondary'
                type='submit'
                disabled={
                    transferFromValidFormik.errors.from ||
                    transferFromValidFormik.errors.to ||
                    transferFromValidFormik.errors.value ||
                    transferFromButtonDisable ||
                    tokenIsPause
                }
                sx={{
                    mb: "2vh",
                    mt: "2vh",
                    width: { xs: "45vw", md: "30vw" },
                }}>
                Transfer From
            </Button>
        </Box>
    );
};

export default TransferFromToken;
