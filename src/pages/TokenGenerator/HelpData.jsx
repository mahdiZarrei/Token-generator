import { Typography, Link, Box } from "@mui/material";
// import { TabPanel } from "@mui/lab";

export const tabs = [
    "Smart Contract",
    "StandardERC20",
    "Burnable",
    "Mintable",
    "Pausable",
    "Permit",
    "Capped",
];
export const tabsPanel = [
    <Box>
        <Typography variant='p'>
            A smart contract is a computer program or a transaction protocol
            that is intended to automatically execute, control or document
            events and actions according to the terms of a contract or an
            agreement. The objectives of smart contracts are the reduction of
            need for trusted intermediators, arbitration costs, and fraud
            losses, as well as the reduction of malicious and accidental
            exceptions. Smart contracts are commonly associated with
            cryptocurrencies, and the smart contracts introduced by Ethereum are
            generally considered a fundamental building block for decentralized
            finance (DeFi) and NFT applications
        </Typography>
        <Link
            href='https://en.wikipedia.org/wiki/Smart_contract'
            color='secondary'
            ml={1}
            underline='hover'
            target='_blank'>
            {"Click for more information"}
        </Link>
    </Box>,
    <Box>
        <Typography variant='p'>
            The ERC-20 introduces a standard for Fungible Tokens, in other
            words, they have a property that makes each Token be exactly the
            same (in type and value) as another Token. For example, an ERC-20
            Token acts just like the ETH, meaning that 1 Token is and will
            always be equal to all the other Tokens.
        </Typography>
        <Link
            href='https://ethereum.org/en/developers/docs/standards/tokens/erc-20/'
            color='secondary'
            ml={1}
            underline='hover'
            target='_blank'>
            {"Click for more information"}
        </Link>
    </Box>,
    <Box>
        {" "}
        <Typography variant='p'>
            Extension of ERC20 that allows token holders to destroy both their
            own tokens and those that they have an allowance for, in a way that
            can be recognized off-chain
        </Typography>
    </Box>,
    <Box>
        <Typography variant='p'>
            It allows the owner of the token to add tokens to the network after
            deployment
        </Typography>
    </Box>,
    <Box>
        {" "}
        <Typography variant='p'>
            This feature allows the owner to pause the token if needed. After
            pausing, token transfer or verification functions will not work.
        </Typography>
        <Link
            href='https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Pausable'
            color='secondary'
            ml={1}
            underline='hover'
            target='_blank'>
            {"Click for more information"}
        </Link>
    </Box>,
    <Box>
        <Typography variant='p'>
            permit This feature follows EIP-2612, which allows you to give
            someone an approve for your tokens without paying gas{" "}
        </Typography>
    </Box>,
    <Box>
        <Typography variant='p'>
            Extension of ERC20Mintable that adds a cap to the supply of tokens.
        </Typography>
    </Box>,
];
