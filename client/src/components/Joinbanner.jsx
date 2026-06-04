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
      <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white/95 text-center px-4">
        {joinBanner.title}
      </p>
      <p className="w-[90%] max-w-2xl text-sm sm:text-base text-center text-white/85 leading-relaxed">
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
