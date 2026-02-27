import { useEffect, useState } from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { menulist } from "./MenuList";
import logo4 from "../assets/images/logo4.png";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 260;

const Sidebar = ({ isActive, setActive, sidebarRef }) => {
    const [currentMenu, setCurrentMenu] = useState("home");
    const location = useLocation();
    const nav = useNavigate();
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // detect md & up

    useEffect(() => {
        const currentPath = location.pathname.split("/");
        setCurrentMenu(currentPath[2] ? currentPath[2] : currentPath[1]);
        if (location.pathname.startsWith("/reports")) {
            setOpenReports(true);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();
        nav("/");
    };


    const drawerContent = (
        <Box sx={{
            height: '100%',
        }}>
            {/* --- Logo --- */}
            <Toolbar sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                <Box component="img" src={logo4} alt="logo" sx={{ width: "40%" }} />
                {/* <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: 'white' }}>Wellness</Typography> */}
            </Toolbar>
            {/* --- Menu List --- */}
            <List sx={{
                height: '88vh', overflowY: 'auto', scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" }, pt: 4
            }}>
                {menulist.map((menu) => {
                    return (
                        <ListItemButton
                            key={menu.id}
                            selected={currentMenu === menu.id}
                            onClick={() => menu.id === "logout" ? handleLogout() : nav(menu.path)}
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                                mb: 1,
                                "&.Mui-selected": {
                                    bgcolor: "var(--Blue)",
                                    boxShadow: `0px 6px 12px rgba(138, 43, 226, 0.35),0px 2px 6px rgba(138, 43, 226, 0.25)`,
                                    '&:hover': {
                                        bgcolor: "var(--Blue)"
                                    },
                                    "& .MuiTypography-root": { fontWeight: 600, color: "white" }
                                }
                            }}
                        >
                            <ListItemIcon>
                                <Box sx={{ boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", backgroundColor: 'white', borderRadius: '8px', p: 0.5, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <menu.icon style={{ fontSize: 22, color: "black" }} />
                                </Box>
                            </ListItemIcon>

                            <ListItemText primary={<Typography sx={{ fontSize: '14px', fontWeight: 550 }}> {menu.name} </Typography>} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <>
            {/* Permanent Sidebar on md+ */}
            {isMdUp ? (
                <Drawer
                    variant="permanent"
                    open

                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            border: '0px',
                            boxSizing: "border-box",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                // Temporary Drawer on xs/sm
                <Drawer
                    ref={sidebarRef}
                    variant="temporary"
                    open={isActive}
                    onClose={() => setActive(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            border: '0px',
                            boxSizing: "border-box",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
