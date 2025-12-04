import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { useState } from "react";
import { FaSearch, FaBook, FaChalkboardTeacher, FaGraduationCap, FaCalendarAlt, FaUsers, FaClipboardList } from "react-icons/fa";

export default function Courses() {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  
  // School course data
  const courses = [
    {
      id: 1,
      title: "Mathematics - Grade 10",
      description: "Advanced algebra, geometry, trigonometry, and introduction to calculus. Focus on problem-solving and logical reasoning.",
      subject: "mathematics",
      grade: "10",
      teacher: "Mr. Johnson",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      duration: "Full Year",
      students: 28,
      prerequisites: "Grade 9 Math",
      credits: 1.0,
      syllabusLink: "#"
    },
    {
      id: 2,
      title: "English Literature",
      description: "Study of classical and contemporary literature, composition, and critical analysis skills.",
      subject: "english",
      grade: "11",
      teacher: "Ms. Williams",
      schedule: "Tue, Thu - 10:30 AM",
      duration: "Full Year",
      students: 24,
      prerequisites: "Grade 10 English",
      credits: 1.0,
      syllabusLink: "#"
    },
    {
      id: 3,
      title: "Biology - Honors",
      description: "In-depth study of cellular biology, genetics, ecology, and human anatomy with lab components.",
      subject: "science",
      grade: "11",
      teacher: "Dr. Chen",
      schedule: "Mon, Wed, Fri - 11:15 AM",
      duration: "Full Year",
      students: 22,
      prerequisites: "Grade 10 Science",
      credits: 1.0,
      syllabusLink: "#"
    },
    {
      id: 4,
      title: "World History",
      description: "Survey of world civilizations from ancient times to the present, with emphasis on cultural developments.",
      subject: "social-studies",
      grade: "10",
      teacher: "Mr. Rodriguez",
      schedule: "Tue, Thu - 1:00 PM",
      duration: "Full Year",
      students: 30,
      prerequisites: "None",
      credits: 1.0,
      syllabusLink: "#"
    },
    {
      id: 5,
      title: "Physics - AP",
      description: "Advanced Placement Physics covering mechanics, electricity, magnetism, and modern physics.",
      subject: "science",
      grade: "12",
      teacher: "Dr. Patel",
      schedule: "Mon-Fri - 8:00 AM",
      duration: "Full Year",
      students: 18,
      prerequisites: "Algebra II, Grade 11 Science",
      credits: 1.5,
      syllabusLink: "#"
    },
    {
      id: 6,
      title: "Computer Science",
      description: "Introduction to programming, algorithms, and computer systems using Python and JavaScript.",
      subject: "technology",
      grade: "11",
      teacher: "Ms. Davis",
      schedule: "Tue, Thu - 2:30 PM",
      duration: "Semester",
      students: 26,
      prerequisites: "Algebra I",
      credits: 0.5,
      syllabusLink: "#"
    },
    {
      id: 7,
      title: "Art Studio",
      description: "Exploration of various art media including drawing, painting, and digital art fundamentals.",
      subject: "arts",
      grade: "9",
      teacher: "Ms. Garcia",
      schedule: "Mon, Wed - 3:15 PM",
      duration: "Semester",
      students: 20,
      prerequisites: "None",
      credits: 0.5,
      syllabusLink: "#"
    },
    {
      id: 8,
      title: "Spanish III",
      description: "Advanced Spanish language study focusing on conversation, composition, and cultural understanding.",
      subject: "languages",
      grade: "12",
      teacher: "Señor Martinez",
      schedule: "Daily - 1:45 PM",
      duration: "Full Year",
      students: 16,
      prerequisites: "Spanish II",
      credits: 1.0,
      syllabusLink: "#"
    }
  ];

  const grades = ["all", "9", "10", "11", "12"];
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "mathematics", name: "Mathematics" },
    { id: "english", name: "English" },
    { id: "science", name: "Science" },
    { id: "social-studies", name: "Social Studies" },
    { id: "languages", name: "World Languages" },
    { id: "arts", name: "Arts" },
    { id: "technology", name: "Technology" },
    { id: "physical-ed", name: "Physical Education" }
  ];

  const filteredCourses = courses.filter(course => {
    const gradeMatch = selectedGrade === "all" || course.grade === selectedGrade;
    const subjectMatch = selectedSubject === "all" || course.subject === selectedSubject;
    return gradeMatch && subjectMatch;
  });

  const getSubjectIcon = (subject) => {
    switch(subject) {
      case "mathematics": return "∫";
      case "science": return "⚗️";
      case "english": return "📚";
      case "social-studies": return "🗺️";
      case "languages": return "🌍";
      case "arts": return "🎨";
      case "technology": return "💻";
      default: return "📖";
    }
  };

  return (
    <>
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Courses</h1>
          <p className="text-xl mb-8 max-w-3xl">
            Explore our comprehensive curriculum designed to prepare students for college and beyond. 
            Choose from a wide range of subjects and advanced placement courses.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">40+</div>
              <div className="text-blue-100">Courses Offered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">15</div>
              <div className="text-blue-100">AP/Honors Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">25</div>
              <div className="text-blue-100">Certified Teachers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-100">College Acceptance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Filter Courses</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grade Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaGraduationCap className="inline mr-2" />
                Grade Level
              </label>
              <div className="flex flex-wrap gap-2">
                {grades.map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedGrade === grade ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {grade === "all" ? "All Grades" : `Grade ${grade}`}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaBook className="inline mr-2" />
                Subject Area
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Catalog */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Course Catalog</h2>
          <p className="text-gray-600 mb-8">Browse our comprehensive course offerings for the current academic year.</p>
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaBook className="text-5xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more courses.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
                  {/* Course Header */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getSubjectIcon(course.subject)}</span>
                        <div>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Grade {course.grade}
                          </span>
                          {course.credits > 1.0 && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full ml-2">
                              AP Course
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-700">{course.credits}</div>
                        <div className="text-sm text-gray-500">Credits</div>
                      </div>
                    </div>
                    
                    {/* Course Title & Description */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
                    
                    {/* Course Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-700">
                        <FaChalkboardTeacher className="mr-3 text-gray-400" />
                        <span className="font-medium">Teacher:</span>
                        <span className="ml-2">{course.teacher}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-3 text-gray-400" />
                        <span className="font-medium">Schedule:</span>
                        <span className="ml-2">{course.schedule}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaUsers className="mr-3 text-gray-400" />
                        <span className="font-medium">Class Size:</span>
                        <span className="ml-2">{course.students} students</span>
                      </div>
                    </div>
                    
                    {/* Prerequisites */}
                    <div className="mb-6">
                      <div className="flex items-center text-gray-700 mb-2">
                        <FaClipboardList className="mr-2 text-gray-400" />
                        <span className="font-medium">Prerequisites:</span>
                      </div>
                      <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                        {course.prerequisites}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between">
                      <a
                        href={course.syllabusLink}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                      >
                        View Syllabus
                      </a>
                      <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        Course Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Information Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Course Registration Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Registration Process</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center mr-3 flex-shrink-0">1</span>
                  Meet with your academic advisor to discuss course selection
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center mr-3 flex-shrink-0">2</span>
                  Complete course registration form with parent/guardian signature
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center mr-3 flex-shrink-0">3</span>
                  Submit forms to the guidance office by the deadline
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center mr-3 flex-shrink-0">4</span>
                  Receive finalized schedule before the start of the semester
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Important Dates</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex justify-between border-b pb-2">
                  <span>Fall Semester Registration</span>
                  <span className="font-medium">April 1 - May 15</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Spring Semester Registration</span>
                  <span className="font-medium">November 1 - December 10</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Schedule Changes Deadline</span>
                  <span className="font-medium">First 2 weeks of semester</span>
                </li>
                <li className="flex justify-between">
                  <span>AP Exam Registration</span>
                  <span className="font-medium">March 1</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help Choosing Courses?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our academic advisors are available to help students and parents with course selection, 
            college preparation, and academic planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Contact Guidance Office
            </a>
            <a
              href="/academic-catalog.pdf"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Download Full Catalog (PDF)
            </a>
          </div>
        </div>
      </div>
      
      <PublicFooter />
    </>
  );
}