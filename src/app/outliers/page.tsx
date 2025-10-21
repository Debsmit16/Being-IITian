import Link from 'next/link';

export default function OutliersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-500 via-gray-600 to-gray-800 dark:from-yellow-400 dark:via-gray-500 dark:to-gray-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ⭐ The Outliers Program
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Where mentorship knows no limits
          </p>
          <Link 
            href="/login"
            className="inline-block px-8 py-4 bg-white dark:bg-black text-yellow-600 dark:text-yellow-400 border-2 border-white dark:border-yellow-400 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
          >
            Apply for Outliers
          </Link>
        </div>
      </section>

      {/* What is Outliers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">What is Outliers?</h2>
          <div className="bg-gradient-to-br from-yellow-50 to-gray-50 dark:from-yellow-400/10 dark:to-gray-800 rounded-xl p-8 shadow-md border border-yellow-200 dark:border-yellow-400/20">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Each year, we conduct a <strong className="text-yellow-600 dark:text-yellow-400">rigorous selection process</strong> through which we handpick a group of students who join <strong className="text-yellow-600 dark:text-yellow-400">Outliers</strong> — our exclusive community where mentorship knows no limits.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              In this close-knit group, students gain not only academic success but also develop resilience and a growth-oriented mindset.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              After securing spots in top colleges across the country, Outliers members continue to nurture the community, ensuring that the cycle of mentorship remains strong and impactful for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Outliers Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-yellow-400/20 transition border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Personalized Mentorship</h3>
              <p className="text-gray-600 dark:text-gray-400">
                One-on-one guidance from IIT/NIT alumni who understand your journey.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-yellow-400/20 transition border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Exclusive Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access to premium study materials, problem sets, and insider tips.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-yellow-400/20 transition border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Peer Network</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with like-minded, high-achieving students from across India.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Career Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beyond JEE — college selection, branch choice, and career planning.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mindset Training</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build resilience, confidence, and a winning attitude for life.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lifelong Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stay connected even after college, continue the mentorship chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Selection Process</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Submit your application with academic records, motivation statement, and goals.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Assessment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Take a comprehensive test to evaluate your current preparation level and potential.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Interview</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Personal interview with our mentors to understand your commitment and fit.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Outliers</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join our exclusive community and begin your transformative journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Ananya Sharma</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IIT Delhi, CSE</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Being part of Outliers changed my life. The mentorship wasn't just about JEE — it taught me how to think, persevere, and grow. I'm now paying it forward by mentoring the next batch!"
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  R
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Rohan Verma</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IIT Bombay, Mech</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "The community support in Outliers is unmatched. Having seniors who genuinely cared about my success made all the difference. Best decision of my JEE journey!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Become an Outlier?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Applications open for the next batch. Limited seats available.
          </p>
          <Link 
            href="/login"
            className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
