import {
  Store as StoreIcon,
  PhoneAndroid as PhoneAndroidIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Brush as BrushIcon,
  VideoLibrary as VideoLibraryIcon,
  RocketLaunch as RocketLaunchIcon,
} from "@mui/icons-material";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import ServicesHero from "../Components/ServicesComponents.jsx/ServicesHero";
import WorkTogether from "../Components/ServicesComponents.jsx/WorkTogether";
import MissionSection from "../Components/ServicesComponents.jsx/MissionSection";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";

const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesSection limit="all" />
      <WorkTogether />
      <MissionSection />
    </>
  );
};

export default Services;
