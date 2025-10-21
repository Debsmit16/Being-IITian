import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-gray-400 bg-clip-text text-transparent">
              Being IITian
            </h3>
            <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">
              Transforming JEE preparation through mentorship and real-world experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-500 text-sm">
              <li><Link href="/courses" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Courses</Link></li>
              <li><Link href="/about" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">About Us</Link></li>
              <li><Link href="/outliers" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Outliers Program</Link></li>
              <li><Link href="/login" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Login</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-500 text-sm">
              <li><a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">YouTube Channel</a></li>
              <li><a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Study Materials</a></li>
              <li><a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-500 text-sm">
              <li>Email: info@beingiitian.com</li>
              <li>Phone: +91 98765 43210</li>
              <li className="pt-4 flex space-x-4">
                <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">YouTube</a>
                <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Instagram</a>
                <a href="#" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-900 mt-8 pt-8 text-center text-gray-500 dark:text-gray-600 text-sm">
          <p>&copy; 2025 Being IITian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
