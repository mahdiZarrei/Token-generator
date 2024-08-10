import {
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextEdit, copyToClipboard } from "../../../utils";
import {
    Box,
    Button,
    Checkbox,
    Grid,
    IconButton,
    Typography,
    FormControlLabel,
} from "@mui/material";
import { UilCopy } from "@iconscout/react-unicons";
import TokenContext from "../../../context/TokenContext";
import { showWithoutDecimals } from "../../../helper/Decimals";
import {
    useHandleAccountChanged,
    useHandleChainChanged,
} from "../../../helper/handleChanged";
import { transactionOnlyOwner } from "../../../helper/transactions";

const TokenInformation = ({ tokenKind }) => {
    const { address, isConnected } = useWeb3ModalAccount();
    const { tokenAddress } = useParams();
    const [checkBoxesDisable, setCheckBoxesDisable] = useState();
    const [
        renounceOwnershipButtonDisabled,
        setRenounceOwnershipButtonDisabled,
    ] = useState(false);
    const [pauseButtonDisable, setPauseButtonDisable] = useState(false);
    const {
        tokenInfo,
        setTokenInfo,
        tokenType,
        setTokenType,
        setTokenIsPause,
        tokenIsPause,
        TokenContract,
    } = useContext(TokenContext);
    const { open } = useWeb3Modal();

    useEffect(() => {
        const getInfo = async () => {
            const name = await TokenContract.name();
            const symbol = await TokenContract.symbol();
            const decimals = await TokenContract.decimals();
            let totalSupply = await TokenContract.totalSupply();
            totalSupply = showWithoutDecimals(totalSupply, decimals);
            if (tokenKind.superERC20) {
                var pausable = await TokenContract.pausable();
                var burnable = await TokenContract.burnable();
                var mintable = await TokenContract.mintable();
                var owner = await TokenContract.owner();
                if (pausable) {
                    var isPause = await TokenContract.paused();
                    if (isPause) {
                        setTokenIsPause(true);
                    }
                } else {
                    var isPause = false;
                }
                var isOwner = owner === address;
            } else {
                var owner = "there is no owner";
                var isOwner = false;
                var isPause = false;
            }
            let userInventory = await TokenContract.balanceOf(address);
            userInventory = showWithoutDecimals(userInventory, decimals);
            setTokenInfo({
                name,
                symbol,
                totalSupply: totalSupply.toString(),
                owner,
                userInventory,
                isOwner,
                decimals,
            });
            setTokenType({
                mintable: mintable,
                burnable: burnable,
                pausable: pausable,
            });
            setTokenIsPause(isPause);
        };
        if (isConnected && TokenContract) {
            getInfo();
        }
    }, [isConnected, TokenContract]);

    const renounceOwnershipOnClick = async () => {
        transactionOnlyOwner(
            TokenContract.renounceOwnership,
            null,
            setRenounceOwnershipButtonDisabled,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };
    const pauseOnClick = async () => {
        transactionOnlyOwner(
            TokenContract.pause,
            null,
            setPauseButtonDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const unpauseOnClick = async () => {
        transactionOnlyOwner(
            TokenContract.unpause,
            null,
            setPauseButtonDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setMintable = async () => {
        transactionOnlyOwner(
            TokenContract.setMintable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setUnMintable = async () => {
        transactionOnlyOwner(
            TokenContract.setUnmintable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setBurnable = async () => {
        transactionOnlyOwner(
            TokenContract.setBurnable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setUnBurnable = async () => {
        transactionOnlyOwner(
            TokenContract.setUnburnable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setPausable = async () => {
        transactionOnlyOwner(
            TokenContract.setPausable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    const setUnPausable = async () => {
        transactionOnlyOwner(
            TokenContract.setUnpausable,
            null,
            setCheckBoxesDisable,
            isConnected,
            open,
            tokenInfo.isOwner
        );
    };

    return (
        <Box
            component='div'
            id='information_box'
            display='flex'
            sx={{
                mt: { xs: 12, md: 13 },
                ml: "1vw",
                width: "98%",
                pb: 2,
                borderRadius: "25px",
            }}>
            <Grid container spacing={0}>
                <Grid
                    item
                    xs={12}
                    sm={5.75}
                    md={2.5}
                    textAlign='center'
                    sx={{
                        boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                        borderRadius: "25px",
                        p: 2,
                    }}>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            fontSize: { sm: 30, md: 20, xs: 25 },
                        }}>
                        name :
                        {!isConnected ? "you not connected" : tokenInfo.name}
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            mb: "2vh",
                            fontSize: { sm: 30, md: 20, xs: 25 },
                        }}>
                        symbol :
                        {!isConnected ? "you not connected" : tokenInfo.symbol}
                    </Typography>
                </Grid>
                <Grid
                    ml='2vw'
                    mt={{ xs: "2vh", sm: 0 }}
                    item
                    xs={12}
                    sm={6}
                    md={4.5}
                    textAlign='center'
                    sx={{
                        boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                        borderRadius: "25px",
                        p: 2,
                    }}>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            fontSize: { sm: 23, md: 20, xs: 23 },
                        }}>
                        token :
                        {!isConnected
                            ? "you not connected"
                            : TextEdit(tokenAddress)}
                        <IconButton
                            aria-label='copy icon'
                            onClick={() => copyToClipboard(tokenAddress)}>
                            <UilCopy fontSize='small' />
                        </IconButton>
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            mb: "2vh",
                            fontSize: { sm: 22, md: 20, xs: 23 },
                        }}>
                        owner :
                        {!isConnected
                            ? "you not connected"
                            : tokenInfo.owner === "there is no owner"
                            ? tokenInfo.owner
                            : TextEdit(tokenInfo.owner)}
                        {!(tokenInfo.owner === "there is no owner") && (
                            <IconButton
                                aria-label='copy icon'
                                onClick={() =>
                                    copyToClipboard(tokenInfo.owner)
                                }>
                                <UilCopy fontSize='small' />
                            </IconButton>
                        )}
                    </Typography>
                </Grid>
                <Grid
                    ml={{ md: "2vw" }}
                    mt={{ xs: "2vh", md: 0 }}
                    item
                    xs={12}
                    md={4.5}
                    textAlign='center'
                    sx={{
                        boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                        borderRadius: "25px",
                        p: 2,
                    }}>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            fontSize: { xs: 20, sm: "3.5vw", md: "1.5vw" },
                        }}>
                        your inventory :
                        {!isConnected
                            ? "you not connected"
                            : tokenInfo.userInventory.toString()}
                    </Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            mt: "2vh",
                            mb: "2vh",
                            fontSize: { xs: 20, sm: "3.5vw", md: "1.5vw" },
                        }}>
                        totalSupply :
                        {!isConnected
                            ? "you not connected"
                            : tokenInfo.totalSupply}
                    </Typography>
                </Grid>
                {tokenKind.superERC20 &&
                    !tokenKind.superERC20 === "loading" && (
                        <Grid
                            item
                            md={12}
                            xs={12}
                            mt='2vh'
                            sx={{
                                boxShadow: "0px 0px 5px rgb(119, 119, 119)",
                                borderRadius: "25px",
                            }}>
                            <Box
                                ml='2vw'
                                mr={"5vw"}
                                mb={"2vh"}
                                display={"flex"}
                                flexDirection={{ xs: "column", md: "row" }}
                                textAlign={{ xs: "center" }}
                                justifyContent={{ md: "space-around" }}></Box>
                            <Box
                                display={{ md: "flex" }}
                                justifyContent={"space-around"}>
                                <Box
                                    ml={{ md: "4vh" }}
                                    textAlign='center'
                                    sx={{
                                        display: { md: "flex" },
                                    }}>
                                    {tokenInfo.isOwner && (
                                        <Button
                                            variant='contained'
                                            disabled={
                                                renounceOwnershipButtonDisabled
                                            }
                                            onClick={() => {
                                                renounceOwnershipOnClick();
                                            }}
                                            sx={{
                                                mt: "3vh",
                                                mb: "2vh",
                                                mr: "2vw",
                                            }}>
                                            renounce ownership
                                        </Button>
                                    )}
                                    {tokenInfo.isOwner && (
                                        <>
                                            <Button
                                                variant='contained'
                                                disabled={
                                                    pauseButtonDisable ||
                                                    tokenIsPause ||
                                                    !tokenType.pausable
                                                }
                                                onClick={() => {
                                                    pauseOnClick();
                                                }}
                                                sx={{
                                                    mt: "3vh",
                                                    mb: "2vh",
                                                }}>
                                                pause
                                            </Button>
                                            <Button
                                                variant='contained'
                                                disabled={
                                                    pauseButtonDisable ||
                                                    !tokenIsPause ||
                                                    !tokenType.pausable
                                                }
                                                onClick={() => {
                                                    unpauseOnClick();
                                                }}
                                                sx={{
                                                    mt: "3vh",
                                                    mb: "2vh",
                                                    ml: "2vw",
                                                }}>
                                                unpause
                                            </Button>
                                        </>
                                    )}
                                </Box>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        mt: "2.5vh",
                                    }}>
                                    pause :
                                    {!isConnected
                                        ? "you not connected"
                                        : tokenType.pausable
                                        ? tokenIsPause.toString()
                                        : "not pausable"}
                                </Typography>
                                <Box
                                    textAlign={{ xs: "center" }}
                                    display={{ md: "flex" }}
                                    justifyContent={"space-between"}
                                    mr={"2vw"}>
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='mintable'
                                        control={
                                            <Checkbox
                                                disabled={checkBoxesDisable}
                                                checked={tokenType.mintable}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setMintable();
                                                    } else {
                                                        setUnMintable();
                                                    }
                                                }}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='burnable'
                                        control={
                                            <Checkbox
                                                disabled={checkBoxesDisable}
                                                checked={tokenType.burnable}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setBurnable();
                                                    } else {
                                                        setUnBurnable();
                                                    }
                                                }}
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        labelPlacement='start'
                                        label='pausable'
                                        control={
                                            <Checkbox
                                                disabled={checkBoxesDisable}
                                                checked={tokenType.pausable}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setPausable();
                                                    } else {
                                                        setUnPausable();
                                                    }
                                                }}
                                            />
                                        }
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    )}
            </Grid>
        </Box>
    );
};

export default TokenInformation;
