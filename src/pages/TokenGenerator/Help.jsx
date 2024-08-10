import { useState } from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { useTheme, Box, Tab } from "@mui/material";

import { tabs, tabsPanel } from "./HelpData";
const Help = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  return (
    <Box
      component="div"
      id="help"
      sx={{
        border: `3px solid ${
          theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
        }`,
        ml: "1%",
        mr: "1%",
        mb: "1%",
        borderRadius: 11,
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 11,
          }}
        >
          <TabList
            sx={{ borderRadius: "50px" }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onChange={handleChange}
          >
            {tabs.map((tab, index) => (
              <Tab value={index + 1} label={tab} />
            ))}
          </TabList>
        </Box>
        {tabsPanel.map((panel, index) => (
          <TabPanel
            value={index + 1}
            sx={{ textAlign: { md: "left", xs: "center" } }}
          >
            {panel}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Help;
