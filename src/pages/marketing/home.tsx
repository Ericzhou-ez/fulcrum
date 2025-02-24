import React from "react";
import Footer from "../../components/core/footer";
import Hero from "../../components/marketing/hero";
import Nav from "../../components/core/nav";
import "../../styles/home.css";
import BottomCTA from "../../components/marketing/bottomCta";
import { Faqs } from "../../components/marketing/faqs";
import { useEffect, useState } from "react";
import FeatureSelector from "../../components/marketing/featureSelector";

interface HomeProps {
   theme: string;
   handleToggleTheme: () => void;
   signedIn: boolean;
   user: any;
}

const Home: React.FC<HomeProps> = ({
   theme,
   handleToggleTheme,
   signedIn,
   user,
}) => {
   useEffect(() => {
      const starContainer = document.querySelector(".star-container");
      if (!starContainer) return;

      const numStars = 100;
      const stars: HTMLDivElement[] = [];

      for (let i = 0; i < numStars; i++) {
         const star = document.createElement("div");
         star.className = "star";

         star.style.top = `${Math.random() * 100}%`;
         star.style.left = `${Math.random() * 100}%`;

         const size = Math.random() * 3 + 1;
         star.style.width = `${size}px`;
         star.style.height = `${size}px`;
         const duration = Math.random() * 5 + 3;
         star.style.animationDuration = `${duration}s`;

         starContainer.appendChild(star);
         stars.push(star);
      }

      return () => {
         stars.forEach((star) => star.remove());
      };
   }, []);

   const [activeIndex, setActiveIndex] = useState(1);

   return (
      <React.Fragment>
         <div className="home">
            <div className="star-container"></div>

            <Nav
               signedIn={signedIn}
               user={user}
               home={true}
               handleSignOut={() => {}}
               isModalOpen={false}
               toggleModal={() => {}}
               navOpen={false}
               setNavOpen={null}
               overlay={false}
               setOverlay={() => {}}
            />

            <Hero activeIndex={activeIndex} />
         </div>

         <FeatureSelector
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
         />

         <Faqs />

         <BottomCTA theme={theme} />
         <div style={{ padding: "0 16px"}}>
            <Footer theme={theme} handleToggleTheme={handleToggleTheme} />
         </div>
      </React.Fragment>
   );
};

export default Home;
