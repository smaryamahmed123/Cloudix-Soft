import React from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DeleteOutline,
  DragIndicator,
  EditOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";


export default function ServiceCard({
  service,
  onEdit,
  onDelete,
  onToggle,
}) {
  const theme = useTheme();

  const colors = theme.dashboard || {
    navy: "#18344F",
    teal: "#18B6A5",
    tealLight: "#E7F8F5",
    red: "#E85B5B",
    redLight: "#FDEEEE",
    muted: "#718398",
    border: "#E4EBEF",
  };


  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",

        border: `1px solid ${colors.border}`,

        borderRadius: "18px",

        backgroundColor: "#FFFFFF",

        boxShadow:
          "0 8px 25px rgba(24,52,79,0.05)",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          boxShadow:
            "0 14px 35px rgba(24,52,79,0.10)",
        },

        "&::before": {
          content: '""',

          position: "absolute",

          top: 0,
          left: 0,
          right: 0,

          height: 4,

          backgroundColor:
            service.visible
              ? colors.teal
              : "#CBD5DA",
        },
      }}
    >

      <CardContent
        sx={{
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >

        {/* ==================================================
            TOP ROW
        ================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,

            mb: 2,
          }}
        >

          {/* Drag handle */}
          <Tooltip title="Drag to reorder">
            <Box
              sx={{
                width: 32,
                height: 32,

                borderRadius: "9px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: "#A2AFB9",

                backgroundColor:
                  "#F5F8FA",

                cursor: "grab",

                "&:active": {
                  cursor: "grabbing",
                },
              }}
            >
              <DragIndicator
                fontSize="small"
              />
            </Box>
          </Tooltip>


          {/* Status */}
          <Chip
            icon={
              service.visible ? (
                <VisibilityOutlined
                  sx={{
                    fontSize:
                      "15px !important",
                  }}
                />
              ) : (
                <VisibilityOffOutlined
                  sx={{
                    fontSize:
                      "15px !important",
                  }}
                />
              )
            }
            label={
              service.visible
                ? "Visible"
                : "Hidden"
            }
            size="small"
            sx={{
              height: 28,

              borderRadius: "8px",

              fontSize: 10.5,

              fontWeight: 700,

              color: service.visible
                ? colors.teal
                : colors.muted,

              backgroundColor:
                service.visible
                  ? colors.tealLight
                  : "#F1F3F5",

              "& .MuiChip-icon": {
                color: "inherit",
                ml: 0.7,
              },
            }}
          />

        </Box>


        {/* ==================================================
            IMAGE
        ================================================== */}

        <Box
          sx={{
            width: 64,
            height: 64,

            borderRadius: "15px",

            backgroundColor:
              colors.tealLight,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            mb: 2,

            overflow: "hidden",

            border:
              `1px solid ${colors.border}`,
          }}
        >
          {service.iconImage ? (
            <Box
              component="img"
              src={service.iconImage}
              alt={service.title}
              sx={{
                width: "100%",
                height: "100%",

                objectFit: "cover",
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 800,
                color: colors.teal,
              }}
            >
              {service.title
                ?.charAt(0)
                ?.toUpperCase() || "S"}
            </Typography>
          )}
        </Box>


        {/* ==================================================
            TITLE
        ================================================== */}

        <Typography
          sx={{
            color: colors.navy,

            fontSize: 16,

            fontWeight: 800,

            lineHeight: 1.3,

            mb: 0.8,
          }}
        >
          {service.title}
        </Typography>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <Typography
          sx={{
            color: colors.muted,

            fontSize: 12.5,

            lineHeight: 1.7,

            display: "-webkit-box",

            WebkitLineClamp: 3,

            WebkitBoxOrient:
              "vertical",

            overflow: "hidden",

            minHeight: 63,
          }}
        >
          {service.description}
        </Typography>


        {/* ==================================================
            DIVIDER
        ================================================== */}

        <Box
          sx={{
            height: 1,

            backgroundColor:
              colors.border,

            my: 2,
          }}
        />


        {/* ==================================================
            BOTTOM ACTIONS
        ================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >

          {/* Visibility */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <Switch
              size="small"

              checked={
                Boolean(
                  service.visible
                )
              }

              onChange={() =>
                onToggle(service)
              }

              sx={{
                "& .MuiSwitch-switchBase.Mui-checked":
                {
                  color:
                    colors.teal,
                },

                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                {
                  backgroundColor:
                    colors.teal,
                },
              }}
            />

            <Typography
              sx={{
                color:
                  colors.muted,

                fontSize: 11,

                fontWeight: 600,
              }}
            >
              {service.visible
                ? "Active"
                : "Hidden"}
            </Typography>
          </Stack>


          {/* Actions */}
          <Stack
            direction="row"
            spacing={0.5}
          >

            <Tooltip title="Edit service">
              <IconButton
                size="small"
                onClick={() =>
                  onEdit(service)
                }
                sx={{
                  width: 34,
                  height: 34,

                  color:
                    colors.teal,

                  backgroundColor:
                    colors.tealLight,

                  borderRadius: "9px",

                  "&:hover": {
                    backgroundColor:
                      colors.teal,

                    color: "#FFFFFF",
                  },
                }}
              >
                <EditOutlined
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>


            <Tooltip title="Delete service">
              <IconButton
                size="small"
                onClick={() =>
                  onDelete(
                    service._id
                  )
                }
                sx={{
                  width: 34,
                  height: 34,

                  color:
                    colors.red,

                  backgroundColor:
                    colors.redLight,

                  borderRadius: "9px",

                  "&:hover": {
                    backgroundColor:
                      colors.red,

                    color: "#FFFFFF",
                  },
                }}
              >
                <DeleteOutline
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>

          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
}