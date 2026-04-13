// import React, { useEffect, useState } from "react";
import {
  Store as StoreIcon,
  PhoneAndroid as PhoneAndroidIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Brush as BrushIcon,
  VideoLibrary as VideoLibraryIcon,
  RocketLaunch as RocketLaunchIcon,
} from "@mui/icons-material";
import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import ModernCard from "../Components/Card";
import CardSkeleton from "../Components/CardSkeleton";
import ServicesHero from "../Components/ServicesComponents.jsx/ServicesHero";
import WorkTogether from "../Components/ServicesComponents.jsx/WorkTogether";
import MissionSection from "../Components/ServicesComponents.jsx/MissionSection";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";

// import { fetchServices } from "../api/services";

// ---------- Assets ----------
import WebIcon from "../assets/WebApp.png";
import Designing from "../assets/Designing.png";
import Intigrity from "../assets/Intigrity.png";
import Editing from "../assets/Editting.png";
import Together from "../assets/Together.png";
import Marketing from "../assets/Marketing.png";

const Services = () => {

  return (
    <>
      <ServicesHero />

      {/* <Container
        maxWidth="lg"
        sx={{
          my: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4 },
          position: "relative",
          zIndex: 2,
        }}
      > */}
      </Container>
      <ServicesSection limit="all" />
      <WorkTogether />
      <MissionSection />
    </>
  );
};

export default Services;
