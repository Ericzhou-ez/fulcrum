import React, { useState, useEffect } from "react";
import "../../styles/nav.css";
import Logo from "../../assets/images/logo.svg";
import DefaultProfile from "/src/assets/icons/profile.svg";
import {
   Button,
   IconButton,
   useTheme,
   Box,
   useMediaQuery,
   Tooltip,
} from "@mui/material";
import { MagnifyingGlass, List } from "phosphor-react";
import { ProfileModal } from "./floatingSettings";

interface NavProps {
   signedIn: boolean;
   user: {
      name?: string;
      photo?: string;
   };
   handleSignOut: () => void;
   isModalOpen: boolean;
   toggleModal: () => void;
   home: boolean;
   navOpen: boolean;
   setNavOpen: (value: boolean) => void;
   overlay: boolean;
   setOverlay: (value: boolean) => void;
   searchBar: boolean;
}

const Nav: React.FC<NavProps> = ({
   signedIn,
   user,
   handleSignOut,
   isModalOpen,
   toggleModal,
   home,
   navOpen,
   setNavOpen,
   overlay,
   setOverlay,
   searchBar,
}) => {
   const theme = useTheme();
   const isDark = theme.palette.mode === "dark";
   const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

   useEffect(() => {
      if (!isMdUp) {
         setOverlay(navOpen);
      }
   }, [navOpen, isMdUp, setOverlay]);

   const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <Box
         className={
            isMdUp
               ? `${home ? "nav" : "nav-dash"} ${navOpen ? "nav-open" : ""}`
               : `${home ? "nav" : "nav-dash"}`
         }
      >
         {/* Menu Icon */}
         <div
            className="menu"
            style={{ display: home ? "none" : "flex", placeContent: "center" }}
         >
            <IconButton
               onClick={(e) => setNavOpen(!navOpen)}
               style={
                  navOpen
                     ? { display: "none", padding: "2px" }
                     : { padding: "2px" }
               }
            >
               <List size={25} color={isDark ? "#fff" : "#000"} />
            </IconButton>
         </div>

         {/* Logo */}
         <a
            href={signedIn ? "/dashboard" : "/"}
            className={
               home ? "nav-logo-container" : "nav-logo-container-hidden"
            }
            style={{
               all: "unset",
               cursor: "pointer",
               display: "flex",
               placeContent: "center",
            }}
         >
            <div className="nav-logo" style={home ? {} : { display: "none" }}>
               <img src={Logo} alt="Logo" />
               <p>Fulcrums</p>
            </div>
         </a>

         {!home && <SearchBar isDark={isDark} searchBar={searchBar} />}

         {signedIn ? (
            <div className="profile-container" style={{ position: "relative" }}>
               <Tooltip title="账号">
                  <img
                     src={user.photo || DefaultProfile}
                     alt={user.name || "p"}
                     className="user-photo"
                     style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                     }}
                     onClick={handleProfileClick}
                  />
               </Tooltip>

               <ProfileModal
                  isOpen={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
               />
            </div>
         ) : (
            <div className="nav-links">
               <a href="/dashboard">
                  <button className="cta-btn-join">登录</button>
               </a>
            </div>
         )}
      </Box>
   );
};

export default Nav;

interface SearchBarProps {
   isDark: boolean;
   searchBar: boolean;
}

function SearchBar({ isDark, searchBar }: SearchBarProps) {
   return (
      <div
         className="search-bar-container"
         style={searchBar ? {} : { display: "none" }}
      >
         <input
            type="text"
            placeholder="筛选产品名称或ID"
            className="search-input"
         />
         <Tooltip title="搜索">
            <button className="search-btn">
               <MagnifyingGlass size={18} color={isDark ? "#fff" : "#000"} />
            </button>
         </Tooltip>
      </div>
   );
}
