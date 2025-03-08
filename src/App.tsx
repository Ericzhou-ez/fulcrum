import React, { useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, useActionData } from "react-router-dom";
import ScrollToTop from "./components/core/scrollToTop";
import AppRoutes from "./routes/appRoutes";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, useAuth } from "./contexts/user-context";
import Loading from "./components/core/loading";

function AppContent() {
   const [mode, setMode] = useState<"light" | "dark">(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
         return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
         ? "dark"
         : "light";
   });

   useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = (e: MediaQueryListEvent) => {
         const newMode = e.matches ? "dark" : "light";
         setMode(newMode);
         localStorage.setItem("theme", newMode);
      };
      mediaQuery.addEventListener("change", handleThemeChange);
      return () => mediaQuery.removeEventListener("change", handleThemeChange);
   }, []);

   useEffect(() => {
      localStorage.setItem("theme", mode);
   }, [mode]);

   const theme = useMemo(
      () =>
         createTheme({
            palette: {
               mode,
               primary: { main: "#f27e35" },
               secondary: { main: "#f5bf46" },
               background: {
                  default: mode === "light" ? "#ffffff" : "#121212",
                  paper: mode === "light" ? "#fefefe" : "#1e1e1e",
               },
               text: {
                  primary: mode === "light" ? "#000000" : "#ffffff",
                  secondary: mode === "light" ? "#555555" : "#cccccc",
               },
            },
            typography: {
               fontFamily: "Oxygen, Helvetica, Arial, sans-serif",
            },
         }),
      [mode]
   );

   useEffect(() => {
      const { primary, secondary, background, text } = theme.palette;
      document.documentElement.style.setProperty(
         "--primary-color",
         primary.main
      );
      document.documentElement.style.setProperty(
         "--secondary-color",
         secondary.main
      );
      document.documentElement.style.setProperty(
         "--background-color",
         background.default
      );
      document.documentElement.style.setProperty(
         "--background-secondary-color",
         background.paper
      );
      document.documentElement.style.setProperty(
         "--text-primary-color",
         text.primary
      );
      document.documentElement.style.setProperty(
         "--text-secondary-color",
         text.secondary
      );
   }, [theme]);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const toggleModal = () => setIsModalOpen((prev) => !prev);
   const { loading } = useAuth();

   return (
      <ThemeProvider theme={theme}>
         <Analytics />
         <CssBaseline />
         <BrowserRouter>
            <ScrollToTop />
            {loading && <Loading />}
            <AppRoutes
               theme={theme}
               handleToggleTheme={(newTheme: "light" | "dark") =>
                  setMode(newTheme)
               }
               toggleModal={toggleModal}
               isModalOpen={isModalOpen}
            />
         </BrowserRouter>
      </ThemeProvider>
   );
}

function App() {
   return (
      <AuthProvider>
         <AppContent />
      </AuthProvider>
   );
}

export default App;
