import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { transferOwnershipValid } from "../../../../validations/Validation";
import { UilUserArrows } from "@iconscout/react-unicons";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";

const TransferOwnershipToken = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [transferOwnershipButtonDisable, setTransferOwnershipButtonDisable] =
        useState(false);
    const { tokenInfo, TokenContract } = useContext(TokenContext);
    const { open } = useWeb3Modal();

    const transferOwnershipValidFormik = useFormik({
        initialValues: {
            newOwner: "",
        },
        validationSchema: transferOwnershipValid,
        onSubmit: (values, { resetForm }) => {
            transferOwnershipOnClick(values);
            resetForm();
        },
    });

    const transferOwnershipOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            if (tokenInfo.isOwner) {
                const newOwner = values.newOwner;
                setTransferOwnershipButtonDisable(true);
                try {
                    const tx = await TokenContract.transferOwnership(newOwner);
                    tx.wait();
                    window.location.reload();
                } catch (error) {
                    toast.error(error.code);
                }
            } else {
                toast.error("only owner can call this function");
            }
        }
    };

    return (
        <Box
            component='form'
            onSubmit={transferOwnershipValidFormik.handleSubmit}
            className='inputBox'
            id='transferOwnership'
            sx={{
                pt: "1vh",
                mt: "1vh",
                ml: "1vw",
                width: { xs: "97vw", md: "47.5vw" },
                boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                borderRadius: "20px",
                textAlign: {
                    xs: "center",
                    md: "none",
                },
            }}>
            <UilUserArrows size='140' />{" "}
            <Typography
                variant='h4'
                sx={{
                    pt: "2vh",
                    mt: "2vh",
                    ml: "2vw",
                    fontSize: "1.8rem",
                }}>
                transfer ownership
            </Typography>
            <TextField
                id='newOwner'
                name='newOwner'
                label='newOwner'
                value={transferOwnershipValidFormik.values.newOwner}
                onChange={transferOwnershipValidFormik.handleChange}
                onBlur={transferOwnershipValidFormik.handleBlur}
                error={
                    transferOwnershipValidFormik.touched.newOwner &&
                    Boolean(transferOwnershipValidFormik.errors.newOwner)
                }
                helperText={
                    transferOwnershipValidFormik.touched.newOwner &&
                    transferOwnershipValidFormik.errors.newOwner
                }
                sx={{
                    ml: "2vw",
                    mt: "2vh",
                    width: {
                        xs: "70vw",
                        md: "30vw",
                    },
                }}
            />
            <Button
                color='secondary'
                variant='contained'
                size='large'
                disabled={
                    transferOwnershipValidFormik.errors.newOwner ||
                    transferOwnershipButtonDisable
                }
                type='submit'
                sx={{
                    mb: "2vh",
                    ml: "2vw",
                    mt: "4vh",
                    width: {
                        xs: "42vw",
                        md: "30vw",
                    },
                }}>
                transferOwner
            </Button>
        </Box>
    );
};

export default TransferOwnershipToken;
