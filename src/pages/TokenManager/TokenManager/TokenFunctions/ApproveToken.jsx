import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { approveValid } from "../../../../validations/Validation";
import { UilCheckCircle } from "@iconscout/react-unicons";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import { sendWithDecimals } from "../../../../helper/Decimals";

const ApproveToken = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [approveButtonDisable, setApproveButtonDisable] = useState(false);
    const { tokenIsPause, tokenInfo, TokenContract } = useContext(TokenContext);
    const { open } = useWeb3Modal();
    const approveValidFormik = useFormik({
        initialValues: {
            to: "",
            value: Number,
        },
        validationSchema: approveValid,
        onSubmit: (values, { resetForm }) => {
            approveOnClick(values);
            resetForm();
        },
    });

    const approveOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const address = values.to;
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            setApproveButtonDisable(true);
            try {
                const tx = await TokenContract.approve(address, value);
                await toast.promise(tx.wait(), {
                    pending: "transaction pending",
                    success: "the transaction was completed successfully!",
                    error: "transaction failed",
                });
            } catch (error) {
                toast.error(error.code);
            }
            setApproveButtonDisable(false);
        }
    };

    return (
        <Box
            component='form'
            onSubmit={approveValidFormik.handleSubmit}
            className='inputBox'
            id='approve'
            sx={{
                pt: "1vh",
                mt: "1vh",
                ml: "1vw",
                width: { xs: "97vw", md: "47.5vw" },
                boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                borderRadius: "20px",
                textAlign: { xs: "center", md: "none" },
            }}>
            <UilCheckCircle size='140' />
            <Typography
                variant='h4'
                sx={{
                    fontSize: "1.8rem",
                }}>
                approve
            </Typography>
            <TextField
                id='to'
                name='to'
                label='to'
                value={approveValidFormik.values.to}
                onChange={approveValidFormik.handleChange}
                onBlur={approveValidFormik.handleBlur}
                error={
                    approveValidFormik.touched.to &&
                    Boolean(approveValidFormik.errors.to)
                }
                helperText={
                    approveValidFormik.touched.to &&
                    approveValidFormik.errors.to
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
                value={approveValidFormik.values.value}
                onChange={approveValidFormik.handleChange}
                onBlur={approveValidFormik.handleBlur}
                error={
                    approveValidFormik.touched.value &&
                    Boolean(approveValidFormik.errors.value)
                }
                helperText={
                    approveValidFormik.touched.value &&
                    approveValidFormik.errors.value
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
                color='secondary'
                disabled={
                    approveValidFormik.errors.to ||
                    approveValidFormik.errors.value ||
                    approveButtonDisable ||
                    tokenIsPause
                }
                type='submit'
                sx={{
                    width: "30vw",
                    mt: "4vh",
                    mb: "2vh",
                }}>
                Approve
            </Button>
        </Box>
    );
};

export default ApproveToken;
