import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import contactData from "../data/contact.json";

function Joinbanner() {
  const navigate = useNavigate();
  const { joinBanner } = contactData;

  const handleClick = () => {
    const link = joinBanner.buttonLink || "/About#Membership";
    if (link.startsWith("http")) {
      window.open(link, "_blank");
      return;
    }
    navigate(link);
  };

  return (
    <div className="relative z-[2] bg-black/20 h-[400px] flex flex-col items-center justify-evenly w-full sm:w-[80%] lg:w-[50%]">
      <p className="font-[500] text-[1.7rem] sm:text-[2rem] text-white/90 text-center px-4">
        {joinBanner.title}
      </p>
      <p className="w-[90%] text-[1rem] md:text-[0.8rem] text-center text-white/80">
        {joinBanner.description}
      </p>
      <Button
        Content={joinBanner.buttonText}
        themecss="btn2 py-3"
        click={handleClick}
      />
    </div>
  );
}

export default Joinbanner;
