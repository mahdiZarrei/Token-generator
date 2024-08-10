import { TableHead, TableRow, useTheme, TableCell } from "@mui/material";

import { HeadCells } from "./Functions";
export default function EnhancedTableHead() {
  const theme = useTheme();
  const headCells = HeadCells();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              backgroundColor: `${
                theme.palette.mode == "dark"
                  ? "rgba(17, 13, 13, 0.61)"
                  : "rgba(0, 68, 255, 0.315)"
              } `,
              fontSize: "25px",
            }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
