import * as React from "react";
import PropTypes from "prop-types";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { THEME_COLORS } from "../utils/constants";

const headerStyles = {
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    paddingBottom: "30px",
    backgroundColor: "#f0f0f0",
    justifyContent: "space-around",
    position: "relative",
  },
  logoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  themeToggleContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  message: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#424242",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    width: "70%",
    height: "70%",
    maxWidth: "300px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
};

const Header = (props) => {
  const { title, logo, message } = props;
  const { isDarkMode } = useTheme();

  return (
    <section
      style={{
        ...headerStyles.welcome__header,
        backgroundColor: isDarkMode ? THEME_COLORS.DARK.BACKGROUND : THEME_COLORS.LIGHT.BACKGROUND,
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={headerStyles.logoRow}>
        <div style={headerStyles.logoContainer}>
          <img style={headerStyles.logo} src={logo} alt={title} />
        </div>
        <div style={headerStyles.themeToggleContainer}>
          <ThemeToggle />
        </div>
      </div>

      <div style={headerStyles.titleContainer}>
        <h1 style={{
          color: isDarkMode ? THEME_COLORS.DARK.TEXT_PRIMARY : THEME_COLORS.LIGHT.TEXT_PRIMARY,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>Welcome :)</h1>
        <h1
          style={{
            ...headerStyles.message,
            color: isDarkMode ? THEME_COLORS.DARK.TEXT_SECONDARY : THEME_COLORS.LIGHT.TEXT_SECONDARY
          }}
        >
          {message}
        </h1>
      </div>
    </section>
  );
};

//  Typing Property Types
Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  message: PropTypes.string,
};

export default Header;
