export default function PublicFooter() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "Notice Board", path: "/notice" },
    { name: "Contact", path: "/contact" }
  ];

  const contactInfo = [
    { icon: "📍", text: "123 Education Street, City, Country 12345" },
    { icon: "📞", text: "+1 (555) 123-4567" },
    { icon: "✉️", text: "info@yourschool.edu" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Instagram", icon: "📸", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "YouTube", icon: "▶️", url: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-12 pb-6 mt-1 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          

          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏫</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  YourSchool
                </h2>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students with quality education, innovative learning, and holistic development for a brighter future.
            </p>
            <div className="flex space-x-3">
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                Apply Now
              </button>
              <button className="px-5 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="flex items-center group text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-xl mt-1">{item.icon}</span>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-sm font-medium text-white mb-1">Office Hours</p>
              <p className="text-sm text-gray-400">Mon - Fri: 8:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-400">Sat: 9:00 AM - 1:00 PM</p>
            </div>
          </div>


          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for latest updates and announcements.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-r-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                  Join
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="my-8 border-t border-gray-700"></div>


        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} <span className="text-white font-medium">YourSchool</span>. developed and maintained by <span className="text-white font-serif"><a href="https://fahim.in">Fahim Abdullah</a></span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>


        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">ISO 9001:2015 Certified • Accredited by Education Board</span>
          </div>
        </div>


        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <span className="text-xl">↑</span>
        </button>
      </div>
    </footer>
  );
}