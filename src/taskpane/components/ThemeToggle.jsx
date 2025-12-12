/*
 * Author: Claude Code
 * Date: 2025-01-12
 * Description: Theme toggle slider component for switching between light and dark modes
 */

import React from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = React.memo(() => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      style={{
        position: "relative",
        width: "60px",
        height: "30px",
        backgroundColor: isDarkMode ? "#424242" : "#e0e0e0",
        borderRadius: "15px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        border: `1px solid ${isDarkMode ? "#666666" : "#cccccc"}`,
      }}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background icons */}
      <div
        style={{
          position: "absolute",
          left: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          color: isDarkMode ? "#888888" : "#ffa500",
          transition: "all 0.3s ease",
          opacity: isDarkMode ? 0.5 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SunOutlined />
      </div>
      <div
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          color: isDarkMode ? "#87ceeb" : "#888888",
          transition: "all 0.3s ease",
          opacity: isDarkMode ? 1 : 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MoonOutlined />
      </div>
      
      {/* Sliding toggle selector */}
      <div
        style={{
          width: "26px",
          height: "26px",
          backgroundColor: "#ffffff",
          borderRadius: "13px",
          position: "absolute",
          top: "50%",
          left: isDarkMode ? "32px" : "2px",
          transform: "translateY(-50%)",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDarkMode ? "#87ceeb" : "#ffa500",
        }}
      >
        {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
      </div>
    </div>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;