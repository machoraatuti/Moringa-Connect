import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    primary: {
      main: "#0A1F44", // Moringa primary color
    },
    secondary: {
      main: "#F05A28", // Moringa secondary color
    },
    background: {
      default: "#FFF5F2", // Light background color
    },
  },
});

export default theme;
