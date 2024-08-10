import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Menu,
    MenuItem,
    useTheme,
    Box,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { tabsData } from "../../data";
import { UilListUl, UilListUiAlt } from "@iconscout/react-unicons";
const MenuBar = (props) => {
    const data = tabsData();
    const pageNow = props.index;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(pageNow);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    return (
        <>
            <Box
                onClick={handleClickListItem}
                sx={{ cursor: "pointer", mt: 1 }}>
                {anchorEl == null ? (
                    <UilListUl size='35' />
                ) : (
                    <UilListUiAlt size='35' />
                )}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ display: { xs: "flex", md: "none" } }}>
                {data.map((tab, index) => (
                    <NavLink
                        key={index}
                        to={tab.label}
                        style={{
                            color: `${
                                theme.palette.mode == "dark"
                                    ? "rgb(255, 255, 255)"
                                    : "rgb(0, 0, 0)"
                            }`,
                            textDecoration: "none",
                        }}>
                        <MenuItem
                            key={index}
                            disabled={index === selectedIndex}
                            selected={index === selectedIndex}
                            onClick={(event) =>
                                handleMenuItemClick(event, index)
                            }>
                            <ListItemIcon>{tab.icon}</ListItemIcon>
                            <ListItemText>{tab.text}</ListItemText>
                        </MenuItem>
                    </NavLink>
                ))}
            </Menu>
        </>
    );
};
export default MenuBar;
