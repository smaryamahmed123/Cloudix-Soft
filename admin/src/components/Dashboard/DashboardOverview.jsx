// import React from "react";
// import { Box, Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { dash, cardSx } from "./dashboardPalette";

// const SERIES_COLORS = {
//     blogs: dash.green,
//     website: dash.navy,
//     messages: dash.lime,
// };

// const Legend = ({ color, label }) => (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//         <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
//         <Typography sx={{ color: dash.muted, fontSize: 11 }}>{label}</Typography>
//     </Box>
// );

// const DashboardOverview = ({
//     chartData = [],
//     isMobile,
//     range = "7d",
//     onRangeChange = () => { },
//     rangeOptions = {},
// }) => {
//     const data = Array.isArray(chartData) ? chartData : [];

//     const labels = data.map((d) => d?.month || "");
//     const blogs = data.map((d) => Number(d?.blogs) || 0);
//     const website = data.map((d) => Number(d?.website) || 0);
//     const messages = data.map((d) => Number(d?.messages) || 0);

//     // Avoid unreadable x-axis on the 30-day view
//     const step = data.length > 14 ? 5 : 1;

//     return (
//         <Card elevation={0} sx={{ ...cardSx, minWidth: 0, overflow: "hidden" }}>
//             <CardContent sx={{ p: { xs: 2, md: 2.5 }, "&:last-child": { pb: { xs: 2, md: 2.5 } } }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1 }}>
//                     <Box>
//                         <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>
//                             Website Overview
//                         </Typography>
//                         <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4 }}>
//                             Total content across your website
//                         </Typography>
//                     </Box>

//                     <Select
//                         size="small"
//                         value={range}
//                         onChange={(e) => onRangeChange(e.target.value)}
//                         sx={{
//                             height: 36,
//                             fontSize: 12,
//                             color: dash.navy,
//                             borderRadius: "8px",
//                             "& fieldset": { borderColor: dash.border },
//                         }}
//                     >
//                         {Object.entries(rangeOptions).map(([key, label]) => (
//                             <MenuItem key={key} value={key} sx={{ fontSize: 12 }}>
//                                 {label}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2.2, mb: 0.5 }}>
//                     <Legend color={SERIES_COLORS.blogs} label="Blogs" />
//                     <Legend color={SERIES_COLORS.website} label="Websites" />
//                     <Legend color={SERIES_COLORS.messages} label="Messages" />
//                 </Box>

//                 <Box sx={{ width: "100%", minWidth: 0, overflow: "hidden" }}>
//                     <LineChart
//                         xAxis={[
//                             {
//                                 scaleType: "point",
//                                 data: labels,
//                                 tickInterval: (_, index) => index % step === 0,
//                                 tickLabelStyle: { fontSize: 10, fill: dash.muted },
//                             },
//                         ]}
//                         yAxis={[{ min: 0, tickLabelStyle: { fontSize: 10, fill: dash.muted } }]}
//                         series={[
//                             {
//                                 id: "blogs",
//                                 data: blogs,
//                                 label: "Blogs",
//                                 color: SERIES_COLORS.blogs,
//                                 curve: "linear",
//                                 area: true,
//                                 showMark: true,
//                             },
//                             {
//                                 id: "website",
//                                 data: website,
//                                 label: "Websites",
//                                 color: SERIES_COLORS.website,
//                                 curve: "linear",
//                                 area: true,
//                                 showMark: true,
//                             },
//                             {
//                                 id: "messages",
//                                 data: messages,
//                                 label: "Messages",
//                                 color: SERIES_COLORS.messages,
//                                 curve: "linear",
//                                 area: true,
//                                 showMark: true,
//                             },
//                         ]}
//                         height={isMobile ? 240 : 270}
//                         margin={{ left: 35, right: 14, top: 10, bottom: 30 }}
//                         grid={{ horizontal: true, vertical: true }}
//                         slotProps={{ legend: { hidden: true } }}
//                         sx={{
//                             width: "100%",
//                             "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: dash.border },
//                             "& .MuiChartsGrid-line": { stroke: dash.border, strokeDasharray: "3 3" },
//                             "& .MuiLineElement-root": { strokeWidth: 2 },
//                             "& .MuiAreaElement-root": { fillOpacity: 0.1 },
//                             "& .MuiMarkElement-root": { strokeWidth: 2, fill: "#fff" },
//                         }}
//                     />
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default DashboardOverview;



import React, { useMemo } from "react";
import { Box, Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { dash, cardSx } from "./dashboardPalette";

const SERIES_COLORS = {
    blogs: dash.green,
    portfolio: dash.navy,
    messages: dash.lime,
};

const Legend = ({ color, label }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <Box
            sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: color,
            }}
        />
        <Typography sx={{ color: dash.muted, fontSize: 11 }}>
            {label}
        </Typography>
    </Box>
);

