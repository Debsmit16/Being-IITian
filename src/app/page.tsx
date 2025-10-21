import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-black text-gray-900 dark:text-white py-20 md:py-32 overflow-hidden transition-colors duration-300">
        {/* Animated background - Dark theme */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black opacity-50"></div>
        <div className="absolute inset-0 hidden dark:block" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(192, 192, 192, 0.05) 0%, transparent 50%)'
        }}></div>
        
        {/* Light theme gradient */}
        <div className="absolute inset-0 dark:hidden bg-gradient-to-br from-yellow-50 via-white to-gray-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-float">
              <div className="relative">
                <span className="text-9xl">∞</span>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-yellow-400/30 to-gray-400/30"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-gray-400 bg-clip-text text-transparent">
              Being IITian
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              More than just mastering Science and Math — a transformative journey that shapes mindset, builds resilience, and changes how you approach learning and life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
              >
                Explore Courses
              </Link>
              <Link 
                href="/outliers"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-yellow-400/50 rounded-lg font-bold text-lg hover:bg-white/20 hover:border-yellow-400 transform hover:scale-105 transition-all duration-300"
              >
                Join Outliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-white">Mindset First</h3>
              <p className="text-gray-300 leading-relaxed">
                JEE preparation isn't just about exams — it's about developing a resilient mindset that empowers success in life itself.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-400/10 to-transparent border border-gray-400/30 hover:border-gray-400/60 hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-xl font-bold mb-3 text-white">Peer Mentorship</h3>
              <p className="text-gray-300 leading-relaxed">
                Seniors from IITs, NITs, IISERs who've walked the path guide juniors with real-world experience and practical insights.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 group backdrop-blur-sm">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-white">Beyond Preparation</h3>
              <p className="text-gray-300 leading-relaxed">
                We're empowering a resilient generation of thinkers and action-takers, shaping leaders for tomorrow's challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Comprehensive Courses</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                High-quality video lectures covering Physics, Chemistry, and Mathematics for JEE Main and Advanced.
              </p>
              <Link href="/courses" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Browse Courses 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Personal Mentorship</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                One-on-one guidance from mentors who've cracked JEE and studied at top institutions across India.
              </p>
              <Link href="/outliers" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Learn More 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎥</div>
              <h3 className="text-2xl font-bold mb-3 text-white">YouTube Content</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Free educational content and strategic advice to help you perform at your best.
              </p>
              <a href="#" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Visit Channel 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Outliers Community</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Join our exclusive community where mentorship knows no limits and success breeds more success.
              </p>
              <Link href="/outliers" className="text-yellow-400 font-semibold hover:text-yellow-300 transition inline-flex items-center gap-2 group">
                Apply Now 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black border-y border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">5000+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Students</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-400/20 hover:border-gray-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">50+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Expert Mentors</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">100+</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Courses</div>
            </div>
            <div className="group text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-400/20 hover:border-gray-400 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-400">98%</div>
              <div className="text-base md:text-lg font-medium text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Join thousands of students who are transforming their JEE preparation with Being IITian.
          </p>
          <Link 
            href="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
