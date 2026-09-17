import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import AboutHero from "../Components/AboutUsComponents/AboutHero";
import AboutContent from "../Components/AboutUsComponents/AboutContent";
import CommitmentSection from "../Components/AboutUsComponents/CommitmentSection";
import TeamSection from "../Components/AboutUsComponents/TeamSection";
import VisionMission from "../Components/AboutUsComponents/VisionMission";
import OurTeam from "../Components/AboutUsComponents/teamMembers";
import AboutSkeleton from "../Components/AboutUsComponents/AboutSkeleton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

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
      {/* 1. Page-Specific SEO Metadata */}
      <Helmet>
        <title>About Us | Shariah-Compliant IT Solutions - Cloudix Soft</title>
        <meta
          name="description"
          content="Learn about Cloudix Soft, an ethical and Shariah-compliant IT company delivering web development, mobile apps, e-commerce, and digital marketing."
        />
        <meta property="og:title" content="About Us | Cloudix Soft" />
        <meta
          property="og:description"
          content="Empowering businesses with custom, ethical, and reliable digital software solutions."
        />
        <link rel="canonical" href="https://cloudixsoft.com/about" />

        {/* Structured Data Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Cloudix Soft",
            "url": "https://cloudixsoft.com/about",
            "description": "Information about Cloudix Soft mission, vision, compliance, and team."
          })}
        </script>
      </Helmet>

      {/* 2. Page Sections */}
      <AboutHero />

      {loading && <AboutSkeleton />}

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
          {about?.compliance && (
            <CommitmentSection compliance={about.compliance} />
          )}
          {about?.teamIntro && <TeamSection teamIntro={about.teamIntro} />}
          {about?.team?.length > 0 && <OurTeam team={about.team} />}
        </>
      )}
    </>
  );
};

export default AboutUs;