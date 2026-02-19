import React from "react";
import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    Divider
} from "@mui/material";

import energyIcon from "../assets/images/energy.svg";
import paceIcon from "../assets/images/pace.svg";
import cueingIcon from "../assets/images/cueing.svg";
import focusIcon from "../assets/images/Focus.svg";
import musicIcon from "../assets/images/Music.svg";

const purple = "#A855F7";

const VibeCard = ({ vibe }) => {
    return (
        <Box
            sx={{
                color: "black",
            }}
        >
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={vibe.avatar} />
                    <Typography fontWeight={600}>
                        {vibe.userName}
                    </Typography>
                </Stack>

                <Typography variant="body2" color="#B0B0B0">
                    {vibe.date}
                </Typography>
            </Stack>

            {/* Review Text */}
            <Typography mt={2} lineHeight={1.7} color="black">
                {vibe.note}
            </Typography>

            {/* Tags */}
            <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
                {vibe.tags?.map((tag, i) => (
                    <Chip
                        key={i}
                        label={tag}
                        sx={{
                            border: `1px solid ${purple}`,
                            color: purple,
                            backgroundColor: "transparent"
                        }}
                    />
                ))}
            </Stack>

            {/* Divider */}
            {/* <Stack direction="row" alignItems="center" mt={2} mb={2}>
                <Divider sx={{ flex: 1, borderColor: "#333" }} />
                <Typography mx={2} fontWeight={600}>
                    Vibes
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "#333" }} />
            </Stack> */}

            {/* Vibes Icons Row */}
            <Stack direction="row" justifyContent="space-between" mt={4}>
                {[
                    { icon: energyIcon, label: "Energy", value: vibe.energy },
                    { icon: paceIcon, label: "Pace", value: vibe.pace },
                    { icon: cueingIcon, label: "Cueing", value: vibe.cueing },
                    { icon: focusIcon, label: "Focus", value: vibe.focus },
                    { icon: musicIcon, label: "Music", value: vibe.music }
                ].map((item, i) => (
                    <Stack key={i} alignItems="center" spacing={1}>
                        {/* <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                border: `1px solid ${purple}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                           
                        </Box> */}
                        <img src={item.icon} alt={item.label} width={54} />

                        <Typography fontSize={14}>
                            {item.label}
                        </Typography>

                        <Typography fontSize={13} color={purple}>
                            {item.value}
                        </Typography>
                    </Stack>
                ))}
            </Stack>

            {/* Experience Boxes */}
            <Stack direction="row" spacing={2} mt={4}>
                <Box
                    sx={{
                        flex: 1,
                        border: `1px solid black`,
                        borderRadius: 2,
                        p: 2
                    }}
                >
                    <Typography fontWeight={600} mb={1}>
                        Experience Highlights
                    </Typography>
                    {vibe.highlights?.map((h, i) => (
                        <Typography key={i} fontSize={13}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        border: `1px solid black`,
                        borderRadius: 2,
                        p: 2
                    }}
                >
                    <Typography fontWeight={600} mb={1}>
                        Good fit for
                    </Typography>
                    {vibe.goodFor?.map((g, i) => (
                        <Typography key={i} fontSize={13}>
                            {g}
                        </Typography>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
};

export default VibeCard;
