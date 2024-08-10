import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { balanceOfValid } from "../../../../validations/Validation";
import { UilWallet } from "@iconscout/react-unicons";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import { showWithoutDecimals } from "../../../../helper/Decimals";

const BalanceOfToken = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [buttonDisable, setButtonDisable] = useState(false);
    const [balanceOfShow, setBalanceOfShow] = useState("");
    const { tokenInfo, TokenContract } = useContext(TokenContext);
    const { open } = useWeb3Modal();

    const balanceOfValidFormik = useFormik({
        initialValues: {
            address: "",
        },
        validationSchema: balanceOfValid,
        onSubmit: (values, { resetForm }) => {
            balanceOfOnClick(values);
            resetForm();
        },
    });

    const balanceOfOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const account = values.address;
            setButtonDisable(true);
            try {
                const tx = await TokenContract.balanceOf(account);
                setBalanceOfShow(
                    showWithoutDecimals(tx, tokenInfo.decimals) +
                        tokenInfo.symbol
                );
            } catch (error) {
                toast.error(error.code);
            }
            setButtonDisable(false);
        }
    };
    return (
        <>
            <Box
                component='form'
                onSubmit={balanceOfValidFormik.handleSubmit}
                id='balanceOf'
                className='inputBox'
                sx={{
                    pt: "1vh",
                    mt: "1vh",
                    ml: "1vw",
                    width: "97vw",
                    borderRadius: "20px",
                    textAlign: "center",
                    boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                }}>
                <UilWallet size='140' />
                <Typography
                    variant='h4'
                    sx={{
                        pt: "2vh",
                        fontSize: "2.5rem",
                    }}>
                    balance of
                </Typography>
                <Box sx={{ width: "97vw" }}>
                    <TextField
                        id='address'
                        name='address'
                        label='address'
                        value={balanceOfValidFormik.values.address}
                        onChange={balanceOfValidFormik.handleChange}
                        onBlur={balanceOfValidFormik.handleBlur}
                        error={
                            balanceOfValidFormik.touched.address &&
                            Boolean(balanceOfValidFormik.errors.address)
                        }
                        helperText={
                            balanceOfValidFormik.touched.address &&
                            balanceOfValidFormik.errors.address
                        }
                        sx={{
                            mt: "2vh",
                            width: { xs: "70vw", md: "50vw" },
                        }}
                    />
                </Box>
                <Button
                    variant='contained'
                    size='large'
                    color='secondary'
                    type='submit'
                    disabled={
                        balanceOfValidFormik.errors.address || buttonDisable
                    }
                    sx={{
                        mt: "4vh",
                        mb: "2vh",
                        width: { xs: "42vw", md: "50vw" },
                    }}>
                    balance of
                </Button>
                <Box
                    sx={{
                        width: "45vw",
                        m: "auto",
                        mt: "4vh",
                        mb:"3vh"
                    }}>
                    <Typography
                        variant='p'
                        sx={{
                            textAlign: "center",
                        }}
                        color='initial'>
                        {balanceOfShow}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default BalanceOfToken;
