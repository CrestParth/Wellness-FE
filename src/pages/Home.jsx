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
        <Typography variant="body2" color="#878787">
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
                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="Total Instructors"
                            value={dashboardData.stats.totalInstructors}
                            bg="rgba(27, 120, 170, 0.2)"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="Active Instructors"
                            value={dashboardData.stats.activeInstructors}
                            bg="#6C63FF33"
                        />
                    </Grid>

                    {/* <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="Pending Approvals"
                            value={dashboardData.stats.pendingInstructors}
                            bg="#aa971b33"
                        />
                    </Grid> */}

                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="New Instructor Signups"
                            value={dashboardData.stats.newInstructorSignups}
                            bg="rgba(27, 170, 144, 0.2)"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    p: 3,
                    my: 5,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
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
                        <Typography variant="body2" color="text.secondary">
                            {activity.time}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Quick Actions
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ p: 2, borderRadius: "12px", border: "1px solid #E5E7EB", cursor: 'pointer' }}>

                        <Typography fontWeight={500}>Approve Instructors</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Review pending instructor requests
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ p: 2, borderRadius: "12px", border: "1px solid #E5E7EB", cursor: 'pointer' }}>

                        <Typography fontWeight={500}>Manage Reviews</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Moderate user reviews
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ p: 2, borderRadius: "12px", border: "1px solid #E5E7EB", cursor: 'pointer' }}>

                        <Typography fontWeight={500}>View Reports</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Check flagged content
                        </Typography>

                    </Grid>
                </Grid>
            </Box>


        </>
    )
}

export default Home
