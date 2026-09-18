import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const faqs = [
  {
    question: "How quickly will you respond to my inquiry?",
    answer:
      "We review incoming inquiries during our working hours and will get back to you as soon as possible.",
  },
  {
    question: "Can I request a custom website or application?",
    answer:
      "Yes. We can discuss your specific requirements and create a solution tailored to your business.",
  },
  {
    question: "Do you work on existing websites and applications?",
    answer:
      "Yes. You can contact us if you need improvements, new features, maintenance, or other development work.",
  },
  {
    question: "Can I contact Cloudix Soft for a project consultation?",
    answer:
      "Absolutely. Share your idea and requirements through the contact form and our team can discuss the project with you.",
  },
];

const ContactFAQ = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f7f8f5",
        py: {
          xs: 7,
          md: 10,
        },
      }}
    >
      <Container
        maxWidth="md"
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            sx={{
              color: "#769914",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            FAQ
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#111E2C",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        <Box>
          {faqs.map((faq) => (
            <Accordion
              key={faq.question}
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                border:
                  "1px solid rgba(17,30,44,0.08)",
                borderRadius: "12px !important",
                "&:before": {
                  display: "none",
                },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <AddIcon
                    sx={{
                      color: "#769914",
                    }}
                  />
                }
                sx={{
                  px: 2.5,
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111E2C",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  px: 2.5,
                  pb: 2.5,
                }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    fontSize: "0.92rem",
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ContactFAQ;