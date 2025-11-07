import { motion as Motion } from "framer-motion";
import React from "react";
import xImg from "/x.png";
import cloudiImg from "/cloudi.png";
import softImg from "/soft.png";

const LogoAnimated = () => {
  return (
    <Motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: [1, 1, 0], scale: [1, 1.1, 0.8] }}
      transition={{ duration: 2.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#fff",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Motion.div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {/* Cloudi */}
        <Motion.img
          src={cloudiImg}
          alt="Cloudi"
          style={{ width: 160, height: 160 }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        {/* X */}
        <Motion.img
          src={xImg}
          alt="X"
          style={{ width: 80, height: 80 }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1.3, rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Soft */}
        <Motion.img
          src={softImg}
          alt="Soft"
          style={{ width: 160, height: 160 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </Motion.div>
    </Motion.div>
  );
};

export default LogoAnimated;
