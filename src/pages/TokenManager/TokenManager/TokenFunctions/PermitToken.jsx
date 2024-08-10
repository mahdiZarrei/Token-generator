import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { permitValid } from "../../../../validations/Validation";
import { useParams } from "react-router-dom";
import {
    useWeb3Modal,
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import TokenContext from "../../../../context/TokenContext.jsx";
import { UilCheckCircle } from "@iconscout/react-unicons";
import { sendWithDecimals } from "../../../../helper/Decimals";

const PermitToken = () => {
    const { isConnected } = useWeb3ModalAccount();
    const [permitButtonDisable, setPermitButtonDisable] = useState(false);
    const { tokenInfo, tokenIsPause, TokenContract } = useContext(TokenContext);
    const { open } = useWeb3Modal();
    
    const permitValidFormik = useFormik({
        initialValues: {
            owner: "",
            spender: "",
            value: Number,
            deadline: "",
            v: Number,
            r: "",
            s: "",
        },
        validationSchema: permitValid,
        onSubmit: (values, { resetForm }) => {
            permitOnClick(values);
            resetForm();
        },
    });

    const permitOnClick = async (values) => {
        if (!isConnected) {
            open();
        } else {
            const owner = values.owner;
            const spender = values.spender;
            let value = values.value;
            value = sendWithDecimals(value, tokenInfo.decimals);
            const deadline = values.deadline;
            const v = values.v;
            const r = values.r;
            const s = values.s;
            setPermitButtonDisable(true);
            try {
                const tx = await TokenContract.permit(
                    owner,
                    spender,
                    value,
                    deadline,
                    v,
                    r,
                    s
                );
                await toast.promise(tx.wait(), {
                    pending: "transaction pending",
                    success: "the transaction was completed successfully!",
                    error: "transaction failed",
                });
                setPermitButtonDisable(false);
            } catch (error) {
                toast.error(error.code);
                setPermitButtonDisable(false);
            }
        }
    };

    return (
        <Box
            component='form'
            onSubmit={permitValidFormik.handleSubmit}
            id='permit'
            className='inputBox'
            sx={{
                pt: "1vh",
                boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                ml: "1vw",
                width: "97vw",
                borderRadius: "20px",
                textAlign: "center",
            }}>
            <UilCheckCircle size='140' />{" "}
            <Typography
                variant='h4'
                sx={{
                    pt: "2vh",
                    mt: "2vh",
                    ml: "2vw",
                    fontSize: "2.8rem",
                }}>
                permit
            </Typography>
            <Box sx={{ width: "97vw", mt: "1vw" }}>
                <TextField
                    id='owner'
                    name='owner'
                    label='owner'
                    value={permitValidFormik.values.owner}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.owner &&
                        Boolean(permitValidFormik.errors.owner)
                    }
                    helperText={
                        permitValidFormik.touched.owner &&
                        permitValidFormik.errors.owner
                    }
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
                <TextField
                    id='spender'
                    name='spender'
                    label='spender'
                    value={permitValidFormik.values.spender}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.spender &&
                        Boolean(permitValidFormik.errors.spender)
                    }
                    helperText={
                        permitValidFormik.touched.spender &&
                        permitValidFormik.errors.spender
                    }
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
            </Box>
            <Box sx={{ width: "97vw" }}>
                <TextField
                    id='value'
                    name='value'
                    label='value'
                    value={permitValidFormik.values.value}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.value &&
                        Boolean(permitValidFormik.errors.value)
                    }
                    helperText={
                        permitValidFormik.touched.value &&
                        permitValidFormik.errors.value
                    }
                    type='number'
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
                <TextField
                    id='deadline'
                    name='deadline'
                    label='deadline'
                    value={permitValidFormik.values.deadline}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.deadline &&
                        Boolean(permitValidFormik.errors.deadline)
                    }
                    helperText={
                        permitValidFormik.touched.deadline &&
                        permitValidFormik.errors.deadline
                    }
                    type='number'
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
            </Box>
            <Box sx={{ width: "97vw" }}>
                <TextField
                    id='v'
                    name='v'
                    label='v'
                    value={permitValidFormik.values.v}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.v &&
                        Boolean(permitValidFormik.errors.v)
                    }
                    helperText={
                        permitValidFormik.touched.v &&
                        permitValidFormik.errors.v
                    }
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
                <TextField
                    id='r'
                    name='r'
                    label='r'
                    value={permitValidFormik.values.r}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.r &&
                        Boolean(permitValidFormik.errors.r)
                    }
                    helperText={
                        permitValidFormik.touched.r &&
                        permitValidFormik.errors.r
                    }
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
            </Box>
            <Box sx={{ width: "97vw" }}>
                <TextField
                    id='s'
                    name='s'
                    label='s'
                    value={permitValidFormik.values.s}
                    onChange={permitValidFormik.handleChange}
                    onBlur={permitValidFormik.handleBlur}
                    error={
                        permitValidFormik.touched.s &&
                        Boolean(permitValidFormik.errors.s)
                    }
                    helperText={
                        permitValidFormik.touched.s &&
                        permitValidFormik.errors.s
                    }
                    sx={{
                        ml: "2vw",
                        mt: "2vh",
                        width: { xs: "70vw", md: "40vw" },
                    }}
                />
            </Box>
            <Button
                variant='contained'
                size='large'
                type='submit'
                disabled={
                    permitValidFormik.errors.owner ||
                    permitValidFormik.errors.spender ||
                    permitValidFormik.errors.value ||
                    permitValidFormik.errors.deadline ||
                    permitValidFormik.errors.v ||
                    permitValidFormik.errors.r ||
                    permitValidFormik.errors.s ||
                    permitButtonDisable ||
                    tokenIsPause
                }
                color='secondary'
                sx={{
                    ml: "2vw",
                    mt: "4vh",
                    mb: "4vh",
                    width: { xs: "42vw", md: "40vw" },
                }}>
                permit
            </Button>
        </Box>
    );
};

export default PermitToken;
