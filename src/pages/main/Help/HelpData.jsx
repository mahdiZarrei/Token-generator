import {
  UilArrowCircleDown,
  UilFileInfoAlt,
  UilCheckCircle,
  UilChart,
} from "@iconscout/react-unicons";
const Help = [
  {
    title: "install your wallet",
    text: "To deploy, you need a wallet like Metamask and some ether",
    icon: <UilArrowCircleDown color="#FFCAD4" size="50" />,
  },
  {
    title: "Enter details",
    text: "Enter specifications such as name, symbol, decimal",
    icon: <UilFileInfoAlt color="#FFCAD4" size="50" />,
  },
  {
    title: "Deploy your token",
    text: "Click the Deploy button to deploy Tokon and get its address and code",
    icon: <UilCheckCircle color="#FFCAD4" size="50" />,
  },
  {
    title: "Manage your token",
    text: "It's time to manage it by entering your token address",
    icon: <UilChart color="#FFCAD4" size="50" />,
  },
];

export default Help;
