import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <PublicNavbar />

<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-28">
  {/* Background Elements */}
  <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full translate-y-1/2 -translate-x-1/3 opacity-50"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left Column - Text Content */}
      <div className="space-y-8 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-500/25">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Since 1995 • Excellence in Education
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
          Welcome to{' '}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              YourSchool
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          A cutting-edge school management system designed for the digital age. 
          We empower students, support teachers, and streamline administration 
          with innovative technology and personalized learning experiences.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-sm text-gray-500">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              25+
            </div>
            <div className="text-sm text-gray-500">Years Experience</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/about"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              Explore Our Campus
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </Link>
          
          <Link
            to="/contact"
            className="group px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl text-lg hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact Admissions
            </span>
          </Link>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="relative">
        <div className="relative group">
          <img
            src="https://imgs.search.brave.com/gQz4DMcJRjHjN2xrmmYY78v9F1SWwu9H2Bjv4ZzFSEA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRE83TVUv/TUFFSkg5RE83TVUv/MS90bC9jYW52YS1s/YXJnZS1zY2hvb2wt/c2lnbi1pbi1mcm9u/dC1vZi1zY2hvb2wt/YnVpbGRpbmctTUFF/Skg5RE83TVUuanBn"
            alt="Modern School Campus"
            className="rounded-2xl shadow-2xl w-full transform group-hover:scale-[1.02] transition-transform duration-500"
          />
          {/* Image Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl group-hover:opacity-0 transition-opacity duration-500"></div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl max-w-xs animate-float">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">Top Rankings</div>
              <div className="text-sm text-gray-500">#1 in District</div>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-2xl max-w-xs animate-float-delayed">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <div className="font-bold text-gray-900">Smart Classes</div>
              <div className="text-sm text-gray-500">Digital Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-4">
        Why We're Different
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Experience Excellence in{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Education
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We combine traditional values with innovative approaches to create 
        an unparalleled learning environment.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      {[
        {
          icon: '👨‍🏫',
          title: 'Expert Faculty',
          description: 'Our teachers are not just educators but mentors with advanced degrees and industry experience.',
          features: ['PhD/Masters Qualified', '10+ Years Average Experience', 'Regular Training Programs'],
          color: 'from-blue-500 to-cyan-500'
        },
        {
          icon: '💻',
          title: 'Smart Infrastructure',
          description: 'State-of-the-art facilities designed for 21st-century learning and collaboration.',
          features: ['Digital Classrooms', 'STEM Labs', 'High-Speed WiFi Campus'],
          color: 'from-purple-500 to-pink-500'
        },
        {
          icon: '📱',
          title: 'Digital Ecosystem',
          description: 'Seamless integration of technology for management, learning, and communication.',
          features: ['Parent Portal', 'Online Assessments', 'Real-time Updates'],
          color: 'from-green-500 to-emerald-500'
        }
      ].map((item, index) => (
        <div 
          key={index}
          className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-tr-2xl rounded-bl-full"></div>
          
          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-2xl">{item.icon}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
          <p className="text-gray-600 mb-6">{item.description}</p>
          
          <ul className="space-y-2">
            {item.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link to="/about" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center gap-1">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }}></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
        <span className="text-sm font-medium">Latest Updates</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Campus{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Announcements
        </span>
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Stay informed with the latest news, events, and important dates from our campus.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Notices Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Important Notices</h3>
          <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
            Updated Today
          </div>
        </div>
        
        <div className="space-y-6">
          {[
            {
              icon: '🚧',
              title: 'Infrastructure Upgrade',
              description: 'Maintenance work scheduled for Friday. School will remain closed.',
              date: 'Dec 10, 2024',
              priority: 'high'
            },
            {
              icon: '🎓',
              title: '2025-26 Admissions',
              description: 'Admissions open for new academic year. Limited seats available.',
              date: 'Dec 5, 2024',
              priority: 'medium'
            },
            {
              icon: '🏆',
              title: 'Annual Sports Week',
              description: 'Sports competitions starting next month. Register your teams now.',
              date: 'Dec 1, 2024',
              priority: 'low'
            }
          ].map((notice, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-l-4 ${
                notice.priority === 'high' ? 'border-red-500 bg-red-500/5' :
                notice.priority === 'medium' ? 'border-yellow-500 bg-yellow-500/5' :
                'border-green-500 bg-green-500/5'
              } hover:bg-white/5 transition-colors duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{notice.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg">{notice.title}</h4>
                    <span className="text-sm text-gray-400">{notice.date}</span>
                  </div>
                  <p className="text-gray-300 mt-2">{notice.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <Link 
            to="/notice" 
            className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            View All Announcements
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/30 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Upcoming Events</h3>
          <div className="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">
            This Month
          </div>
        </div>
        
        <div className="space-y-6">
          {[
            {
              date: 'Dec 15',
              title: 'Science Fair',
              time: '9:00 AM - 3:00 PM',
              location: 'Main Auditorium'
            },
            {
              date: 'Dec 18',
              title: 'Parent-Teacher Meeting',
              time: '2:00 PM - 5:00 PM',
              location: 'Classrooms'
            },
            {
              date: 'Dec 22',
              title: 'Winter Concert',
              time: '6:00 PM - 8:00 PM',
              location: 'Open Ground'
            }
          ].map((event, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">{event.date}</div>
                  <div className="text-xs text-gray-400">December</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{event.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-700/30">
          <div className="flex items-center justify-between">
            <Link 
              to="/events" 
              className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              Full Event Calendar
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-4">
        Campus Life
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Explore Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Campus Gallery
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Take a virtual tour through our state-of-the-art facilities and vibrant campus life.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[
        {
          image: "https://imgs.search.brave.com/ICQQasWHOF5DiPKC8F2ArkpgLRlMKeEWCoFpSUjD-xM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzE4LzI3Lzcw/LzM2MF9GXzIxODI3/NzA1MV9SUFhDMG9O/amtNcE9aM3hzcktS/emppWklDNlBnVUlp/bS5qcGc",
          title: "Modern Classrooms",
          category: "Academics"
        },
        {
          image: "https://imgs.search.brave.com/yarjhS2ZflGMlMA75y5si5chHSTZtv1EcFwW5V0WH3o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/MjY5Mzc1L3Bob3Rv/L2VsZW1lbnRhcnkt/c2Nob29sLWluLXBl/bm5zeWx2YW5pYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QWpkYWc4WGtBeU8z/MmtiRDJOVWlGWnMz/SzVIQ04yd1NDU3VX/TVFPZzF4WT0",
          title: "Science Labs",
          category: "Facilities"
        },
        {
          image: "https://imgs.search.brave.com/kJOEt0RlKYmM1rmBSJJjXDuQYP4dvAs4BH6aF5XIA2s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc2/ODMwODkzL3Bob3Rv/L21vZGVybi1oaWdo/LXNjaG9vbC13aXRo/LWZsYWdwb2xlLndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz02dmp1/ZTlYTHFQWU9pNHQ5/UXlzT0FDUmlwT0RV/enBQS1hqYkFpc0JC/UDNrPQ",
          title: "Sports Complex",
          category: "Activities"
        },
        {
          image: "https://imgs.search.brave.com/YwPYLWkQ50Ze-o_WPTWtPdOVTq31GK3iSUhtbEIxNnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAy/MDIxMTY3OC9waG90/by90eXBpY2FsLWFt/ZXJpY2FuLXNjaG9v/bC1idWlsZGluZy1l/eHRlcmlvci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9bzIx/RmtoQWR3RjlzUV95/c1owU0JLWnlxdTVV/UHRLc1MtOGJWTS1a/ZzNDST0",
          title: "Library & Resources",
          category: "Learning"
        }
      ].map((item, index) => (
        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="aspect-square overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
              {item.category}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
          </div>
          
          {/* Quick View Button */}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:scale-110">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>

    {/* View More */}
    <div className="text-center mt-12">
      <Link 
        to="/gallery" 
        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
      >
        <span>View Full Gallery</span>
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </Link>
    </div>
  </div>
