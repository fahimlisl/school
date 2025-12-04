import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { FaGraduationCap, FaUsers, FaAward, FaBook, FaHeart, FaChalkboardTeacher, FaTree, FaLightbulb, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function About() {
  const stats = [
    { icon: <FaGraduationCap />, value: "95%", label: "College Acceptance", description: "of our graduates attend college" },
    { icon: <FaUsers />, value: "1,250+", label: "Students", description: "across grades 9-12" },
    { icon: <FaChalkboardTeacher />, value: "85", label: "Certified Teachers", description: "student-teacher ratio 15:1" },
    { icon: <FaAward />, value: "25+", label: "AP Courses", description: "Advanced Placement offerings" },
    { icon: <FaBook />, value: "40+", label: "Clubs & Activities", description: "extracurricular programs" },
    { icon: <FaHeart />, value: "10,000+", label: "Service Hours", description: "community service annually" }
  ];

  const missionValues = [
    {
      icon: <FaGraduationCap />,
      title: "Academic Excellence",
      description: "Rigorous curriculum that challenges students to achieve their highest potential through innovative teaching methods."
    },
    {
      icon: <FaHeart />,
      title: "Character Development",
      description: "Fostering integrity, respect, and responsibility to prepare students for ethical leadership in society."
    },
    {
      icon: <FaUsers />,
      title: "Inclusive Community",
      description: "Creating a welcoming environment where every student feels valued, supported, and empowered to succeed."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovative Learning",
      description: "Integrating technology and creative approaches to develop critical thinking and problem-solving skills."
    }
  ];

  const leadershipTeam = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal",
      experience: "20+ years in education",
      quote: "Every student has unique potential waiting to be unlocked.",
      imageColor: "bg-blue-100"
    },
    {
      name: "Mr. David Chen",
      role: "Vice Principal",
      experience: "15 years academic leadership",
      quote: "Education is the most powerful tool for change.",
      imageColor: "bg-green-100"
    },
    {
      name: "Ms. Maria Rodriguez",
      role: "Academic Dean",
      experience: "18 years curriculum development",
      quote: "Great teaching inspires lifelong learning.",
      imageColor: "bg-purple-100"
    },
    {
      name: "Coach Michael Thompson",
      role: "Athletic Director",
      experience: "22 years coaching experience",
      quote: "Sports teach discipline, teamwork, and perseverance.",
      imageColor: "bg-orange-100"
    }
  ];

  const timelineEvents = [
    { year: "1995", event: "School founded with 200 students", description: "Established with a vision for academic excellence" },
    { year: "2002", event: "New science wing added", description: "State-of-the-art laboratories opened" },
    { year: "2010", event: "Received Blue Ribbon Award", description: "National recognition for academic excellence" },
    { year: "2018", event: "Performing Arts Center built", description: "New facility for music and theater programs" },
    { year: "2023", event: "STEM Innovation Lab opened", description: "Cutting-edge technology and robotics center" }
  ];

  return (
    <>
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '50px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <FaTree className="mr-3 text-2xl" />
                <span className="text-lg">Established 1995</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Educating Tomorrow's
                <span className="block text-blue-300">Leaders Today</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                For nearly three decades, we've been committed to providing exceptional education that empowers students to achieve their full potential and make a positive impact on the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-1 shadow-lg">
                  Schedule a Tour
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
                  View Our Campus
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white/5 rounded-xl">
                      <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                      <div className="text-blue-200 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-blue-200 mt-6 text-sm">
                  Recognized as one of the top public schools in the state
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to a nationally recognized institution of learning excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">A Legacy of Excellence</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1995 with just 200 students, our school began as a vision to create an educational environment that balanced academic rigor with character development. Our founders believed that education should not only prepare students for college but also for life as responsible, compassionate citizens.
                </p>
                <p>
                  Over the years, we've grown into a comprehensive high school serving over 1,250 students, but we've never lost sight of our core mission: to provide a transformative educational experience that empowers every student to reach their full potential.
                </p>
                <p>
                  Today, we stand as a beacon of educational excellence, consistently ranking among the top schools in our state and recognized nationally for our innovative programs and outstanding student achievements.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">School Timeline</h4>
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-16">
                        <div className="bg-blue-600 text-white text-center py-2 px-3 rounded-lg">
                          <div className="font-bold">{event.year}</div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <h5 className="font-semibold text-gray-800">{event.event}</h5>
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission & Values</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guiding principles that shape every aspect of our educational community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="text-4xl text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission Statement</h3>
            <p className="text-xl italic max-w-3xl mx-auto leading-relaxed">
              "To provide an exceptional educational experience that empowers every student to achieve academic excellence, 
              develop strong character, and become compassionate leaders prepared to make meaningful contributions to our global society."
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Leadership</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to student success and educational excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className={`h-40 ${leader.imageColor} flex items-center justify-center`}>
                  <FaUsers className="text-6xl text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                  <div className="text-blue-600 font-medium mb-2">{leader.role}</div>
                  <div className="text-sm text-gray-500 mb-4">{leader.experience}</div>
                  <p className="text-gray-600 italic text-sm border-l-4 border-blue-300 pl-4">
                    "{leader.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Life */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Campus Life</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">A Vibrant Learning Community</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaBook className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Academic Programs</h4>
                        <p className="text-gray-600 text-sm">Honors, AP, and specialized tracks</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <FaHeart className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Student Support</h4>
                        <p className="text-gray-600 text-sm">Counseling, tutoring, and wellness services</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <FaUsers className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Extracurriculars</h4>
                        <p className="text-gray-600 text-sm">40+ clubs and organizations</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 p-3 rounded-lg mr-4">
                        <FaAward className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Athletics</h4>
                        <p className="text-gray-600 text-sm">20 varsity sports teams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Facts</h3>
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-3xl text-blue-600 mr-4">{stat.icon}</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                      <div className="text-sm text-gray-500">{stat.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Visit */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Visit Our Campus</h2>
              <p className="text-gray-600 mb-8">
                We invite you to experience our vibrant learning community firsthand. Schedule a tour to see our facilities, meet our faculty, and learn more about what makes our school special.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-4 text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div>123 Education Street, Academic City, AC 12345</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaPhone className="mr-4 text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>(555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-4 text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div>info@school.edu</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaCalendarAlt className="mr-4 text-blue-600 text-xl" />
                  <div>
                    <div className="font-medium">Office Hours</div>
                    <div>Monday-Friday: 7:30 AM - 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="#" className="p-4 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
                  <FaInstagram className="text-2xl" />
                </a>
                <a href="#" className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                  <FaYoutube className="text-2xl" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">Schedule a Tour</h4>
                <p className="text-gray-600 mb-4">Ready to see our campus in person?</p>
                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  Book Your Visit Today
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation & Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Accreditation & Recognition</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">A+</div>
              <div className="text-gray-700">State Rating</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">#5</div>
              <div className="text-gray-700">State Ranking</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-700">Accreditation</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">Blue Ribbon</div>
              <div className="text-gray-700">National Award</div>
            </div>
          </div>
        </div>
      </div>
      
      <PublicFooter />
    </>
  );
}