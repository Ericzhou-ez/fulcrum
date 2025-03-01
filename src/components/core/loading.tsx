import React from "react";

const Loading = () => {
   return (
      <div
         style={{
            backgroundColor: "var(--primary-background-color)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <svg
            viewBox="0 0 100 100"
            style={{
               height: "150px",
               width: "150px",
            }}
         >
            <g
               fill="none"
               stroke="var(--primary-text-color)"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="6"
            >
               {/* Left line */}
               <path d="M 21 40 V 59">
                  <animateTransform
                     attributeName="transform"
                     attributeType="XML"
                     type="rotate"
                     values="0 21 59; 180 21 59"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Right line */}
               <path d="M 79 40 V 59">
                  <animateTransform
                     attributeName="transform"
                     attributeType="XML"
                     type="rotate"
                     values="0 79 59; -180 79 59"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Top line */}
               <path d="M 50 21 V 40">
                  <animate
                     attributeName="d"
                     values="M 50 21 V 40; M 50 59 V 40"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Bottom line */}
               <path d="M 50 60 V 79">
                  <animate
                     attributeName="d"
                     values="M 50 60 V 79; M 50 98 V 79"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Top box */}
               <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
                  <animate
                     attributeName="stroke"
                     values="rgba(255,255,255,1); rgba(100,100,100,0)"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Middle box */}
               <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />

               {/* Bottom box */}
               <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
                  <animate
                     attributeName="stroke"
                     values="rgba(100,100,100,0); rgba(255,255,255,1)"
                     dur="1s"
                     repeatCount="indefinite"
                  />
               </path>

               {/* Translation animation on the group */}
               <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  values="0 0; 0 -19"
                  dur="1s"
                  repeatCount="indefinite"
               />
            </g>
         </svg>
      </div>
   );
};

export default Loading;
