import { useAuth } from "../../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Plus,
  UserCheck,
  BookOpen,
  DollarSign,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  X,
  User,
  Shield,
} from "lucide-react";
import axios from "axios";

export default function StudentList() {
  const { user, token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    feePaid: 0,
    feePending: 0,
  });

  // for updating studnet field
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "",
    gurdianName: "",
    section: "",
  });
  const [editStudentId, setEditStudentId] = useState(null);

  // for fee section
  // const [s , setShowEditModal] = useState(false)
  const [studentIdFee,setStudentIdFee] = useState(null)
  const [showFeeModal, setShowFeeModal] = useState(false);
const [selectedFeeStudent, setSelectedFeeStudent] = useState(null);


  const classes = Array.from({ length: 12 }, (_, i) => i + 1);
  const sections = ["A", "B", "C", "D"];

  useEffect(() => {
    fetchStudentsByClass(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phoneNumber?.toString().includes(searchQuery)
    );
    setFilteredStudents(filtered);

    // update stats
    updateStats(filtered);
  }, [students, searchQuery]);

  const fetchStudentsByClass = async (classNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/admin/fetchAllStudents/${classNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setStudents(response.data.data || []);
      } else {
        console.error("Failed to fetch students:", response.data.message);
        setStudents([]);
      }
    } catch (error) {
      // console.error("Error fetching students:", error); // i didn't used this to avoid unwanted errors
      console.log("student for particular studnets doens't exist", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (studentList) => {
    const total = studentList.length;
    const male = studentList.filter((s) => s.gender === "male").length;
    const female = studentList.filter((s) => s.gender === "female").length;
    const feePaid = studentList.filter((s) => s.feesPaid === true).length;
    const feePending = studentList.filter(
      (s) => s.feesPaid === false || !s.feesPaid
    ).length;

    setStats({
      total,
      male,
      female,
      feePaid,
      feePending,
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/admin/removeStudent/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Delete student:", studentId);
        await fetchStudentsByClass(selectedClass);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const openEditModal = (student) => {
    setEditStudentId(student._id);
    setEditData({
      fullName: student.fullName,
      gurdianName: student.gurdianName,
      section: student.section,
    });
    setShowEditModal(true);
  };


  const openFeeModal = (student) => {
  setSelectedFeeStudent(student);
  setShowFeeModal(true);
};


  const handelViewFeeCollection = async() => {
    try {
      
    } catch (error) {
      
    }
  }

  const handleUpdateStudent = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/admin/updateStudent/${editStudentId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Student updated:");
      setShowEditModal(false);
      await fetchStudentsByClass(selectedClass);
    } catch (error) {
      console.error("error updating studnet deatils ", error);
    }
  };
  const handleSendMessage = (student) => {
    alert(`Message will be sent to ${student.fullName}`);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFeeStatus = (student) => {
    if (student.feesPaid === true) {
      return { text: "Paid", color: "bg-green-100 text-green-700" };
    } else if (student.feesPaid === false) {
      return { text: "Pending", color: "bg-red-100 text-red-700" };
    } else {
      return { text: "Unknown", color: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Students...</p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching student data for Class {selectedClass}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* startign with header  */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Students Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all students, view details, and track progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchStudentsByClass(selectedClass)}
            className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition">
            <Plus className="w-4 h-4 mr-2" />
            Add New Student
          </button>
        </div>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Class {selectedClass}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Male</p>
              <p className="text-2xl font-bold text-gray-800">{stats.male}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.total > 0
              ? `${((stats.male / stats.total) * 100).toFixed(1)}%`
              : "0%"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Female</p>
              <p className="text-2xl font-bold text-gray-800">{stats.female}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.total > 0
              ? `${((stats.female / stats.total) * 100).toFixed(1)}%`
              : "0%"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fee Paid</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.feePaid}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.total > 0
              ? `${((stats.feePaid / stats.total) * 100).toFixed(1)}%`
              : "0%"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fee Pending</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.feePending}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.total > 0
              ? `${((stats.feePending / stats.total) * 100).toFixed(1)}%`
              : "0%"}
          </div>
        </div>
      </div>

              {/* filtrs and search options  */}
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* class selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <div className="flex flex-wrap gap-2">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedClass === cls
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* search bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search students by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

              {/* will need this button later when will be thinking to scale the app more */}
          {/* <button className="flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button> */}
        </div>
      </div>

      {/* studnets sectinn starts here */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        {/* table header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Students List - Class {selectedClass}
              <span className="text-gray-500 text-sm font-normal ml-2">
                ({filteredStudents.length} students found)
              </span>
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>

        {/* table content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class & Section
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No students found
                      </p>
                      <p className="text-gray-400 mt-2">
                        {searchQuery
                          ? "Try a different search term"
                          : `No students in Class ${selectedClass}`}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                          {student.profilePhoto ? (
                            <img
                              src={student.profilePhoto}
                              alt={student.fullName}
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {student.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {student._id?.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">
                            {student.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">
                            {student.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-medium text-gray-700">
                            Class {student.currentClass}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <UserCheck className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            Section: {student.section || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">
                            {formatDate(student.admissionDate)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Guardian: {student.gurdianName || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            getFeeStatus(student).color
                          }`}
                        >
                          {getFeeStatus(student).text}
                        </span>
                        {student.feeStructure && (
                          <div className="text-xs text-gray-500">
                            {/* Total: ${student.feeStructure.totalFees || "N/A"} */}
                            {/* Total: ${student.feeStructure.monthlyFees || "N/A"} */}
                            {/* {
                              student.feeStructure.monthlyFees.jan
                            } */}
                            {/* {console.log(student.feeStructure.monthlyFees)} */}
                            {/* {console.log(student.feeStructure)} */}
                            <button
                          onClick={() => openFeeModal(student)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                          title="View Details"
                        >
                          Fee Collection
                        </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendMessage(student)}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                          title="Send Message"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          // onClick={() => handelEditStudent(student._id)}
                          onClick={() => openEditModal(student)}
                          className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 border-t">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstStudent + 1} to{" "}
                {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
                {filteredStudents.length} students
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                    {selectedStudent.profilePhoto ? (
                      <img
                        src={selectedStudent.profilePhoto}
                        alt={selectedStudent.fullName}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedStudent.fullName}
                    </h3>
                    <p className="text-gray-600">
                      Student ID: {selectedStudent._id?.substring(0, 12)}...
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Full Name</span>
                      <span className="font-medium">
                        {selectedStudent.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">
                        {selectedStudent.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="font-medium">
                        {selectedStudent.phoneNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Date of Birth</span>
                      <span className="font-medium">
                        {formatDate(selectedStudent.DOB)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Academic Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Current Class</span>
                      <span className="font-medium">
                        Class {selectedStudent.currentClass}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Section</span>
                      <span className="font-medium">
                        {selectedStudent.section || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Admission Date</span>
                      <span className="font-medium">
                        {formatDate(selectedStudent.admissionDate)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Guardian</span>
                      <span className="font-medium">
                        {selectedStudent.gurdianName || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fee Information */}
                {selectedStudent.feeStructure && (
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-bold text-gray-800 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Fee Information
                    </h4>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Total Fees</p>
                          <p className="text-2xl font-bold text-gray-800">
                            ${selectedStudent.feeStructure.totalFees || "0"}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Paid</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${selectedStudent.feeStructure.paidFees || "0"}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Due</p>
                          <p className="text-2xl font-bold text-red-600">
                            ${selectedStudent.feeStructure.dueFees || "0"}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Status</p>
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              getFeeStatus(selectedStudent).color
                            }`}
                          >
                            {getFeeStatus(selectedStudent).text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                >
                  Close
                </button>
                {/* <button 
                onClick={openEditModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                  Edit Student
                </button>  // needs to work on this later*/} 
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Edit Student
            </h2>

            {/* Full Name */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Guardian Name */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">
                Guardian Name
              </label>
              <input
                type="text"
                value={editData.gurdianName}
                onChange={(e) =>
                  setEditData({ ...editData, gurdianName: e.target.value })
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Section */}
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                value={editData.section}
                onChange={(e) =>
                  setEditData({ ...editData, section: e.target.value })
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showFeeModal && selectedFeeStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Fee Collection – {selectedFeeStudent.fullName}
      </h2>

      <p className="text-gray-600 mb-4">
        Class {selectedFeeStudent.currentClass} · Section {selectedFeeStudent.section}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {Object.entries(selectedFeeStudent.feeStructure.monthlyFees).map(([month, amount]) => {
          const paid = selectedFeeStudent.feesPaid[month];

          return (
            <div 
              key={month}
              className="p-4 border rounded-xl flex items-center justify-between bg-gray-50"
            >
              <div>
                <p className="text-lg font-semibold capitalize">{month}</p>
                <p className="text-gray-600 text-sm">₹ {amount}</p>
              </div>

              <button
                onClick={() => handleToggleFee(month)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  paid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {paid ? "Paid" : "Pending"}
              </button>
            </div>
          );
        })}

        {/* Admission Fee */}
        <div className="p-4 border rounded-xl flex items-center justify-between bg-gray-50">
          <div>
            <p className="text-lg font-semibold">Admission Fee</p>
            <p className="text-gray-600 text-sm">
              ₹ {selectedFeeStudent.feeStructure.admissionFee}
            </p>
          </div>

          <button
            onClick={() => handleToggleFee("admissionFee")}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedFeeStudent.feesPaid.admissionFee
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedFeeStudent.feesPaid.admissionFee ? "Paid" : "Pending"}
          </button>
        </div>

        {/* Additional Fee */}
        <div className="p-4 border rounded-xl flex items-center justify-between bg-gray-50">
          <div>
            <p className="text-lg font-semibold">Additional Fee</p>
            <p className="text-gray-600 text-sm">
              ₹ {selectedFeeStudent.feeStructure.adittionalFees}
            </p>
          </div>

          <button
            onClick={() => handleToggleFee("adittionalFees")}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedFeeStudent.feesPaid.adittionalFees
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedFeeStudent.feesPaid.adittionalFees ? "Paid" : "Pending"}
          </button>
        </div>

      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowFeeModal(false)}
          className="px-6 py-3 bg-gray-200 rounded-xl"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
