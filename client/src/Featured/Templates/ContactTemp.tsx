import ContactHero from "../Sections/Contact/ContactHero";
import ContactSection from "../Sections/Contact/ContactSection";

const ContactTemp = () => {
  return (
    <div className="bg-[#f8f9ff] min-h-screen pb-20">
      <ContactHero />
      <div className="-mt-10 relative z-20">
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactTemp;
