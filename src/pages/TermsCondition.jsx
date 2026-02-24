import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const TermsCondition = () => {
    return (
        <Box
            sx={{
                maxWidth: "900px",
                margin: "0px auto",
                padding: "24px",
            }}
        >
            <Typography variant="h4" fontWeight={600} gutterBottom>
                SWEAT SCOUT TERMS OF SERVICE
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                Last Updated: February 19, 2026
            </Typography>

            <Typography variant="body1" mb={2}>
                These Terms of Service (“Terms”) govern your use of the Sweat Scout mobile
                application and related services (the “Services”). By using the Services,
                you agree to these Terms. If you do not agree, do not use the Services.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 1 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                1. WHAT SWEAT SCOUT IS NOT
            </Typography>
            <Typography variant="body1" mt={1}>
                Sweat Scout is a discovery platform. Sweat Scout does not verify,
                certify, endorse, or guarantee any instructor, class, or experience
                listed on the Services. Sweat Scout does not provide medical, health,
                or fitness advice. Participation in any activity discovered through
                the Services is at your own risk.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 2 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                2. ELIGIBILITY
            </Typography>
            <Typography variant="body1" mt={1}>
                You must be at least 13 years old to use the Services.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 3 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                3. ACCOUNTS
            </Typography>
            <Typography variant="body1" mt={1}>
                You are responsible for maintaining the confidentiality of your account
                and all activity that occurs under it.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 4 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                4. USER-GENERATED CONTENT (“VIBES”)
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={1}>
                A. Your Responsibility
            </Typography>
            <Typography variant="body1" mt={1}>
                You are solely responsible for content you submit, including vibes,
                comments, photos, profile information, or links.
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={2}>
                B. Permission to Use Content
            </Typography>
            <Typography variant="body1" mt={1}>
                By submitting content, you give Sweat Scout permission to display and
                use that content solely for operating and promoting the Services. You
                retain ownership of your content and may remove it at any time.
            </Typography>

            <Typography variant="body1" fontWeight={600} mt={2}>
                C. Content Removal
            </Typography>
            <Typography variant="body1" mt={1}>
                We may remove content that violates these Terms or is otherwise
                inappropriate.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 5 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                5. PROHIBITED CONDUCT
            </Typography>
            <Typography variant="body1" mt={1}>
                You agree not to misuse the Services, impersonate others, post false or
                harmful content, scrape the platform, or use the Services unlawfully.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 6 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                6. THIRD-PARTY LINKS
            </Typography>
            <Typography variant="body1" mt={1}>
                The Services may include links to third-party websites or services,
                including social media platforms or external websites. These third
                parties are not owned or controlled by Sweat Scout. Your use of
                third-party services is at your own risk.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 7 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                7. APP STORE & GOOGLE PLAY NOTICE
            </Typography>
            <Typography variant="body1" mt={1}>
                If you access the Services through the Apple App Store or Google Play
                Store, you acknowledge that these Terms are between you and Sweat Scout
                only, not Apple Inc. or Google LLC. Apple and Google are not responsible
                for the Services and have no obligation to provide support.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 8 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                8. DISCLAIMER OF WARRANTIES
            </Typography>
            <Typography variant="body1" mt={1}>
                THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.”
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 9 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                9. LIMITATION OF LIABILITY
            </Typography>
            <Typography variant="body1" mt={1}>
                To the fullest extent permitted by law, Sweat Scout is not liable for
                injuries, damages, user disputes, or reliance on vibes or other
                content.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 10 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                10. TERMINATION
            </Typography>
            <Typography variant="body1" mt={1}>
                We may suspend or terminate access to the Services at any time.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 11 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                11. CHANGES
            </Typography>
            <Typography variant="body1" mt={1}>
                We may update the Services or these Terms at any time. Continued use
                means acceptance.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 12 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                12. GOVERNING LAW
            </Typography>
            <Typography variant="body1" mt={1}>
                These Terms are governed by the laws of the State of Texas, USA,
                without regard to conflict-of-law principles, except where prohibited
                by applicable law.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SECTION 13 */}
            <Typography variant="h6" fontWeight={600} mt={2}>
                13. CONTACT
            </Typography>
            <Typography variant="body1" mt={1}>
                Email hello@sweatscout.app
            </Typography>
        </Box>
    );
};

export default TermsCondition;