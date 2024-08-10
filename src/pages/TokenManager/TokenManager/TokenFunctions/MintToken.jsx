import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { mintValid } from "../../../../validations/Validation";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import { UilMultiply } from "@iconscout/react-unicons";
import TokenContext from "../../../../context/TokenContext.jsx";
import {
    sendWithDecimals,
    showWithoutDecimals,
} from "../../../../helper/Decimals";

const MintToken = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [mintButtonDisable, setMintButtonDisable] = useState(false);
    const { tokenInfo, setTokenInfo, tokenType, tokenIsPause,TokenContract } =
        useContext(TokenContext);
    const { open } = useWeb3Modal();

    const mintValidFormik = useFormik({
        initialValues: {
            to: "",
            value: "",
        },
        validationSchema: mintValid,
        onSubmit: (values, { resetForm }) => {
            mintOnCLick(values);
            resetForm();
        },
    });

    const mintOnCLick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            if (tokenInfo.isOwner) {
                const to = values.to;
                let value = values.value;
                value = sendWithDecimals(value, tokenInfo.decimals);
                setMintButtonDisable(true);
                try {
                    const tx = await TokenContract.mint(to, value);
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
                setMintButtonDisable(false);
            } else {
                toast.error("only owner can call this function");
            }
        }
    };

    return (
        <Box
            component='form'
            onSubmit={mintValidFormik.handleSubmit}
            className='inputBox'
            id='transfer'
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
            <UilMultiply size='140' />{" "}
            <Typography
                variant='h4'
                sx={{
                    mt: "3vh",
                    ml: "2vw",
                    fontSize: "1.8rem",
                }}>
                Mint
            </Typography>
            <TextField
                id='to'
                name='to'
                label='to'
                disabled={!tokenType.mintable}
                value={mintValidFormik.values.to}
                onChange={mintValidFormik.handleChange}
                onBlur={mintValidFormik.handleBlur}
                error={
                    mintValidFormik.touched.to &&
                    Boolean(mintValidFormik.errors.to)
                }
                helperText={
                    mintValidFormik.touched.to && mintValidFormik.errors.to
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
                disabled={!tokenType.mintable}
                value={mintValidFormik.values.value}
                onChange={mintValidFormik.handleChange}
                onBlur={mintValidFormik.handleBlur}
                error={
                    mintValidFormik.touched.value &&
                    Boolean(mintValidFormik.errors.value)
                }
                helperText={
                    mintValidFormik.touched.value &&
                    mintValidFormik.errors.value
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
                    mintValidFormik.errors.to ||
                    mintValidFormik.errors.value ||
                    mintButtonDisable ||
                    !tokenType.mintable ||
                    tokenIsPause
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
                mint
            </Button>
        </Box>
    );
};

export default MintToken;
