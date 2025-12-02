import HeadingText from "@/Featured/Common/HeadingText";
import MeetCard from "@/Featured/Common/MeetCard";

const MeetSection = () => {
  const team = [
    {
      img: "./Responsive.png",
      name: "Alamdar Manafov",
      title: "CEO / Founder",
    },
    {
      img: "./Responsive.png",
      name: "Aynur Abdullayeva",
      title: "UI/UX Designer",
    },
    {
      img: "./Responsive.png",
      name: "Darishova Shabnam",
      title: "UI/UX Designer",
    },
    {
      img: "./Responsive.png",
      name: "Camil Karimli",
      title: "Marketing Lead",
    },
  ];

  return (
    <section className="container mx-auto py-10">
      <HeadingText title="Meet Our Team" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {team.map((member, i) => (
          <MeetCard
            key={i}
            img={member.img}
            name={member.name}
            title={member.title}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetSection;
