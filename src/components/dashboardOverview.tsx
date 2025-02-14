import React from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import DescriptionLight from "../assets/icons/description-light.svg";
import DescriptionDark from "../assets/icons/description-dark.svg";
import RecentLight from "../assets/icons/recent-light.svg";
import RecentDark from "../assets/icons/recent-dark.svg";
import CardSlider from "./cardSlider";

interface DashboardOverviewProps {
   theme: Theme;
}

export default function DashboardOverview({ theme }: DashboardOverviewProps) {
   const isDarkMode = theme.palette.mode === "dark";

   return (
      <Box
         sx={{
            margin: "0 auto",
            px: 3,
            maxWidth: "100vw",
         }}
         className="dashboard-overview"
      >
         <Stack spacing={4}>
            {/* Header section */}
            <Stack
               direction="row"
               spacing={3}
               sx={{ alignItems: "flex-start" }}
            >
               <Box sx={{ flex: "1 1 auto" }}>
                  <Typography variant="h1" fontSize="4rem">
                     概括
                  </Typography>
               </Box>
               <Stack spacing={2} direction="column">
                  <Button variant="contained" className="excel-button">
                     导出为Excel
                  </Button>
                  <Button variant="contained" className="pdf-button">
                     导出为PDF
                  </Button>
               </Stack>
            </Stack>

            <Box sx={{ my: 2 }}>
               <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
               >
                  {isDarkMode ? (
                     <img
                        src={DescriptionDark}
                        alt="Description Icon"
                        width={25}
                        height={25}
                     />
                  ) : (
                     <img
                        src={DescriptionLight}
                        alt="Description Icon"
                        width={25}
                        height={25}
                     />
                  )}
                  <Typography variant="h5" fontSize="1.3rem">
                     最近 &gt;
                  </Typography>
               </Stack>
               {/* <SimpleSlider /> */}

               <CardSlider />
            </Box>

            {/* “保存” section */}
            <Box sx={{ my: 2 }}>
               <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
               >
                  {isDarkMode ? (
                     <img
                        src={RecentDark}
                        alt="Recent Icon"
                        width={25}
                        height={25}
                     />
                  ) : (
                     <img
                        src={RecentLight}
                        alt="Recent Icon"
                        width={25}
                        height={25}
                     />
                  )}
                  <Typography variant="h5" fontSize="1.3rem">
                     保存 &gt;
                  </Typography>
               </Stack>

               <CardSlider />
            </Box>
         </Stack>
      </Box>
   );
}

function SimpleSlider() {
   return (
      <Box
         sx={{
            width: "100%",
            overflowX: "auto",
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            border: "1px solid red",
            p: 2,
            // Hide scrollbar in Chrome/Firefox (optional):
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
               display: "none", // Chrome, Safari
            },
         }}
      >
         <Box
            sx={{
               flex: "0 0 auto",
               minWidth: "400px",
               height: "150px",
               backgroundColor: "lightblue",
            }}
         />
         <Box
            sx={{
               flex: "0 0 auto",
               minWidth: "400px",
               height: "150px",
               backgroundColor: "lightgreen",
            }}
         />
         <Box
            sx={{
               flex: "0 0 auto",
               minWidth: "400px",
               height: "150px",
               backgroundColor: "lightcoral",
            }}
         />
         <Box
            sx={{
               flex: "0 0 auto",
               minWidth: "400px",
               height: "150px",
               backgroundColor: "lightgoldenrodyellow",
            }}
         />
      </Box>
   );
}
