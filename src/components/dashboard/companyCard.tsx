import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { X as XIcon, ArrowUpRight as ArrowUpRightIcon } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import data from "../../data/products_companies.json"

interface ProductData {
   [key: string]: {
      "Factory Name": string;
      "Owner Name": string;
      "Phone Number": number;
      Address: string;
      Category: string;
      Link: string;
   };
}

const productData: ProductData = data.search_by_product;

interface Company {
   id: string;
   name: string;
   ownerName: string;
   phoneNumber: number;
   address: string;
   category: string[];
   products: { name: string; link: string }[]; 
}

interface CompanyCardProps {
   company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
   const theme = useTheme();
   const isDark = theme.palette.mode === "dark";
   const [detailsOpen, setDetailsOpen] = useState(false);

   function toggleDetails() {
      setDetailsOpen((prev) => !prev);
      document.body.style.overflow = detailsOpen ? "auto" : "hidden";
   }

   const productsWithLinks = company.products.map((product) => ({
      name: product.name,
      link: productData[product.name]?.Link || "#",
   }));

   return (
      <div style={{ position: "relative" }}>
         <Card
            sx={{
               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
               pt: 1,
               mt: 2,
               borderRadius: 4,
               backgroundColor: isDark ? "#1e1d1b" : "#faf6f2",
            }}
         >
            <CardContent>
               <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                     <Stack spacing={1}>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                           }}
                        >
                           <Typography
                              variant="h3"
                              sx={{
                                 fontSize: { xs: "1.3rem", md: "1.6rem" },
                                 lineHeight: { xs: "1.9rem", md: "2.5rem" },
                                 whiteSpace: "nowrap",
                                 overflow: "hidden",
                                 maxWidth: {
                                    xs: "200px",
                                    sm: "400px",
                                    md: "600px",
                                    lg: "900px",
                                 },
                                 textOverflow: "ellipsis",
                              }}
                           >
                              {company.name}
                           </Typography>
                           <IconButton onClick={toggleDetails}>
                              <ArrowUpRightIcon size={20} />
                           </IconButton>
                        </div>

                        <Typography
                           variant="body2"
                           color="text.secondary"
                           sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}
                        >
                           {company.category.join(", ")}
                        </Typography>
                     </Stack>
                  </Stack>
               </Stack>
            </CardContent>
         </Card>

         {detailsOpen && (
            <>
               <div className="overlay" onClick={toggleDetails}></div>

               <div className="store-details">
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "10px",
                     }}
                  >
                     <Typography
                        variant="h5"
                        sx={{
                           color: isDark ? "#FFA500" : "#D35400",
                           fontSize: { xs: "1.8rem", md: "2rem" },
                           fontWeight: 600,
                           letterSpacing: "0.4px",
                           pb: 2,
                           pt: 3,
                        }}
                     >
                        {company.name}
                     </Typography>

                     <IconButton onClick={toggleDetails} className="x-icon">
                        <XIcon size={20} />
                     </IconButton>
                  </div>

                  <Typography sx={{ pb: 1 }}>
                     <strong>类别:</strong> {company.category.join(", ")}
                  </Typography>
                  <Typography sx={{ pb: 1 }}>
                     <strong>地址:</strong> {company.address}
                  </Typography>
                  <Typography sx={{ pb: 1 }}>
                     <strong>联系人:</strong> {company.ownerName}
                  </Typography>
                  <Typography sx={{ pb: 1 }}>
                     <strong>联系电话:</strong> {company.phoneNumber}
                  </Typography>

                  {productsWithLinks.length > 0 && (
                     <div className="more-products">
                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                           更多来自
                           <span
                              style={{ color: isDark ? "#FFA500" : "#D35400" }}
                           >
                              {company.name}
                           </span>
                           的产品
                        </Typography>
                        <ul>
                           {productsWithLinks.map((product) => (
                              <li key={product.name}>
                                 <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    <Typography
                                       sx={{
                                          textDecoration: "underline",
                                          cursor: "pointer",
                                          paddingBottom: "5px",
                                          "&:hover": {
                                             color: isDark
                                                ? "#FFA500"
                                                : "#D35400",
                                          },
                                       }}
                                    >
                                       {product.name}
                                    </Typography>
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            </>
         )}
      </div>
   );
}
