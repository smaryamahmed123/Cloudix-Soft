import React from "react";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import ServiceCard from "./ServiceCard";


export default function ServiceList({
  services,
  onDragEnd,
  onEdit,
  onDelete,
  onToggle,
}) {
  const safeServices =
    Array.isArray(services)
      ? services
      : [];


  if (safeServices.length === 0) {
    return (
      <Box
        sx={{
          py: 8,

          textAlign: "center",

          backgroundColor:
            "#FFFFFF",

          border:
            "1px dashed #D8E0E5",

          borderRadius: "18px",
        }}
      >
        <Typography
          sx={{
            color: "#18344F",

            fontSize: 16,

            fontWeight: 700,

            mb: 0.5,
          }}
        >
          No services yet
        </Typography>

        <Typography
          sx={{
            color: "#718398",

            fontSize: 13,
          }}
        >
          Add your first service to get started.
        </Typography>
      </Box>
    );
  }


  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="services"
      >
        {(provided) => (
          <Grid
            container
            spacing={2.5}

            {...provided.droppableProps}

            ref={
              provided.innerRef
            }
          >

            {safeServices.map(
              (
                service,
                index
              ) => (
                <Draggable
                  key={
                    service._id
                  }

                  draggableId={
                    String(
                      service._id
                    )
                  }

                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}

                      ref={
                        provided.innerRef
                      }

                      {...provided.draggableProps}

                      {...provided.dragHandleProps}
                    >
                      <ServiceCard
                        service={
                          service
                        }

                        onEdit={
                          onEdit
                        }

                        onDelete={
                          onDelete
                        }

                        onToggle={
                          onToggle
                        }
                      />
                    </Grid>
                  )}
                </Draggable>
              )
            )}

            {provided.placeholder}

          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}