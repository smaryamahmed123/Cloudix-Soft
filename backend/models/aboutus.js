import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  position: String,
  image: String,
  description: String,
  socials: {
    instagram: String,
    linkedin: String,
    facebook: String,
  },
});

const AboutSchema = new mongoose.Schema({
  intro: {
    title: String,
    description: String,
    highlight: String,
    image: String,
  },
  vision: {
    title: String,
    description: String,
    image: String,
  },
  mission: {
    title: String,
    description: String,
    image: String,
  },
  compliance: {
    title: String,
    description: String,
    image: String,
  },
  teamIntro: {
    title: String,
    description: String,
    image: String,
  },
  team: [TeamMemberSchema],
  cta: {
    heading: String,
    subheading: String,
    buttonText: String,
    buttonLink: String,
  },
});

export default mongoose.model("About", AboutSchema);

