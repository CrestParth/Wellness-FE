import { Typography, Box, Grid } from '@mui/material'
import React from 'react'

const dashboardData = {
    stats: {
        totalInstructors: 66,
        activeInstructors: 48,
        pendingInstructors: 18,
        newInstructorSignups: 22,
    },
    recentActivities: [
        {
            id: 1,
            type: "INSTRUCTOR_SIGNUP",
            message: "Alex Trainer signed up",
            time: "2 hours ago",
        },
        {
            id: 2,
            type: "REVIEW",
            message: "New 5★ review for Fit Studio",
            time: "5 hours ago",
        },
        {
            id: 3,
            type: "FLAGGED",
            message: "Review flagged for inappropriate content",
            time: "1 day ago",
        },
    ],
};


const StatCard = ({ title, value, bg }) => (
    <Box
        sx={{
            height: "100%",
            backgroundColor: bg,
            borderRadius: "16px",
            px: 3,
            py: 3,
        }}
    >
        <Typography variant="body2" color="#D4D4D4">
            {title}
        </Typography>
        <Typography variant="h4" fontWeight={600} mt={1}>
            {value}
        </Typography>
    </Box>
);


const Home = () => {
    return (
        <>
            <Box sx={{ p: { xs: 0, sm: 2 } }}>
                <Grid container spacing={3} mb={5}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="Total Instructors"
                            value={dashboardData.stats.totalInstructors}
                            bg="#2E86AB33"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="Active Instructors"
                            value={dashboardData.stats.activeInstructors}
                            bg="#6C63FF33"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="Pending Approvals"
                            value={dashboardData.stats.pendingInstructors}
                            bg="#aa971b33"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="New Instructor Signups"
                            value={dashboardData.stats.newInstructorSignups}
                            bg="#D7263D33"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#1D1D1D",
                    borderRadius: "16px",
                    p: 3,
                    my: 5,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2} >
                    Recent Activities
                </Typography>

                {dashboardData.recentActivities.map((activity) => (
                    <Box
                        key={activity.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1.5,
                            // borderBottom: "1px solid #F3F4F6",
                        }}
                    >
                        <Typography>{activity.message}</Typography>
                        <Typography variant="body2" >
                            {activity.time}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box
                sx={{
                    backgroundColor: "#1D1D1D",
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Quick Actions
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: "12px",
                                border: "1px solid #E5E7EB",
                                cursor: "pointer",
                            }}
                        >
                            <Typography fontWeight={500}>Approve Instructors</Typography>
                            <Typography variant="body2">
                                Review pending instructor requests
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ p: 2, borderRadius: "12px", border: "1px solid #E5E7EB", cursor: "pointer", }}>
                            <Typography fontWeight={500}>Manage Reviews</Typography>
                            <Typography variant="body2" >
                                Moderate user reviews
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ p: 2, borderRadius: "12px", border: "1px solid #E5E7EB", cursor: "pointer", }}>
                            <Typography fontWeight={500}>View Reports</Typography>
                            <Typography variant="body2" >
                                Check flagged content
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Home
