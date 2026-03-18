import React from "react";
import {
    Box,
    Typography,
    Stack,
    Avatar,
    Chip,
    Divider
} from "@mui/material";
import { FormateDate } from '../../utils/FormateDate'
import energyIcon from "../../assets/images/energy.svg";
import paceIcon from "../../assets/images/pace.svg";
import cueingIcon from "../../assets/images/cueing.svg";
import focusIcon from "../../assets/images/Focus.svg";
import musicIcon from "../../assets/images/Music.svg";

const purple = "#A855F7";

const InstructorVibeCard = ({ vibe }) => {
    const iconMap = {
        Energy: energyIcon,
        Pace: paceIcon,
        Cueing: cueingIcon,
        Focus: focusIcon,
        Music: musicIcon
    };
    return (
        <Box
            sx={{
                color: "black",
            }}
        >
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={vibe?.avatar} />
                    <Typography fontWeight={600}>
                        {vibe?.user?.firstName} {vibe?.user?.lastName}
                    </Typography>
                </Stack>

                <Typography variant="body2" color="#B0B0B0">
                    {FormateDate(vibe?.createdAt)}
                </Typography>
            </Stack>

            {/* Review Text */}
            <Typography mt={2} lineHeight={1.7} color="black">
                {vibe?.vibeText}
            </Typography>

            {/* Tags */}
            <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
                {vibe?.classStyle?.map((tag, i) => (
                    <Chip
                        key={i}
                        label={tag.name}
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
                {vibe?.describeVibe?.map((item, i) => (
                    <Stack key={i} alignItems="center" spacing={1}>

                        <img src={iconMap[item.title]} alt={item.title} width={54} />

                        <Typography fontSize={14}>
                            {item.title}
                        </Typography>

                        <Typography fontSize={14} color={purple}>
                            {item.range}
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
                    {vibe?.vibeTags?.experienceHighlights?.map((h, i) => (
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
                    {vibe?.vibeTags?.goodFitFor?.map((g, i) => (
                        <Typography key={i} fontSize={13}>
                            {g}
                        </Typography>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
};

export default InstructorVibeCard;
