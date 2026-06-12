import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "@alex",
    image: "https://i.pravatar.cc/150?img=1",
    review:
      "Amazing gaming experience. Super smooth gameplay and beautiful UI.",
  },
  {
    id: 2,
    name: "Sophia Williams",
    username: "@sophia",
    image: "https://i.pravatar.cc/150?img=2",
    review:
      "Best gaming platform I've used. The racing games are incredible.",
  },
  {
    id: 3,
    name: "Michael Brown",
    username: "@mike",
    image: "https://i.pravatar.cc/150?img=3",
    review:
      "Premium design and fast loading. Love this website.",
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "@emma",
    image: "https://i.pravatar.cc/150?img=4",
    review:
      "The collection of games is huge. I play here every day.",
  },
  {
    id: 5,
    name: "James Smith",
    username: "@james",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "The interface feels modern and very professional.",
  },
  {
    id: 6,
    name: "Olivia Davis",
    username: "@olivia",
    image: "https://i.pravatar.cc/150?img=6",
    review:
      "I love the puzzle and adventure games available here.",
  },
  {
    id: 7,
    name: "Daniel Lee",
    username: "@daniel",
    image: "https://i.pravatar.cc/150?img=7",
    review:
      "Smooth animations and excellent gaming experience.",
  },
  {
    id: 8,
    name: "Charlotte",
    username: "@charlotte",
    image: "https://i.pravatar.cc/150?img=8",
    review:
      "One of the best gaming websites on the internet.",
  },
  {
    id: 9,
    name: "Ethan",
    username: "@ethan",
    image: "https://i.pravatar.cc/150?img=9",
    review:
      "Fantastic platform with lots of fun multiplayer games.",
  },
  {
    id: 10,
    name: "Mia",
    username: "@mia",
    image: "https://i.pravatar.cc/150?img=10",
    review:
      "Absolutely love the gaming community and leaderboard.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">
            Player Reviews
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white">
            What Gamers
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Say About Us
            </span>
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Thousands of players enjoy our platform every day.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050816] to-transparent" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050816] to-transparent" />

          <div className="flex gap-6 w-max animate-testimonial-slider">
            {[...testimonials, ...testimonials].map(
              (user, index) => (
                <div
                  key={index}
                  className="group w-[350px] shrink-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
                >
                  {/* Quote */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                      />

                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {user.name}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          {user.username}
                        </p>
                      </div>
                    </div>

                    <Quote
                      size={34}
                      className="text-cyan-500/30"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mt-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="mt-5 text-gray-300 leading-relaxed">
                    {user.review}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Testimonials;