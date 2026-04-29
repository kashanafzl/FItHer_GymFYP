import img1 from "../../../Assets/1.jpg";
import img2 from "../../../Assets/2.jpg";
import img11 from "../../../Assets/11.jpg";
import img4 from "../../../Assets/4.jpg";
import img5 from "../../../Assets/5.jpg";
import img6 from "../../../Assets/6.jpg";
import img7 from "../../../Assets/g1.jfif";
import img8 from "../../../Assets/g2.jfif";
import img9 from "../../../Assets/g3.jfif";

export default function Transformations() {
  const stories = [
    {
      name: "Ahmed Khan",
      before: "95 kg",
      after: "75 kg",
      duration: "6 Months",
      beforeImg: img7,
      afterImg: img5,
      quote: "FitX changed my life completely! Lost 20kg in 6 months with their amazing trainers.",
      goal: "Fat Loss",
      program: "Cardio + Strength",
    },
    {
      name: "Sara Ali",
      before: "80 kg",
      after: "62 kg",
      duration: "4 Months",
      beforeImg: img8,
      afterImg: img4,
      quote: "Best decision of my life! The diet plan and workouts were perfectly customized.",
      goal: "Weight Loss",
      program: "HIIT + Diet Plan",
    },
    {
      name: "Bilal Hassan",
      before: "65 kg",
      after: "78 kg",
      duration: "8 Months",
      beforeImg: img9,
      afterImg: img11,
      quote: "Gained pure muscle mass! Never thought I could transform like this.",
      goal: "Muscle Gain",
      program: "Strength Training",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transformation <span className="text-orange-500">Stories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real results from real people who committed to change their lives with FitX
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden group hover:border-orange-500 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              {/* Before/After Images */}
              <div className="relative h-72 overflow-hidden">
                <div className="flex h-full">
                  {/* Before Image */}
                  <div className="w-1/2 relative overflow-hidden group-hover:w-1/2 transition-all duration-700">
                    <img
                      src={story.beforeImg}
                      alt={`${story.name} Before`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-end justify-center pb-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        BEFORE
                      </span>
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="w-1/2 relative overflow-hidden">
                    <img
                      src={story.afterImg}
                      alt={`${story.name} After`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-2">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        AFTER
                      </span>
                    </div>
                  </div>

                  {/* VS Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-lg z-10">
                    VS
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-orange-500 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/30">
                  ⏱ {story.duration}
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                {/* Stats */}
                <div className="flex justify-between mb-6 bg-black/50 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Before</p>
                    <p className="text-white font-bold text-lg">{story.before}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">After</p>
                    <p className="text-orange-500 font-bold text-lg">
                      {story.after}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-500 text-xs mb-1">Lost</p>
                    <p className="text-green-500 font-bold text-lg">
                      {parseInt(story.before) - parseInt(story.after) > 0
                        ? `-${parseInt(story.before) - parseInt(story.after)}kg`
                        : `+${parseInt(story.after) - parseInt(story.before)}kg`}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <span className="bg-orange-500/10 text-orange-500 text-xs px-3 py-1 rounded-full border border-orange-500/20">
                    {story.goal}
                  </span>
                  <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">
                    {story.program}
                  </span>
                </div>

                {/* Name & Quote */}
                <h3 className="text-white font-bold text-lg mb-2">
                  {story.name}
                </h3>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "{story.quote}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Ready to start your own transformation?</p>
          <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40">
            Start Your Journey Today 🚀
          </button>
        </div>
      </div>
    </section>
  );
}