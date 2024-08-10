import {
    createWeb3Modal,
    defaultConfig,
    useWeb3Modal,
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { Button, Box } from "@mui/material";
import { UilWallet } from "@iconscout/react-unicons";
import { TextEdit } from "../../utils/index.jsx";

const projectId = "6f63796b3178af382376765e2aeabdb4";

const sepolia = {
    chainId: 11155111,
    name: "Sepolia test network",
    currency: "SepoliaETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://sepolia.drpc.org/",
};

const metadata = {
    name: "TokenGenerator",
    description: "My Website description",
};

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia],
    projectId,
    enableAnalytics: true,
    themeVariables: {
        "--w3m-z-index": "10",
    },
});

const WalletConnect = () => {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useWeb3ModalAccount();
    if (isConnected) {
        return (
            <Box>
                <Box textAlign={"center"}>
                    <Button
                        onClick={() => open()}
                        sx={{ mr: { sm: 1 }, borderRadius: "50px" }}
                        variant='contained'
                        color='secondary'
                        endIcon={<UilWallet />}
                        size='large'>
                        {TextEdit(address)}
                    </Button>
                </Box>
            </Box>
        );
    } else {
        return (
            <>
                <Box display={{ sm: "block", xs: "block" }}>
                    <Button
                        onClick={() => open()}
                        sx={{ mr: 1, borderRadius: "50px" }}
                        variant='contained'
                        color='secondary'
                        endIcon={<UilWallet />}
                        size='large'>
                        Wallet
                    </Button>
                </Box>
            </>
        );
    }
};

export default WalletConnect;
