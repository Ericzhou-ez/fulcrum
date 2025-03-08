// src/routes/AppRoutes.tsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import SignInPage from "../pages/SignInPage";
import Dashboard from "../pages/dashboard/dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import Home from "../pages/marketing/home";
import Components from "../pages/components";
import RecentProductsPage from "../pages/dashboard/recentPage";
import PrivateRoute from "./privateRoute";
import SavedPage from "../pages/dashboard/savedPage";
import TermsOfServicePage from "../pages/marketing/termsOfServicePage";
import PrivacyPolicyPage from "../pages/marketing/privacyPage";
import InternalQuotationPage from "../pages/dashboard/internalQuotation";
import ExternalQuotationPage from "../pages/dashboard/externalQuotation";
import SearchPage from "../pages/dashboard/searchPage";
import SettingPage from "../pages/dashboard/settingsPage";
import ContactPage from "../pages/marketing/contactPage";
import { useAuth } from "../contexts/user-context";

export interface AppRoutesProps {
   theme: any;
   handleToggleTheme: any;
   toggleModal: () => void;
   isModalOpen: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
   theme,
   handleToggleTheme,
   toggleModal,
   isModalOpen,
}) => {
   const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
   const [navOpen, setNavOpen] = useState<boolean>(isMdUp);
   const [overlay, setOverlay] = useState<boolean>(!isMdUp);
   const closeOverlay = () => {
      setOverlay(false);
      setNavOpen(false);
   };
   const { signedIn, loading } = useAuth();

   return (
      <Routes>
         {/* Sign-in route */}

         <Route
            path="/signin"
            element={
               signedIn ? (
                  <Navigate to="/dashboard" />
               ) : (
                  <SignInPage
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                  />
               )
            }
         />

         {/* Dashboard route */}
         <Route
            path="/dashboard"
            element={
               <PrivateRoute>
                  <Dashboard
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         <Route
            path="/dashboard/settings"
            element={
               <PrivateRoute>
                  <SettingPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         <Route
            path="/quotation/internal"
            element={
               <PrivateRoute>
                  <InternalQuotationPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         <Route
            path="/quotation/external"
            element={
               <PrivateRoute>
                  <ExternalQuotationPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         <Route
            path="/search"
            element={
               <PrivateRoute>
                  <SearchPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         {/* Developer components */}
         <Route path="/components" element={<Components />} />

         {/* Marketing / Public routes */}
         <Route
            path="/"
            element={
               <Home theme={theme} handleToggleTheme={handleToggleTheme} />
            }
         />
         <Route
            path="/terms"
            element={
               <TermsOfServicePage
                  toggleModal={toggleModal}
                  theme={theme}
                  handleToggleTheme={handleToggleTheme}
                  isModalOpen={false}
               />
            }
         />
         <Route
            path="/contact"
            element={
               <ContactPage
                  toggleModal={toggleModal}
                  theme={theme}
                  handleToggleTheme={handleToggleTheme}
                  isModalOpen={false}
               />
            }
         />
         <Route
            path="/privacy"
            element={
               <PrivacyPolicyPage
                  toggleModal={toggleModal}
                  theme={theme}
                  handleToggleTheme={handleToggleTheme}
                  isModalOpen={false}
               />
            }
         />

         <Route
            path="/recent"
            element={
               <PrivateRoute>
                  <RecentProductsPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         <Route
            path="/saved"
            element={
               <PrivateRoute>
                  <SavedPage
                     toggleModal={toggleModal}
                     isModalOpen={isModalOpen}
                     theme={theme}
                     handleToggleTheme={handleToggleTheme}
                     navOpen={navOpen}
                     setNavOpen={setNavOpen}
                     overlay={overlay}
                     setOverlay={setOverlay}
                     closeOverlay={closeOverlay}
                  />
               </PrivateRoute>
            }
         />

         {/* Fallback */}
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
};

export default AppRoutes;
