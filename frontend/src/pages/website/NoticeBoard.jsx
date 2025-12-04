import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaExclamationCircle, FaBell, FaFilter, FaSearch, FaBullhorn, FaGraduationCap, FaUser, FaTag, FaDownload, FaShareAlt } from "react-icons/fa";

export default function NoticeBoard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);

  // Initialize notices data
  useEffect(() => {
    // In a real app, this would come from an API
    const initialNotices = [
      {
        id: 1,
        title: "Final Exams Schedule - Spring 2024",
        description: "Complete schedule for end-of-year final examinations. All students must review their exam times and locations carefully.",
        category: "academic",
        date: "2024-05-15",
        time: "9:00 AM",
        location: "Main Building",
        priority: "high",
        author: "Academic Office",
        attachments: ["exams_schedule.pdf"],
        pinned: true,
        expires: "2024-06-15"
      },
      {
        id: 2,
        title: "School Sports Day Announcement",
        description: "Annual sports day will be held on May 25th. All students are required to participate. Parents are welcome to attend.",
        category: "events",
        date: "2024-05-25",
        time: "8:00 AM - 3:00 PM",
        location: "School Sports Ground",
        priority: "medium",
        author: "Physical Education Dept",
        attachments: ["sports_day_program.pdf"],
        pinned: true,
        expires: "2024-05-30"
      },
      {
        id: 3,
        title: "Parent-Teacher Meeting Schedule",
        description: "Spring semester parent-teacher meetings will be conducted from June 10-12. Please book your time slot online.",
        category: "parents",
        date: "2024-06-10",
        time: "2:00 PM - 6:00 PM",
        location: "Various Classrooms",
        priority: "medium",
        author: "Administration",
        attachments: ["ptm_schedule.pdf", "booking_form.pdf"],
        pinned: false,
        expires: "2024-06-15"
      },
      {
        id: 4,
        title: "Library Renovation Notice",
        description: "The main library will be closed for renovations from June 1-30. Alternative study arrangements have been made.",
        category: "facilities",
        date: "2024-06-01",
        time: "All Day",
        location: "Library Building",
        priority: "medium",
        author: "Facilities Management",
        attachments: ["renovation_notice.pdf"],
        pinned: false,
        expires: "2024-07-01"
      },
      {
        id: 5,
        title: "Scholarship Application Deadline",
        description: "Last date for submitting scholarship applications for the 2024-25 academic year is May 31st.",
        category: "academic",
        date: "2024-05-31",
        time: "5:00 PM",
        location: "Guidance Office",
        priority: "high",
        author: "Guidance Department",
        attachments: ["scholarship_form.pdf", "eligibility_criteria.pdf"],
        pinned: true,
        expires: "2024-06-01"
      },
      {
        id: 6,
        title: "Summer Break Announcement",
        description: "School will be closed for summer vacation from June 15th to August 15th. Classes resume on August 16th.",
        category: "holidays",
        date: "2024-06-15",
        time: "-",
        location: "-",
        priority: "low",
        author: "Administration",
        attachments: ["academic_calendar.pdf"],
        pinned: false,
        expires: "2024-08-16"
      },
      {
        id: 7,
        title: "Science Fair Project Submission",
        description: "All science fair projects must be submitted by May 20th. Late submissions will not be accepted.",
        category: "academic",
        date: "2024-05-20",
        time: "3:00 PM",
        location: "Science Lab",
        priority: "high",
        author: "Science Department",
        attachments: ["science_fair_guidelines.pdf"],
        pinned: false,
        expires: "2024-05-21"
      },
      {
        id: 8,
        title: "Bus Route Changes Effective June 1",
        description: "Important changes to school bus routes and timings starting June 1st. Please review the new schedule.",
        category: "transport",
        date: "2024-06-01",
        time: "6:00 AM",
        location: "Bus Bay",
        priority: "medium",
        author: "Transport Department",
        attachments: ["new_bus_routes.pdf", "timetable.pdf"],
        pinned: false,
        expires: "2024-07-01"
      },
      {
        id: 9,
        title: "Art Exhibition Opening",
        description: "Annual student art exhibition opening on May 18th. All parents and students are invited.",
        category: "events",
        date: "2024-05-18",
        time: "4:00 PM - 7:00 PM",
        location: "Art Gallery",
        priority: "low",
        author: "Art Department",
        attachments: ["exhibition_invitation.pdf"],
        pinned: false,
        expires: "2024-05-20"
      },
      {
        id: 10,
        title: "Internet Maintenance Notice",
        description: "Scheduled maintenance on school network will cause intermittent internet access on May 22nd.",
        category: "facilities",
        date: "2024-05-22",
        time: "10:00 PM - 2:00 AM",
        location: "All Campus",
        priority: "low",
        author: "IT Department",
        attachments: [],
        pinned: false,
        expires: "2024-05-23"
      }
    ];
    
    setNotices(initialNotices);
    setFilteredNotices(initialNotices);
  }, []);

  // Filter notices based on active filter and search query
  useEffect(() => {
    let filtered = notices;
    
    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(notice => notice.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notice => 
        notice.title.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query) ||
        notice.author.toLowerCase().includes(query)
      );
    }
    
    // Sort by pinned first, then by priority, then by date
    filtered.sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned - a.pinned;
      
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      return new Date(b.date) - new Date(a.date);
    });
    
    setFilteredNotices(filtered);
  }, [activeFilter, searchQuery, notices]);

  const categories = [
    { id: "all", name: "All Notices", icon: <FaBullhorn />, count: notices.length },
    { id: "academic", name: "Academic", icon: <FaGraduationCap />, count: notices.filter(n => n.category === "academic").length },
    { id: "events", name: "Events", icon: <FaCalendarAlt />, count: notices.filter(n => n.category === "events").length },
    { id: "parents", name: "Parents", icon: <FaUser />, count: notices.filter(n => n.category === "parents").length },
    { id: "facilities", name: "Facilities", icon: <FaMapMarkerAlt />, count: notices.filter(n => n.category === "facilities").length },
    { id: "holidays", name: "Holidays", icon: <FaCalendarAlt />, count: notices.filter(n => n.category === "holidays").length },
    { id: "transport", name: "Transport", icon: <FaMapMarkerAlt />, count: notices.filter(n => n.category === "transport").length }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-800 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case "high": return <FaExclamationCircle className="text-red-500" />;
      case "medium": return <FaBell className="text-yellow-500" />;
      case "low": return <FaBell className="text-green-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "events": return "bg-purple-100 text-purple-800";
      case "parents": return "bg-pink-100 text-pink-800";
      case "facilities": return "bg-orange-100 text-orange-800";
      case "holidays": return "bg-green-100 text-green-800";
      case "transport": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">School Notice Board</h1>
              <p className="text-xl text-indigo-100 max-w-2xl">
                Stay updated with the latest announcements, events, and important information from our school.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaBell className="text-3xl mr-3" />
                <div>
                  <div className="text-2xl font-bold">{notices.filter(n => n.pinned).length}</div>
                  <div className="text-indigo-200">Pinned Notices</div>
                </div>
              </div>
              <p className="text-sm text-indigo-200">Important announcements are pinned for easy access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices by title, description, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-3" />
              <span className="text-gray-700 font-medium mr-4">Filter by:</span>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filters (Horizontal Scroll on Mobile) */}
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition whitespace-nowrap ${activeFilter === cat.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeFilter === cat.id 
                    ? 'bg-white/30' 
                    : 'bg-gray-300'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {activeFilter === "all" ? "All Notices" : categories.find(c => c.id === activeFilter)?.name}
              <span className="text-gray-500 text-lg ml-2">({filteredNotices.length})</span>
            </h2>
            <div className="text-sm text-gray-600">
              <FaCalendarAlt className="inline mr-2" />
              Updated Daily
            </div>
          </div>

          {filteredNotices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <FaBullhorn className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No notices found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredNotices.map(notice => (
                <div
                  key={notice.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border transition duration-300 hover:shadow-lg ${notice.pinned 
                    ? 'border-indigo-300 border-l-4 border-l-indigo-500' 
                    : 'border-gray-200'}`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {notice.pinned && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                              <FaTag className="mr-1" /> Pinned
                            </span>
                          )}
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(notice.priority)}`}>
                            {getPriorityIcon(notice.priority)}
                            <span className="ml-1 capitalize">{notice.priority} Priority</span>
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(notice.category)}`}>
                            {categories.find(c => c.id === notice.category)?.icon}
                            <span className="ml-1 capitalize">{notice.category}</span>
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h3>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4 text-right">
                        <div className="text-2xl font-bold text-gray-700">
                          {new Date(notice.date).getDate()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 line-clamp-3">{notice.description}</p>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-medium">{formatDate(notice.date)}</div>
                        </div>
                      </div>
                      {notice.time !== "-" && (
                        <div className="flex items-center text-gray-700">
                          <FaClock className="mr-3 text-gray-400 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500">Time</div>
                            <div className="font-medium">{notice.time}</div>
                          </div>
                        </div>
                      )}
                      {notice.location !== "-" && (
                        <div className="flex items-center text-gray-700">
                          <FaMapMarkerAlt className="mr-3 text-gray-400 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="font-medium">{notice.location}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center text-gray-700">
                        <FaUser className="mr-3 text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-sm text-gray-500">Posted By</div>
                          <div className="font-medium">{notice.author}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
                      <div className="mb-4 sm:mb-0">
                        {notice.attachments.length > 0 && (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-3">Attachments:</span>
                            <div className="flex flex-wrap gap-2">
                              {notice.attachments.map((file, idx) => (
                                <a
                                  key={idx}
                                  href="#"
                                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
                                >
                                  <FaDownload className="mr-2" />
                                  {file}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-500 hover:text-indigo-600 transition">
                          <FaShareAlt />
                        </button>
                        <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Archive Section */}
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Notice Archive</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["January", "February", "March", "April"].map(month => (
              <a
                key={month}
                href="#"
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center group"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-2 group-hover:text-indigo-700">
                  {Math.floor(Math.random() * 15) + 5}
                </div>
                <div className="text-gray-700 font-medium">{month} 2024</div>
                <div className="text-sm text-gray-500 mt-1">Notices</div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition">
              View Full Archive
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <FaBell className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Get Notifications</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to receive important notices and announcements directly to your email or phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              You can unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">Notice Updates</h4>
            <p className="text-gray-600 text-sm">
              New notices are posted daily. Important announcements are highlighted and pinned for visibility.
            </p>
          </div>
          <div className="bg-green-50 p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">Notification Types</h4>
            <p className="text-gray-600 text-sm">
              Notices are categorized by type: Academic, Events, Parents, Facilities, Holidays, and Transport.
            </p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
            <p className="text-gray-600 text-sm">
              For questions about any notice, please contact the relevant department or the main office.
            </p>
          </div>
        </div>
      </div>
      
      <PublicFooter />
    </>
  );
}