const DashboardOverview = ({
    chartData = [],
    isMobile,
    range = "7d",
    onRangeChange = () => { },
    rangeOptions = {},
}) => {
    const data = Array.isArray(chartData) ? chartData : [];

    const labels = data.map((item, index) =>
        item?.month || `Point ${index + 1}`
    );

    const blogs = data.map((item) => Number(item?.blogs) || 0);
    const portfolio = data.map(
        (item) => Number(item?.portfolio ?? item?.website) || 0
    );
    const messages = data.map((item) => Number(item?.messages) || 0);

    const hasData = data.length > 0;

    const step = data.length > 14 ? 5 : 1;

    const maxValue = Math.max(
        0,
        ...blogs,
        ...portfolio,
        ...messages
    );

    const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.15) : 5;

    return (
        <Card
            elevation={0}
            sx={{
                ...cardSx,
                width: "100%",
                minWidth: 0,
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 2, md: 2.5 },
                    "&:last-child": {
                        pb: { xs: 2, md: 2.5 },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: dash.navy,
                                fontSize: 18,
                                fontWeight: 800,
                            }}
                        >
                            Website Overview
                        </Typography>

                        <Typography
                            sx={{
                                color: dash.muted,
                                fontSize: 12.5,
                                mt: 0.4,
                            }}
                        >
                            Blogs, portfolio websites and messages over time
                        </Typography>
                    </Box>

                    {Object.keys(rangeOptions).length > 0 && (
                        <Select
                            size="small"
                            value={range}
                            onChange={(event) =>
                                onRangeChange(event.target.value)
                            }
                            sx={{
                                height: 36,
                                minWidth: 105,
                                fontSize: 12,
                                color: dash.navy,
                                borderRadius: 0,
                                "& fieldset": {
                                    borderColor: dash.border,
                                },
                            }}
                        >
                            {Object.entries(rangeOptions).map(([key, label]) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                    sx={{ fontSize: 12 }}
                                >
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        gap: 2.2,
                        mb: 0.5,
                    }}
                >
                    <Legend color={SERIES_COLORS.blogs} label="Blogs" />
                    <Legend color={SERIES_COLORS.portfolio} label="Portfolio Websites" />
                    <Legend color={SERIES_COLORS.messages} label="Messages" />
                </Box>

                <Box sx={{ width: "100%", minWidth: 0, overflow: "hidden" }}>
                    {hasData ? (
                        <LineChart
                            xAxis={[
                                {
                                    scaleType: "point",
                                    data: labels,
                                    tickInterval: (_, index) =>
                                        index % step === 0,
                                    tickLabelStyle: {
                                        fontSize: 10,
                                        fill: dash.muted,
                                    },
                                },
                            ]}
                            yAxis={[
                                {
                                    min: 0,
                                    max: yAxisMax,
                                    tickLabelStyle: {
                                        fontSize: 10,
                                        fill: dash.muted,
                                    },
                                },
                            ]}
                            series={[
                                {
                                    id: "blogs",
                                    data: blogs,
                                    label: "Blogs",
                                    color: SERIES_COLORS.blogs,
                                    curve: "linear",
                                    showMark: true,
                                },
                                {
                                    id: "portfolio",
                                    data: portfolio,
                                    label: "Portfolio Websites",
                                    color: SERIES_COLORS.portfolio,
                                    curve: "linear",
                                    showMark: true,
                                },
                                {
                                    id: "messages",
                                    data: messages,
                                    label: "Messages",
                                    color: SERIES_COLORS.messages,
                                    curve: "linear",
                                    showMark: true,
                                },
                            ]}
                            height={isMobile ? 240 : 270}
                            margin={{
                                left: 40,
                                right: 16,
                                top: 12,
                                bottom: 35,
                            }}
                            grid={{ horizontal: true, vertical: true }}
                            slotProps={{
                                legend: { hidden: true },
                            }}
                            sx={{
                                width: "100%",
                                "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
                                    stroke: dash.border,
                                },
                                "& .MuiChartsGrid-line": {
                                    stroke: dash.border,
                                    strokeDasharray: "3 3",
                                },
                                "& .MuiLineElement-root": {
                                    strokeWidth: 2.5,
                                },
                                "& .MuiMarkElement-root": {
                                    strokeWidth: 2,
                                    fill: "#FFFFFF",
                                },
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                height: isMobile ? 240 : 270,
                                display: "grid",
                                placeItems: "center",
                                color: dash.muted,
                                fontSize: 13,
                            }}
                        >
                            No chart data available.
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default DashboardOverview;
