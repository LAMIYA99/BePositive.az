import HeadingText from "../../Common/HeadingText";

const ServiceSection = () => {
  return (
    <section className="container mx-auto py-10">
      <HeadingText title="Services" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 px-4">
        <div></div>
      </div>
    </section>
  );
};

export default ServiceSection;
