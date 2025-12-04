import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser, FaSchool, FaFacebook, FaTwitter, FaInstagram, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentName: "",
    grade: "",
    subject: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // In a real app, you would send the form data to your backend here
      console.log("Form submitted:", formData);
      setSubmitted(true);
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          studentName: "",
          grade: "",
          subject: "",
          message: ""
        });
      }, 5000);
    } else {
      setErrors(validationErrors);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      details: ["(555) 123-4567", "(555) 987-6543"],
      description: "Main Office & Attendance Line"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      details: ["info@school.edu", "principal@school.edu"],
      description: "General Inquiries & Administration"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      details: ["123 Education Street", "Academic City, AC 12345"],
      description: "Main Campus Location"
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      details: ["Monday-Friday: 7:30 AM - 4:00 PM", "Saturday: 9:00 AM - 12:00 PM"],
      description: "School Year Schedule"
    }
  ];

  const departments = [
    {
      name: "Administration",
      contact: "Dr. Sarah Johnson",
      email: "principal@school.edu",
      phone: "(555) 123-4567 ext. 101"
    },
    {
      name: "Guidance Office",
      contact: "Mr. David Chen",
      email: "guidance@school.edu",
      phone: "(555) 123-4567 ext. 201"
    },
    {
      name: "Registrar",
      contact: "Ms. Maria Rodriguez",
      email: "registrar@school.edu",
      phone: "(555) 123-4567 ext. 301"
    },
    {
      name: "Athletics",
      contact: "Coach Michael Thompson",
      email: "athletics@school.edu",
      phone: "(555) 123-4567 ext. 401"
    }
  ];

  const emergencyContacts = [
    { title: "School Nurse", phone: "(555) 123-4567 ext. 501" },
    { title: "Security Office", phone: "(555) 123-4567 ext. 999" },
    { title: "District Office", phone: "(555) 987-6543" }
  ];

  return (
    <>
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Our School</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              We're here to help! Reach out with questions, concerns, or to schedule a visit.
            </p>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <FaSchool className="mr-3 text-2xl" />
              <span className="text-lg">Academic Excellence Since 1995</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        
        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                <p className="text-green-600">Thank you for contacting us. We'll respond within 1-2 business days.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <FaPaperPlane className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Send Us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parent/Guardian Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="If applicable"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Grade</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                      <option value="alumni">Alumni</option>
                      <option value="prospective">Prospective Student</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject / Department
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="academic">Academic Matters</option>
                      <option value="admissions">Admissions</option>
                      <option value="athletics">Athletics</option>
                      <option value="guidance">Guidance Counseling</option>
                      <option value="transportation">Transportation</option>
                      <option value="health">Health Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 border ${errors.message ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                  >
                    <FaPaperPlane className="inline mr-2" />
                    Send Message
                  </button>
                  <p className="text-gray-500 text-sm mt-3">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            </div>

            {/* Social Media Section */}
            <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Connect With Us</h3>
              <div className="flex justify-center space-x-6">
                <a href="#" className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="#" className="p-4 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition transform hover:scale-110">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition transform hover:scale-110">
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
              <p className="text-center text-gray-600 mt-6">
                Follow us for school updates, events, and announcements
              </p>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <div className="text-blue-600 text-xl">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 mb-1">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                    <p className="text-gray-600 text-sm mb-1">{dept.contact}</p>
                    <p className="text-blue-600 text-sm">{dept.email}</p>
                    <p className="text-gray-500 text-sm">{dept.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4">
                <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                Emergency Contacts
              </h3>
              <p className="text-red-700 mb-4 text-sm">
                For urgent matters during school hours
              </p>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/50 p-3 rounded">
                    <span className="font-medium text-red-800">{contact.title}</span>
                    <span className="font-semibold text-red-700">{contact.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-3xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Campus Map</p>
                  <p className="text-gray-500 text-sm">123 Education Street</p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                    View Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What are the school office hours?",
                a: "Our main office is open Monday through Friday from 7:30 AM to 4:00 PM, and Saturdays from 9:00 AM to 12:00 PM during the school year."
              },
              {
                q: "How do I report a student absence?",
                a: "Please call our attendance line at (555) 123-4567 before 9:00 AM on the day of absence."
              },
              {
                q: "Where can I find the school calendar?",
                a: "The academic calendar is available on our website under the 'Parents' section."
              },
              {
                q: "How do I schedule a parent-teacher conference?",
                a: "Contact the main office or your child's teacher directly via email to schedule a conference."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <PublicFooter />
    </>
  );
}