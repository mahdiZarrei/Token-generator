import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { allowanceValid } from "../../../../validations/Validation";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import { UilCoins } from "@iconscout/react-unicons";
import { showWithoutDecimals } from "../../../../helper/Decimals";
const AllowanceToken = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [allowanceButtonDisable, setAllowanceButtonDisable] = useState(false);
    const [allowanceShow, setAllowanceShow] = useState("");
    const { tokenInfo, TokenContract } = useContext(TokenContext);
    const { open } = useWeb3Modal();
    const allowanceValidFormik = useFormik({
        initialValues: {
            owner: "",
            spender: "",
            value: Number,
        },
        validationSchema: allowanceValid,
        onSubmit: (values, { resetForm }) => {
            allowanceOnClick(values);
            resetForm();
        },
    });

    const allowanceOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const owner = values.owner;
            const spender = values.spender;
            setAllowanceButtonDisable(true);
            try {
                let tx = await TokenContract.allowance(owner, spender);
                setAllowanceShow(
                    showWithoutDecimals(tx, tokenInfo.decimals) +
                        tokenInfo.symbol
                );
            } catch (error) {
                toast.error(error.code);
            }
            setAllowanceButtonDisable(false);
        }
    };

    return (
        <Box
            component='form'
            onSubmit={allowanceValidFormik.handleSubmit}
            id='allowance'
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
            <UilCoins size='140' />
            <Typography
                variant='h4'
                sx={{
                    pt: "2vh",
                    ml: "2vw",
                    fontSize: "1.8rem",
                }}>
                allowance
            </Typography>
            <TextField
                id='owner'
                name='owner'
                label='owner'
                value={allowanceValidFormik.values.owner}
                onChange={allowanceValidFormik.handleChange}
                onBlur={allowanceValidFormik.handleBlur}
                error={
                    allowanceValidFormik.touched.owner &&
                    Boolean(allowanceValidFormik.errors.owner)
                }
                helperText={
                    allowanceValidFormik.touched.owner &&
                    allowanceValidFormik.errors.owner
                }
                sx={{
                    ml: "2vw",
                    mt: "2vh",
                    width: { xs: "70vw", md: "30vw" },
                }}
            />
            <TextField
                id='spender'
                name='spender'
                label='spender'
                value={allowanceValidFormik.values.spender}
                onChange={allowanceValidFormik.handleChange}
                onBlur={allowanceValidFormik.handleBlur}
                error={
                    allowanceValidFormik.touched.spender &&
                    Boolean(allowanceValidFormik.errors.spender)
                }
                helperText={
                    allowanceValidFormik.touched.spender &&
                    allowanceValidFormik.errors.spender
                }
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
                sx={{
                    ml: "2vw",
                    mt: "4vh",
                    mb: "2vh",
                    width: "30vw",
                }}
                disabled={
                    allowanceValidFormik.errors.owner ||
                    allowanceValidFormik.errors.spender ||
                    allowanceButtonDisable
                }
                type='submit'>
                allowance
            </Button>
            <Box
                sx={{
                    width: "45vw",
                    m: "auto",
                    mt: "3vh",
                }}>
                <Typography
                    variant='p'
                    sx={{
                        textAlign: "center",
                    }}
                    color='initial'>
                    {allowanceShow}
                </Typography>
            </Box>
        </Box>
    );
};

export default AllowanceToken;
