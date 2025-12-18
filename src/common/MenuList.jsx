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
        name: "Vendor Management",
        path: "/home/vendors",
        view: "Vendor Management",
        icon: icons.ShopOutlined,
    },

    {
        id: "instructors",
        name: "Instructor Management",
        path: "/home/instructors",
        add: "Add Instructor",
        view: 'Instructor Information',
        icon: icons.TeamOutlined,
    },

    {
        id: "users",
        name: "User Management",
        path: "/home/users",
        icon: icons.UserOutlined,
    },

    {
        id: "reviews",
        name: "Reviews & Ratings",
        path: "/home/reviews",
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
        name: "Categories",
        path: "/home/categories",
        icon: icons.AppstoreOutlined,
    },

    {
        id: "content",
        name: "Content Management",
        path: "/home/content",
        icon: icons.FileTextOutlined,
    },

    {
        id: "logout",
        name: "Logout",
        path: "/logout",
        icon: icons.LogoutOutlined,
    },
];



