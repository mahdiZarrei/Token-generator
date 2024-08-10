import { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import Box from "@mui/material/Box";
import {
    TableFooter,
    styled,
    useTheme,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

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
import shortenString from "../../../utils/TextEdit";
import EnhancedTableHead from "./EnhancedTableHead";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const InformationTable = () => {
    const [data, setData] = useState([]);
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();

    useEffect(() => {
        const getUserTokens = async () => {
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
            const getEventsByOwner = async (ownerAddress, contract) => {
                try {
                    const filter = contract.filters.TokenDeployed(ownerAddress);
                    const events = await contract.queryFilter(filter);
                    return events;
                } catch (error) {
                    console.error("Error fetching events:", error);
                    return [];
                }
            };
            const tokenGenerator1Data = await getEventsByOwner(
                address,
                tokenGenerator1
            );
            const tokenGenerator2Data = await getEventsByOwner(
                address,
                tokenGenerator2
            );
            const tokenGenerator3Data = await getEventsByOwner(
                address,
                tokenGenerator3
            );
            const tokenGenerator4Data = await getEventsByOwner(
                address,
                tokenGenerator4
            );
            const concat = Array(tokenGenerator1Data).concat(
                Array(tokenGenerator2Data),
                Array(tokenGenerator3Data),
                Array(tokenGenerator4Data)
            );
            let UserTokens = [];
            concat.map((array, index) => {
                array.forEach((element) => {
                    UserTokens.push(element);
                });
            });
            setData(UserTokens);
        };
        if (isConnected) {
            getUserTokens();
        }
    }, [isConnected]);

    useEffect(() => {
        if (walletProvider) {
            walletProvider.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    }, [walletProvider]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        data.length > 0 && (
            <Box
                sx={{
                    width: "98%",
                    ml: "1%",
                    mr: "5%",
                    mb: "1%",
                    borderRadius: "40px",
                    border: `2px solid ${
                        theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
                    }`,
                }}>
                <Typography
                    textAlign='center'
                    variant='h6'
                    sx={{ mb: 5, color: "#FFCAD4" }}
                    fontSize={{ xs: "35px", sm: "40px" }}>
                    The tokens you minted on this site
                </Typography>
                <Paper sx={{ width: "100%", borderRadius: "40px" }}>
                    <TableContainer sx={{ borderRadius: "40px" }}>
                        <Table>
                            <EnhancedTableHead rowCount={data.length} />
                            <TableBody>
                                {data.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <StyledTableRow
                                            tabIndex={-1}
                                            key={index}>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                align='center'
                                                padding='none'>
                                                {shortenString(row.args[0])}
                                            </TableCell>
                                            <TableCell align='center'>
                                                etherume
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.args[1]}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.args[2]}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <NavLink
                                                    target='_blank'
                                                    to={`/TokenManager/${row.args[1]}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "#1B3C73",
                                                    }}>
                                                    manage
                                                </NavLink>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        )
    );
};

export default InformationTable;
