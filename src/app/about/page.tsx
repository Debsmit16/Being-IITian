import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-500 to-gray-600 dark:from-yellow-400 dark:to-gray-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Being IITian
          </h1>
          <p className="text-xl opacity-90">
            More than preparation — a transformative journey
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            At Being IITian, we believe that JEE preparation is more than just mastering Science and Math — it's a transformative journey that shapes mindset, builds resilience, and changes how students approach both learning and life.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            With the right mentorship, this experience goes beyond exams. Led by individuals with the strongest mindsets, we are committed to guiding aspirants with experience-driven insights and strategic preparation.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our approach isn't just about cracking JEE; it's about developing a mindset that empowers success in life itself by preparing for challenges beyond the exam.
          </p>
        </div>
      </section>

      {/* Mentorship Model */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Mentorship Model</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Our mentorship model is built on a continuous chain of guidance — where seniors who have successfully navigated the path into prestigious institutions of the country like <strong className="text-yellow-600 dark:text-yellow-400">IITs, NITs, IISERs, and NISERs</strong>, having walked the same path, mentor juniors.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This ensures that every student's preparation is deeply rooted in real-world experience and practical insights that can only come from those who have been through the journey themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-400/10 rounded-xl border border-yellow-200 dark:border-yellow-400/20">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Mindset First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Building resilient thinkers who can tackle any challenge, in exams and in life.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Experience-Driven</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Guidance from those who've been there, done that, and succeeded.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700/30">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Nation Building</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Empowering a generation of leaders equipped for tomorrow's challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-gradient-to-br from-yellow-500 to-gray-600 dark:from-yellow-400 dark:to-gray-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
          <p className="text-lg opacity-90 mb-8">
            This initiative is more than just educational support — it is an investment in the future of our nation. By empowering a resilient, capable generation of thinkers and action-takers, we are helping shape leaders who are equipped to tackle the challenges of tomorrow.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="opacity-90">Students Mentored</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="opacity-90">Expert Mentors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="opacity-90">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="opacity-90">IITs Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Journey?
          </h2>
          <Link 
            href="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