</section>


     <section className="py-16 md:py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 text-white overflow-hidden relative">
  {/* Background Elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full"></div>
    <div className="absolute top-1/3 -left-20 w-80 h-80 bg-white rounded-full"></div>
    <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-white rounded-full"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
        <span className="text-sm font-medium">Admissions Open</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Ready to Begin Your
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
          Educational Journey?
        </span>
      </h2>

      {/* Description */}
      <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
        Join our community of learners, innovators, and future leaders. 
        Admissions for the 2025–26 academic year are now open.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
          <div className="text-2xl sm:text-3xl font-bold mb-1">98%</div>
          <div className="text-sm text-blue-100">Pass Rate</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
          <div className="text-2xl sm:text-3xl font-bold mb-1">50+</div>
          <div className="text-sm text-blue-100">Expert Faculty</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
          <div className="text-2xl sm:text-3xl font-bold mb-1">15+</div>
          <div className="text-sm text-blue-100">Sports Facilities</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
          <div className="text-2xl sm:text-3xl font-bold mb-1">100%</div>
          <div className="text-sm text-blue-100">Digital Campus</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Link
          to="/contact"
          className="group w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <span>Apply Now</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </Link>

        <Link
          to="/about"
          className="group w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl text-lg hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <span>Virtual Tour</span>
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
        <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Scholarships Available</h4>
            <p className="text-sm text-blue-200">Merit-based financial aid up to 100%</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🏆</span>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Proven Results</h4>
            <p className="text-sm text-blue-200">Top university placements year after year</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🤝</span>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Parent Partnership</h4>
            <p className="text-sm text-blue-200">Regular updates & dedicated parent portal</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Admission Timeline</h3>
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/30 -translate-y-1/2"></div>
          ``
          {/* Timeline Items */}
          {[
            { step: "01", title: "Application", desc: "Submit online form", status: "active" },
            { step: "02", title: "Assessment", desc: "Entrance test", status: "upcoming" },
            { step: "03", title: "Interview", desc: "Student & parent", status: "upcoming" },
            { step: "04", title: "Admission", desc: "Final enrollment", status: "upcoming" }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center md:block relative z-10 mb-8 md:mb-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold
                ${item.status === 'active' 
                  ? 'bg-gradient-to-br from-white to-blue-100 text-blue-700 shadow-lg shadow-blue-500/30' 
                  : 'bg-white/20 text-white'}`}>
                {item.step}
              </div>
              <div className="ml-4 md:ml-0 md:mt-4 text-left md:text-center">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </div>
              {index < 3 && (
                <div className="md:hidden ml-4 w-12 h-1 bg-white/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-12 pt-8 border-t border-white/20">
        <p className="text-blue-200 mb-4">
          Need assistance with your application?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">📞</span>
            <span>+1 (555) 123-4567</span>
          </a>
          <span className="text-white/30 hidden sm:block">•</span>
          <a href="mailto:admissions@yourschool.edu" className="flex items-center gap-2 hover:text-white transition-colors">
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✉️</span>
            <span>admissions@yourschool.edu</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

      <PublicFooter />
    </>
  );
}
