import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutHero from "../Components/AboutUsComponents/AboutHero";
import AboutContent from "../Components/AboutUsComponents/AboutContent";
import CommitmentSection from "../Components/AboutUsComponents/CommitmentSection";
import TeamSection from "../Components/AboutUsComponents/TeamSection";
import VisionMission from "../Components/AboutUsComponents/VisionMission";
import OurTeam from "../Components/AboutUsComponents/teamMembers";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AboutUs = () => {
  const [about, setAbout] = useState(null);


  useEffect(() => {
    axios.get(`${backendURL}/api/about`).then((res) => setAbout(res.data));
  }, []);

  if (!about) return null;

  return (
    <>
      <AboutHero />
      <AboutContent intro={about.intro}  />
      <VisionMission vision={about.vision} mission={about.mission}/>
      <CommitmentSection  compliance={about.compliance} />
      <TeamSection teamIntro={about.teamIntro} />
      <OurTeam  team={about.team} />
    </>
  );
};

export default AboutUs;
