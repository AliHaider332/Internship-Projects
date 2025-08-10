import React from "react";
import projectImage from "../assets/Pictures/Project1.png"; // put your image in src/assets folder

const Projects = () => {
  return (
    <div className="projects-container" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "10px" }}>My Projects</h2>
      <div
        className="project-card"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={projectImage}
          alt="Internship Project Preview"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
        />
        <h3>Internship Projects</h3>
        <p>
          This is a collection of my internship projects showcasing React, routing, and web app
          development skills.
        </p>
        <a
          href="https://internship-projects-doem.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            marginTop: "10px",
          }}
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export default Projects;
