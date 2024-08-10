import { UilSetting, UilPlus, UilHome } from "@iconscout/react-unicons";
const tabsData = () => {
    const tabs = [
        {
            label: "/",
            text: "home",
            icon: <UilHome size='35' />,
        },
        {
            label: "/tokenGenerator",
            text: "generator",
            icon: <UilPlus size='35' />,
        },
        {
            label: "/TokenManager",
            text: "manager",

            icon: <UilSetting size='35' />,
        },
    ];

    return tabs;
};
export default tabsData;
