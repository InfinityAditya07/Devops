import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          {/* Left: Text Content (Span 5) */}
          <div className="lg:col-span-5 space-y-12 pr-4">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-[3.5rem] leading-[1.1] font-medium tracking-tight text-black">
                Unleash Your Style <br />
                Shop the Latest <br />
                Trends
              </h1>

              <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                Discover the latest trends & express your style effortlessly.
                Shop exclusive collections with premium designs, just for you!
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
              <button className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Reviews Section */}
            <div className="pt-8">
              <p className="text-2xl font-bold text-black mb-2">15 Million+</p>
              <div className="flex items-center justify-between max-w-sm">
                <p className="text-[11px] text-gray-500 leading-snug max-w-[150px]">
                  Real reviews from our happy customers! See what fashion lovers
                  are saying about our quality, style, and service.
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 25}`}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image (Span 7) */}
          <div className="lg:col-span-7 h-[600px] relative">
            <div className="w-full h-full bg-[#E5E5E5] rounded-[50px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                alt="Man in sweater"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Bottom Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Card 1: Cream Jacket (Span 4) */}
          <div className="md:col-span-4 h-[340px] rounded-[40px] overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Cream Jacket"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card 2: Clothes Rack (Span 4) */}
          <div className="md:col-span-4 h-[340px] rounded-[40px] overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Clothes Rack"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card 3: Models wearing full outfits (Span 4) */}
          <div className="md:col-span-4 h-[340px] bg-white border border-gray-100 rounded-[40px] flex flex-col justify-center items-center text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-6">
              <h3 className="text-[1.75rem] font-medium text-black leading-tight">
                Models wearing <br /> full outfits
              </h3>
              <button className="bg-black text-white px-8 py-3 rounded-full text-xs font-semibold tracking-wide hover:bg-gray-800 transition-colors">
                Explore now
              </button>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        {/* <div className="mt-24 mb-12 flex justify-between items-center opacity-40 grayscale px-8">
          {[
            "GRAPHIC STUDIO",
            "S. SALVA",
            "GOLDEN STUDIO",
            "FURNITURE DESIGN",
            "TRAVEL LOOKBOOK",
          ].map((brand, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="w-6 h-6 border border-black rotate-45 transform origin-center flex-shrink-0"></div>
              <span className="font-serif font-bold text-[11px] tracking-[0.2em]">
                {brand}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
