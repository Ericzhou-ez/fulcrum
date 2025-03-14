import React, { useEffect, useRef, useState } from "react";
import "../../styles/floatingToc.css";

interface TocItem {
   id: string;
   label: string;
}

interface FloatingTocNavProps {
   sections: TocItem[];
   hoveredWidth: string; 
   defaultWidth?: string;
}

const FloatingTocNav: React.FC<FloatingTocNavProps> = ({
   sections,
   hoveredWidth = 250,
   defaultWidth = 50,
}) => {
   const [activeId, setActiveId] = useState("");
   const [isHovered, setIsHovered] = useState(false);
   const sectionsRef = useRef<(HTMLElement | null)[]>([]);

   useEffect(() => {
      sectionsRef.current = sections.map(({ id }) =>
         document.getElementById(id)
      );

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setActiveId(entry.target.id);
               }
            });
         },
         { threshold: 0.3 }
      );

      sectionsRef.current.forEach((el) => {
         if (el) observer.observe(el);
      });

      return () => {
         sectionsRef.current.forEach((el) => {
            if (el) observer.unobserve(el);
         });
      };
   }, [sections]);

   const handleClick = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "end" });
   };

   const navStyle = {
      width: isHovered ? hoveredWidth : defaultWidth,
   };

   const tocListStyle = isHovered
      ? {
           display: "grid",
           gap: "8px",
           padding: "0 10px",
        }
      : { padding: "0 10px" };

   return (
      <nav
         className="floating-toc-nav"
         style={navStyle}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <ul className="toc-list" style={tocListStyle}>
            {sections.map(({ id, label }) => (
               <li
                  key={id}
                  className={`toc-item ${activeId === id ? "active" : ""}`}
                  onClick={() => handleClick(id)}
               >
                  <div className="toc-bar" />
                  <div
                     className="toc-label"
                     style={{
                        padding: "0 10px",
                        width: parseInt(hoveredWidth as string, 10) - 50,
                     }}
                  >
                     {label}
                  </div>
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default FloatingTocNav;
