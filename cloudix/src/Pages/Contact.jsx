import React from "react";
import { Helmet } from "react-helmet-async";

import ContactHero from "../Components/ContactComps/ContactHero";
import ContactServices from "../Components/ContactComps/ContactServices";
import ContactInfo from "../Components/ContactComps/ContactInfo";
import ContactProcess from "../Components/ContactComps/ContactProcess";
import ContactForm from "../Components/ContactComps/ContactForm";
import ContactFAQ from "../Components/ContactComps/ContactFAQ";
import ContactCTA from "../Components/ContactComps/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Get in Touch - Cloudix Soft</title>

        <meta
          name="description"
          content="Contact Cloudix Soft for web development, mobile apps, e-commerce, digital marketing, branding, and custom software solutions."
        />

        <meta
          property="og:title"
          content="Contact Us | Cloudix Soft"
        />

        <meta
          property="og:description"
          content="Have a project in mind? Get in touch with Cloudix Soft and let's build something great together."
        />

        <meta
          property="og:type"
          content="website"
        />

        <link
          rel="canonical"
          href="https://cloudixsoft.com/contact"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Cloudix Soft",
            url: "https://cloudixsoft.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Cloudix Soft",
              url: "https://cloudixsoft.com/",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Urdu"],
              },
            },
          })}
        </script>
      </Helmet>

      <ContactHero />

      <ContactServices />

      <ContactInfo />

      <ContactForm />

      <ContactProcess />

      <ContactFAQ />

      <ContactCTA />
    </>
  );
}