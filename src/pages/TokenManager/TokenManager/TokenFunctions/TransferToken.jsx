import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { transferValid } from "../../../../validations/Validation";
import { UilExchangeAlt } from "@iconscout/react-unicons";
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

const TransferToken = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [transferButtonDisable, setTransferButtonDisable] = useState(false);
    const { tokenInfo, setTokenInfo, tokenIsPause, TokenContract } =
        useContext(TokenContext);
    const { open } = useWeb3Modal();

    const transferValidFormik = useFormik({
        initialValues: {
            to: "",
            value: Number,
        },
        validationSchema: transferValid,
        onSubmit: (values, { resetForm }) => {
            transferOnCLick(values);
            resetForm();
        },
    });

    const transferOnCLick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const to = values.to;
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            setTransferButtonDisable(true);
            try {
                const tx = await TokenContract.transfer(to, value);
                await toast.promise(tx.wait(), {
                    pending: "transaction pending",
                    success: "the transaction was completed successfully!",
                    error: "transaction failed",
                });
                let userInventory = await TokenContract.balanceOf(address);
                userInventory = showWithoutDecimals(
                    userInventory,
                    tokenInfo.decimals
                );
                setTokenInfo((prev) => ({
                    ...prev,
                    userInventory: userInventory,
                }));
            } catch (error) {
                toast.error(error.code);
            }
            setTransferButtonDisable(false);
        }
    };
    return (
        <Box
            component='form'
            onSubmit={transferValidFormik.handleSubmit}
            className='inputBox'
            id='transfer'
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
                    fontSize: "1.8rem",
                }}>
                transfer
            </Typography>
            <TextField
                id='to'
                name='to'
                label='to'
                value={transferValidFormik.values.to}
                onChange={transferValidFormik.handleChange}
                onBlur={transferValidFormik.handleBlur}
                error={
                    transferValidFormik.touched.to &&
                    Boolean(transferValidFormik.errors.to)
                }
                helperText={
                    transferValidFormik.touched.to &&
                    transferValidFormik.errors.to
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
                type='number'
                value={transferValidFormik.values.value}
                onChange={transferValidFormik.handleChange}
                onBlur={transferValidFormik.handleBlur}
                error={
                    transferValidFormik.touched.value &&
                    Boolean(transferValidFormik.errors.value)
                }
                helperText={
                    transferValidFormik.touched.value &&
                    transferValidFormik.errors.value
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
                variant='contained'
                size='large'
                disabled={
                    transferValidFormik.errors.to ||
                    transferValidFormik.errors.value ||
                    transferButtonDisable ||
                    tokenIsPause
                }
                color='secondary'
                type='submit'
                sx={{
                    width: "30vw",
                    ml: "2vw",
                    mt: "4vh",
                    mb: "2vh",
                }}>
                transfer
            </Button>
        </Box>
    );
};

export default TransferToken;
