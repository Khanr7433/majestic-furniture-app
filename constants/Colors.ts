/**
 * Below are the colors that are used in the app.
 * The colors are defined in the light and dark mode.
 */

const tintColorLight = "#0056D2"; // Royal Blue
const tintColorDark = "#4DA1FF"; // Sky Blue

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#0056D2", // Royal Blue
    secondary: "#1A1A1A", // Dark Gray/Black
    card: "#F9F9F9",
    border: "#E5E5E5",
    error: "#BA1A1A",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#4DA1FF", // Sky Blue
    secondary: "#FFFFFF",
    card: "#2A2A2A",
    border: "#333333",
    error: "#FFB4AB",
  },
};
