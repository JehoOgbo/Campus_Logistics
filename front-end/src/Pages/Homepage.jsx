import { useEffect, useState } from "react";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Pricing from "../Components/Pricing";
import PrimarySection from "../Components/PrimarySection";
import MobileHeader from "../Components/MobileHeader";

export default function Homepage() {
  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 900);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  }
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex flex-col ">
        {isMobile ? <MobileHeader /> : <Header />}

        <PrimarySection />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}
