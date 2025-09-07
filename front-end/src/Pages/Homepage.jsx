import Features from "../Components/Features";
import Header from "../Components/Header";
import PrimarySection from "../Components/PrimarySection";

export default function Homepage() {
  return (
    <>
      <div className="flex flex-col ">
        <Header />
        <PrimarySection />
        <Features />
      </div>
    </>
  );
}
