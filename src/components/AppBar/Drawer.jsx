import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  IconButton,
  Typography,
  ListItem,
  Divider,
  List,
  Drawer,
  Box,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Close, SwitchAccount, Add, ContentCopy } from "@mui/icons-material";
import { GuideData } from "../data/index.jsx";
import { TextEdit, copyToClipboard } from "../../helper/index.jsx";
const DrawerApp = () => {
  const [open, setOpen] = React.useState(false);
  const guide = GuideData();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h5">Account manager</Typography>
          </ListItemText>
          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </ListItem>
      </List>

      <Divider />
      <List
        subheader={
          <Typography variant="h6" sx={{ ml: "3%" }}>
            Accounts :
          </Typography>
        }
      >
        {[
          "0x8dedDf9068B594310b8914079CA41CE1cb5Bf6D0",
          "0x417C83C2674C85010A453a7496407B72E0a30ADF",
          "0x6607c992b0A9237eA793AF8bF1b4e69fC5c85E15",
        ].map((text, index) => (
          <ListItem key={text}>
            <ListItemText primary={TextEdit(text) + "(100Ether)"} />
            <NavLink to="/tokenGenerator">
              <IconButton>
                <Add />
              </IconButton>
            </NavLink>

            <IconButton onClick={() => copyToClipboard(text)}>
              <ContentCopy />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <Typography variant="h6" sx={{ ml: "3%" }}>
            Help :
          </Typography>
        }
      >
        {guide.map((text, index) => (
          <ListItem key={text.text}>
            <ListItemIcon>{text.icon} </ListItemIcon>
            <ListItemText primary={text.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box>
        <Tooltip title="Account Manager" arrow>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              m: "none",
              mr: 1,
              border: `1px solid `,
              borderRadius: "50%",
            }}
            color="inherit"
          >
            <SwitchAccount fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerApp;
