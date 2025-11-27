import HeadingText from "@/Featured/Common/HeadingText"
import TrainingCard from "@/Featured/Common/TrainingCard"

const TrainingSection = () => {
  const cards = [1, 2, 3,];
  return (
    <section  className="container mx-auto py-10">
      <HeadingText title="Trainings & Seminars" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 px-4">
        {cards.map((item) => (
          <TrainingCard key={item} />
        ))}
      </div>
    </section>
  )
}

export default TrainingSection