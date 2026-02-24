import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <Box
            sx={{
                maxWidth: "900px",
                margin: "0px auto",
                padding: "24px",
            }}
        >
            <Typography variant="h4" fontWeight={600} gutterBottom>
                SWEAT SCOUT PRIVACY POLICY
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                Last Updated: February 19, 2026
            </Typography>

            <Typography variant="body1" mb={2}>
                Sweat Scout LLC (“Sweat Scout,” “we,” “us,” or “our”) values your
                privacy. This Privacy Policy explains how we collect, use, and share
                information when you use the Sweat Scout mobile application and
                related services (collectively, the “Services”).
            </Typography>

            <Typography variant="body1" mb={2}>
                By using the Services, you agree to this Privacy Policy.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 1 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                1. INFORMATION WE COLLECT
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={1}>
                A. Information You Provide Voluntarily
            </Typography>

            <Typography variant="body1" mt={1}>
                <strong>For all users:</strong> Name or display name; email address;
                account preferences; user-generated content including vibes, comments,
                and feedback; and communications you send to us.
            </Typography>

            <Typography variant="body1" mt={1}>
                <strong>For instructors:</strong> Name and profile information; bio and
                teaching style descriptions; class types and locations (if shared);
                photos; and external links you choose to include. All instructor
                information is voluntarily submitted and may be publicly visible
                within the app.
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={2}>
                B. Information Collected Automatically
            </Typography>

            <Typography variant="body1" mt={1}>
                Device type, operating system, app version, IP address, general
                location (city/state level), and app usage and interaction data used
                to operate and improve the Services.
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={2}>
                C. Information We Do Not Intentionally Collect
            </Typography>

            <Typography variant="body1" mt={1}>
                We do not intentionally collect payment or financial information,
                sensitive personal or health data, or information from children under
                13.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 2 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                2. HOW WE USE INFORMATION
            </Typography>

            <Typography variant="body1" mt={1}>
                We use information to operate and improve the Services; display
                instructor profiles and user-submitted vibes; support discovery and
                personalization; respond to inquiries and provide support; enforce our
                Terms of Service and prevent misuse; and comply with legal
                obligations. We do not sell personal data.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 3 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                3. SHARING OF INFORMATION
            </Typography>

            <Typography variant="body1" mt={1}>
                We may share information with service providers that help operate the
                Services; if required by law or legal process; to protect the rights,
                safety, or property of Sweat Scout or others; or in connection with a
                business transaction.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 4 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                4. PUBLIC CONTENT
            </Typography>

            <Typography variant="body1" mt={1}>
                Vibes, instructor profiles, and other public content may be visible to
                other users. You understand that public content may be viewed or shared
                outside of Sweat Scout.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 5 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                5. DATA RETENTION
            </Typography>

            <Typography variant="body1" mt={1}>
                We retain information only as long as reasonably necessary to operate
                the Services or meet legal requirements. You may request account
                deletion by emailing hello@sweatscout.app.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 6 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                6. CHILDREN’S PRIVACY
            </Typography>

            <Typography variant="body1" mt={1}>
                Sweat Scout is not intended for users under 13. If we become aware that information from a child under 13 has
                been collected, we will delete it.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 7 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                7. CHANGES TO THIS POLICY
            </Typography>

            <Typography variant="body1" mt={1}>
                We may update this Privacy Policy from time to time. Continued use of the Services means you accept the
                updated policy.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 8 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                8. CONTACT
            </Typography>

            <Typography variant="body1" mt={1}>
                Email hello@sweatscout.app
            </Typography>
        </Box>
    );
};

export default PrivacyPolicy;