import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const icons = {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
};

export const menulist = [
    {
        id: "home",
        name: "Dashboard",
        path: "/home",
        icon: icons.DashboardOutlined,
    },
    {
        id: "users",
        name: "User Management",
        path: "/home/users",
        icon: icons.UserOutlined,
    },

    {
        id: "logout",
        name: "Logout",
        path: "/logout",
        icon: icons.LogoutOutlined,
    },
];


