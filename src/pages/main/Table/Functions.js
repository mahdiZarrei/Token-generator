export const HeadCells = () => {
  const headCells = [
    {
      id: "Address_Creator",
      numeric: false,
      disablePadding: true,
      label: "Adrress Creator",
    },
    {
      id: "Network",
      numeric: true,
      disablePadding: false,
      label: "Network",
    },
    {
      id: "Address_Token",
      numeric: true,
      disablePadding: false,
      label: "Adrress Token",
    },
    {
      id: "Token_type",
      numeric: true,
      disablePadding: false,
      label: "Token type",
    },
    {
      id: "manage",
      numeric: true,
      disablePadding: false,
      label: "Manage",
    },
  ];
  return headCells;
};
