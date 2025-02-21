import React from "react";
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";

// Light/Dark icons
import EditLight from "../../assets/icons/edit-light.svg";
import EditDark from "../../assets/icons/edit-dark.svg";
import HeartLight from "../../assets/icons/heart-light.svg";
import HeartDark from "../../assets/icons/heart-dark.svg";
import CancelLight from "../../assets/icons/x-light.svg";
import CancelDark from "../../assets/icons/x-dark.svg";

interface CardItem {
   id: number;
   title: string;
   productId: string;
   postedTime: string;
}

interface CardProps {
   item: CardItem;
   isDarkMode: boolean;
}

export default function ProductCard({ item, isDarkMode }: CardProps) {
   // Pick icons based on dark/light mode
   const editIcon = isDarkMode ? EditDark : EditLight;
   const heartIcon = isDarkMode ? HeartDark : HeartLight;
   const deleteIcon = isDarkMode ? CancelDark : CancelLight;

   return (
      <Card
         sx={{
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
         }}
      >
         <CardContent
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "flex-start",
            }}
            className="card-flex"
         >
            <div style={{ display: "flex", flexDirection: "column" }}>
               <Typography variant="subtitle1" gutterBottom>
                  {item.title}
               </Typography>
               <Typography variant="caption" color="textSecondary">
                  {item.productId}
               </Typography>
            </div>

            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
               }}
            >
               <div style={{ display: "flex", marginBottom: "4px" }}>
                  <Tooltip title="收藏">
                     <IconButton size="small">
                        <img src={heartIcon} alt="o" width="18" height="18" />
                     </IconButton>
                  </Tooltip>

                  <Tooltip title="删除">
                     <IconButton size="small">
                        <img src={deleteIcon} alt="x" width="18" height="18" />
                     </IconButton>
                  </Tooltip>
               </div>
               <Typography variant="caption" color="textSecondary">
                  {item.postedTime}
               </Typography>
            </div>
         </CardContent>
      </Card>
   );
}
