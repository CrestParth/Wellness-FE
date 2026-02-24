import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const AccountDeletion = () => {
    return (
        <Box
            sx={{
                maxWidth: "900px",
                margin: "0px auto",
                padding: "24px",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <Typography variant="h4" fontWeight={600} gutterBottom>
                SWEAT SCOUT ACCOUNT DELETION POLICY
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                Last Updated: February 19, 2026
            </Typography>

            <Typography variant="body1" mb={2}>
                At Sweat Scout, we respect your right to control your personal data.
                You may request deletion of your account and associated data at any time.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 1 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                1. How to Request Account Deletion
            </Typography>

            <Typography variant="body1" mt={1}>
                You can request deletion directly from within the app under:
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1, mb: 1 }}>
                Settings → Delete Account
            </Typography>

            <Typography variant="body1" mb={2}>
                Alternatively, you may email <strong>hello@sweatscout.app</strong> with
                the subject line <em>“Account Deletion Request”</em>.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 2 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                2. What Happens When Your Account is Deleted
            </Typography>

            <Typography variant="body1" mt={1}>
                Your profile, login information, and personal data will be{" "}
                <strong>permanently removed</strong> from our active systems.
            </Typography>

            <Typography variant="body1" mt={1}>
                Some information may be retained for{" "}
                <strong>legal, regulatory, or security reasons</strong>, such as fraud
                prevention or enforcing our Terms of Service.
            </Typography>

            <Typography variant="body1" mt={1}>
                Once deleted, your account <strong>cannot be restored</strong>.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 3 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                3. Timeline for Deletion
            </Typography>

            <Typography variant="body1" mt={1}>
                Account deletion requests are typically processed within a few{" "}
                <strong>business days</strong>.
            </Typography>

            <Typography variant="body1" mt={1}>
                You will receive confirmation once deletion is complete.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 4 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                4. Data That May Be Retained
            </Typography>

            <Typography variant="body1" mt={1}>
                We may retain limited information where required by law or necessary
                for legitimate business purposes, including:
            </Typography>

            <Box sx={{ ml: 2, mt: 1 }}>
                <Typography variant="body1">
                    • Security logs to prevent fraud or abuse
                </Typography>
                <Typography variant="body1">
                    • Records needed to comply with legal obligations
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 5 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                5. Contact Us
            </Typography>

            <Typography variant="body1" mt={1}>
                If you have questions about account deletion, contact us at{" "}
                <strong>hello@sweatscout.app</strong>.
            </Typography>
        </Box>
    );
};

export default AccountDeletion;