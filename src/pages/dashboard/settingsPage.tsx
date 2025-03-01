import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import Nav from "../../components/core/nav";
import Footer from "../../components/core/footer";
import SideNav from "../../components/dashboard/dashboardNav";
import { PasswordForm } from "../../components/dashboard/settings/PasswordForms";
import { ThemeSwitch } from "../../components/dashboard/settings/Appearance";
import { DeleteAccount } from "../../components/dashboard/settings/DeleteAccount";

export interface SettingPageProps {
   signedIn: boolean;
   user: any;
   handleSignOut: () => Promise<void>;
   isModalOpen: boolean;
   theme: any;
   handleToggleTheme: () => void;
   toggleModal: () => void;
   navOpen: boolean;
   setNavOpen: any;
   overlay: boolean;
   setOverlay: any;
   closeOverlay: () => void;
}

const mainContentStyles = (navOpen: boolean) => ({
   marginLeft: {
      xs: 0,
      md: navOpen ? "240px" : "0px",
   },
   transition: "margin-left 0.3s ease",
   padding: 2,
});

const SettingPage: React.FC<SettingPageProps> = ({
   signedIn,
   user,
   handleSignOut,
   isModalOpen,
   theme,
   handleToggleTheme,
   toggleModal,
   navOpen,
   setNavOpen,
   overlay,
   setOverlay,
   closeOverlay,
}) => {
   const isDarkMode = theme === "dark";
   return (
      <Box className="recent-products-page" sx={mainContentStyles(navOpen)}>
         <SideNav navOpen={navOpen} setNavOpen={setNavOpen} />

         <Nav
            home={false}
            navOpen={navOpen}
            setNavOpen={setNavOpen}
            signedIn={signedIn}
            user={user}
            handleSignOut={handleSignOut}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            overlay={overlay}
            setOverlay={setOverlay}
            searchBar={false}
         />

         <div className="title-recent">
            <Typography
               variant="h6"
               component="h1"
               className="title-text-recent"
               sx={{
                  fontSize: {
                     xs: "2rem",
                     sm: "2.2rem",
                     md: "2.4rem",
                     lg: "2.8rem",
                  },
               }}
            >
               设置
            </Typography>
         </div>

         <div className="gradient-divider"></div>

         <Stack spacing={3}>
            <PasswordForm />
            <ThemeSwitch />
            <DeleteAccount />
         </Stack>

         {overlay && (
            <div
               style={{
                  position: "fixed",
                  width: "100vw",
                  height: "100vh",
                  zIndex: 500,
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                  backdropFilter: "blur(2px)",
               }}
               onClick={closeOverlay}
            ></div>
         )}

         <Footer theme={theme} handleToggleTheme={handleToggleTheme} />
      </Box>
   );
};

export default SettingPage;
