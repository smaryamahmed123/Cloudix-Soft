import React, { useEffect, useState } from "react";
import axios from "axios";
import AboutHero from "../Components/AboutUsComponents/AboutHero";
import AboutContent from "../Components/AboutUsComponents/AboutContent";
import CommitmentSection from "../Components/AboutUsComponents/CommitmentSection";
import TeamSection from "../Components/AboutUsComponents/TeamSection";
import VisionMission from "../Components/AboutUsComponents/VisionMission";
import OurTeam from "../Components/AboutUsComponents/teamMembers";
import AboutSkeleton from "../Components/AboutUsComponents/AboutSkeleton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// const AboutUs = () => {
//   const [about, setAbout] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await axios.get(`${backendURL}/api/about`);
//         setAbout(res.data);
//       } catch (err) {
//         console.error("Failed to fetch About Us data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbout();
//   }, []);

//   if (loading) return <AboutSkeleton />;

//   if (error) {
//     return <div style={{ textAlign: "center", padding: "50px 0", color: "red" }}>{error}</div>;
//   }

//   return (
//     <>
//       <AboutHero />
//       {about?.intro && <AboutContent intro={about.intro} />}
//       {about?.vision && about?.mission && (
//         <VisionMission vision={about.vision} mission={about.mission} />
//       )}
//       {about?.compliance && <CommitmentSection compliance={about.compliance} />}
//       {about?.teamIntro && <TeamSection teamIntro={about.teamIntro} />}
//       {about?.team?.length > 0 && <OurTeam team={about.team} />}
//     </>
//   );
// };

// export default AboutUs;





const AboutUs = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/about`);
        setAbout(res.data);
      } catch (err) {
        console.error("Failed to fetch About Us data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return (
    <>
      <AboutHero />  {/* ✅ always renders immediately, no API needed */}

      {loading && <AboutSkeleton />}  {/* ✅ skeleton shows below hero while loading */}

      {!loading && error && (
        <div style={{ textAlign: "center", padding: "50px 0", color: "red" }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {about?.intro && <AboutContent intro={about.intro} />}
          {about?.vision && about?.mission && (
            <VisionMission vision={about.vision} mission={about.mission} />
          )}
          {about?.compliance && <CommitmentSection compliance={about.compliance} />}
          {about?.teamIntro && <TeamSection teamIntro={about.teamIntro} />}
          {about?.team?.length > 0 && <OurTeam team={about.team} />}
        </>
      )}
    </>
  );
};

export default AboutUs;
