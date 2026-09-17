import React from "react";
import { Helmet } from "react-helmet-async";
import ContactHero from "../Components/ContactComps/ContactHero";
import ContactInfo from "../Components/ContactComps/ContactInfo";
import ContactForm from "../Components/ContactComps/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* 1. SEO Metadata */}
      <Helmet>
        <title>Contact Us | Get in Touch - Cloudix Soft</title>
        <meta
          name="description"
          content="Contact Cloudix Soft for custom web development, mobile app inquiries, and digital marketing consultations. We are here to support your business growth."
        />
        <meta property="og:title" content="Contact Us | Cloudix Soft" />
        <meta
          property="og:description"
          content="Get in touch with Cloudix Soft. Reach us via email, phone, or fill out our message form."
        />
        <link rel="canonical" href="https://cloudixsoft.com/contact" />

        {/* Structured Data Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Cloudix Soft",
            "url": "https://cloudixsoft.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Cloudix Soft",
              "url": "https://cloudixsoft.com/",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Urdu"]
              }
            }
          })}
        </script>
      </Helmet>

      {/* 2. Components */}
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </>
  );
}