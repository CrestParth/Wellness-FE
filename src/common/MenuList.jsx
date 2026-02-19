import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    ShopOutlined,
    StarOutlined,
    DollarOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
const icons = {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    ShopOutlined,
    StarOutlined,
    DollarOutlined,
    AppstoreOutlined,
    FileTextOutlined,
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
        id: "vendors",
        name: "Studio Listing",
        path: "/home/vendors",
        add: "Add Studio",
        view: "Studio Information",
        icon: icons.ShopOutlined,
    },

    {
        id: "instructors",
        name: "Instructor Listing",
        path: "/home/instructors",
        add: "Add Instructor",
        view: 'Instructor Information',
        icon: icons.TeamOutlined,
    },

    {
        id: "users",
        name: "User Listing",
        path: "/home/users",
        view: 'User Information',
        icon: icons.UserOutlined,
    },

    {
        id: "vibe",
        name: "Vibe Checks",
        path: "/home/vibe",
        view: "Vibe Checks",
        icon: icons.StarOutlined,
    },

    {
        id: "subscriptions",
        name: "Subscriptions & Revenue",
        path: "/home/subscriptions",
        icon: icons.DollarOutlined,
    },

    {
        id: "categories",
        name: "Class Style",
        path: "/home/categories",
        icon: icons.AppstoreOutlined,
    },

    // {
    //     id: "content",
    //     name: "Content Management",
    //     path: "/home/content",
    //     icon: icons.FileTextOutlined,
    // },

    {
        id: "logout",
        name: "Logout",
        path: "/logout",
        icon: icons.LogoutOutlined,
    },
];



