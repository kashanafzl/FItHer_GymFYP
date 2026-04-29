export default function WhyChooseUs() {
  const features = [
    {
      icon: "🏆",
      title: "Expert Trainers",
      desc: "Certified professionals with 10+ years experience",
    },
    {
      icon: "⚡",
      title: "Modern Equipment",
      desc: "Latest Technogym and Life Fitness machines",
    },
    {
      icon: "🕐",
      title: "24/7 Access",
      desc: "Train anytime with our round-the-clock facility",
    },
    {
      icon: "🧬",
      title: "Personalized Plans",
      desc: "Custom diet & workout plans for your goals",
    },
    {
      icon: "🧘",
      title: "Recovery Zone",
      desc: "Sauna, steam room & massage therapy",
    },
    {
      icon: "📱",
      title: "Fitness App",
      desc: "Track progress with our mobile app",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Why <span className="text-orange-500">Choose Us</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          We provide everything you need to achieve your fitness goals
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all duration-300 group"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}