import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TokenContext from "../../../context/TokenContext.jsx";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import AppBar from "../../../components/AppBar/AppBar.jsx";
import TokenInformation from "./TokenInformation";
import {
    AllowanceToken,
    ApproveToken,
    BalanceOfToken,
    BurnFromToken,
    BurnToken,
    MintToken,
    PermitToken,
    TransferFromToken,
    TransferOwnershipToken,
    TransferToken,
} from "./TokenFunctions";
import { BrowserProvider, Contract } from "ethers";
import {
    tokenGenerator1ABI,
    tokenGenerator1Address,
    tokenGenerator2ABI,
    tokenGenerator2Address,
    tokenGenerator3ABI,
    tokenGenerator3Address,
    tokenGenerator4ABI,
    tokenGenerator4Address,
} from "../../../data/GeneratorContractData.js";
import { useParams } from "react-router-dom";
import {
    UltimateToken,
    DefaultERC20,
    SuperERC20,
    SuperERC20Capped,
    SuperERC20Permit,
} from "../../../data/ContractData/index.js";
import Footer from "../../../components/Footer/index.jsx";
import { useHandleAccountChanged,useHandleChainChanged } from "../../../helper/handleChanged.js";

const TokenManager = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { tokenAddress } = useParams();
    useHandleAccountChanged();
    useHandleChainChanged();

    const [tokenIsPause, setTokenIsPause] = useState(false);
    const [TokenContract, setContract] = useState();
    const [tokenKind, setTokenKind] = useState({
        superERC20: "loading",
        capped: "loading",
        permit: "loading",
    });
    const [tokenType, setTokenType] = useState({
        burnable: false,
        mintable: false,
        pausable: false,
    });
    const [tokenInfo, setTokenInfo] = useState({
        name: "loading",
        symbol: "loading",
        totalSupply: "loading",
        owner: "loading",
        userInventory: "loading",
        isOwner: false,
    });

    useEffect(() => {
        const SetTokenKind = async () => {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const tokenGenerator1 = new Contract(
                tokenGenerator1Address,
                tokenGenerator1ABI,
                signer
            );
            const tokenGenerator2 = new Contract(
                tokenGenerator2Address,
                tokenGenerator2ABI,
                signer
            );
            const tokenGenerator3 = new Contract(
                tokenGenerator3Address,
                tokenGenerator3ABI,
                signer
            );
            const tokenGenerator4 = new Contract(
                tokenGenerator4Address,
                tokenGenerator4ABI,
                signer
            );
            const getEventsByTokenAddress = async (tokenAddress, contract) => {
                try {
                    const filter = contract.filters.TokenDeployed(
                        null,
                        tokenAddress
                    );
                    const events = await contract.queryFilter(filter);
                    return events;
                } catch (error) {
                    console.error("Error fetching events:", error);
                    return [];
                }
            };
            let kind;
            const tokenGenerators = [
                tokenGenerator1,
                tokenGenerator2,
                tokenGenerator3,
                tokenGenerator4,
            ];
            for (let index = 0; index < tokenGenerators.length; index++) {
                const event = await getEventsByTokenAddress(
                    tokenAddress,
                    tokenGenerators[index]
                );
                if (event.length !== 0) {
                    kind = event[0].args[2];
                    break
                }
            }
            if (kind === "UltimateERC20") {
                setTokenKind({
                    superERC20: true,
                    permit: true,
                    capped: true,
                });
                const tokenContract = new Contract(
                    tokenAddress,
                    UltimateToken,
                    signer
                );
                setContract(tokenContract);
            } else if (kind === "SuperERC20Permit") {
                setTokenKind({
                    superERC20: true,
                    permit: true,
                    capped: false,
                });
                const tokenContract = new Contract(
                    tokenAddress,
                    SuperERC20Permit,
                    signer
                );
                setContract(tokenContract);
            } else if (kind === "SuperCappedERC20") {
                setTokenKind({
                    superERC20: true,
                    permit: false,
                    capped: true,
                });
                const tokenContract = new Contract(
                    tokenAddress,
                    SuperERC20Capped,
                    signer
                );
                setContract(tokenContract);
            } else if (kind === "SuperERC20") {
                setTokenKind({
                    superERC20: true,
                    permit: false,
                    capped: false,
                });
                const tokenContract = new Contract(
                    tokenAddress,
                    SuperERC20,
                    signer
                );
                setContract(tokenContract);
            } else if (kind === "StandardERC20" || kind === "notfind") {
                setTokenKind({
                    superERC20: false,
                    permit: false,
                    capped: false,
                });
                const tokenContract = new Contract(
                    tokenAddress,
                    DefaultERC20,
                    signer
                );
                setContract(tokenContract);
            }
        };
        if(isConnected){
            SetTokenKind();
        }
    }, [isConnected]);
    return (
        <>
            <TokenContext.Provider
                value={{
                    tokenInfo,
                    setTokenInfo,
                    tokenType,
                    setTokenType,
                    tokenIsPause,
                    setTokenIsPause,
                    TokenContract,
                }}>
                <AppBar number={2} />
                <TokenInformation
                    tokenKind={tokenKind}
                    setTokenKind={(newValue) => {
                        setTokenKind(newValue);
                    }}
                />
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <TransferToken />
                        <TransferFromToken />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ApproveToken />
                        <AllowanceToken />
                    </Grid>
                    {tokenKind.superERC20 && tokenType.burnable && (
                        <>
                            <Grid item xs={12} md={6}>
                                <BurnToken />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <BurnFromToken />
                            </Grid>
                        </>
                    )}
                    {tokenKind.superERC20 &&
                        !tokenType.burnable &&
                        tokenInfo.isOwner && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <BurnToken />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <BurnFromToken />
                                </Grid>
                            </>
                        )}
                    {tokenKind.superERC20 && tokenInfo.isOwner && (
                        <>
                            <Grid item xs={12} md={6}>
                                <TransferOwnershipToken />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MintToken />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} md={6}>
                        <BalanceOfToken />
                    </Grid>
                    {tokenKind.permit !== "loading" && tokenKind.permit && (
                        <Grid item xs={12} md={12}>
                            <PermitToken />
                        </Grid>
                    )}
                </Grid>
            </TokenContext.Provider>
            <Footer/>
        </>
    );
};

export default TokenManager;
