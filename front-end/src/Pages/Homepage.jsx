import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Pricing from "../Components/Pricing";
import PrimarySection from "../Components/PrimarySection";

export default function Homepage() {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <PrimarySection />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}
