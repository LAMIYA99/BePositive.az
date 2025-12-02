import HeadingText from "@/Featured/Common/HeadingText";
import { ServicesCard } from "@/Featured/Common/ServicesCard";

const ServiceSection = () => {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <section  className="container mx-auto py-10">
      <HeadingText title="Services" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 px-4">
        {cards.map((item) => (
          <ServicesCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
