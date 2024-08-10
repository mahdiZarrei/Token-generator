import { NavLink } from "react-router-dom";
import {
  useTheme,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Zoom,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

import Help from "./HelpData";
export default function OutlinedCard() {
  const theme = useTheme();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <Box
      textAlign="center"
      sx={{
        ml: "1%",
        mr: "1%",
        mb: "1%",
        borderRadius: 11,
        border: `3px solid ${
          theme.palette.mode == "dark" ? "#40679E" : "#1B3C73"
        }`,
      }}
    >
      <Box sx={{ mb: 10, mt: 5 }}>
        <Typography
          variant="h2"
          fontSize={{ xs: 50, sm: 85 }}
          sx={{ color: "#FFCAD4" }}
        >
          how it's work
        </Typography>
      </Box>
      <Box
        display={{ xs: "block", md: "flex" }}
        textAlign="center"
        sx={{
          justifyContent: "space-between",
          ml: "3.5%",
          mr: "3.5%",
        }}
        ref={ref}
      >
        {Help.map((data, index) => {
          return (
            <Zoom
              key={index}
              in={inView}
              style={{ transitionDelay: inView ? "100ms" : "0ms" }}
            >
              <Card
                key={index}
                sx={{
                  width: { md: "20%", xs: "100%" },
                  border: "none",
                  pb: 2,
                  height: 250,
                }}
                variant="outlined"
              >
                <CardContent sx={{ height: 200 }}>
                  {data.icon}
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: "#FFCAD4" }}
                  >
                    {data.title}
                  </Typography>
                  <Typography>{data.text}</Typography>
                </CardContent>
              </Card>
            </Zoom>
          );
        })}
      </Box>
      <Box textAlign="center">
        <NavLink to="/tokenGenerator">
          <Button
            variant="contained"
            sx={{
              mt: 5,
              mb: 2,
              fontSize: { xs: "10vw", md: 30 },
            }}
          >
            start
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
}
