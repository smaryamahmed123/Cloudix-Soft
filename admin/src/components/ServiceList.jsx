import React from "react";
import { Grid } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services, onDragEnd, onEdit, onDelete, onToggle }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="services">
        {(provided) => (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.isArray(services) &&
              services.map((service, index) => (
                <Draggable key={service._id} draggableId={service._id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ServiceCard
                        service={service}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                      />
                    </Grid>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}
