import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";

import {
  Users,
  UserCheck,
  Mail,
  Phone,
  Search,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  X,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Shield,
} from "lucide-react";

export default function TeacherList() {
  const { token } = useAuth();

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Add teacher form
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    password: "",
    classAssigned: [], // array of numbers
  });

  // Edit teacher form
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editTeacherData, setEditTeacherData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    classAssigned: [],
  });

  const classes = Array.from({ length: 12 }, (_, i) => i + 1);

  // ========= FETCH TEACHERS =========
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      // TODO: replace with your real "get all teachers" endpoint
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/fetchAllTeachers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const list = response.data.data || [];
        setTeachers(list);
        setFilteredTeachers(list);
      } else {
        console.error("Failed to fetch teachers:", response.data.message);
        setTeachers([]);
        setFilteredTeachers([]);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
      setFilteredTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========= FILTER & SEARCH =========
  useEffect(() => {
    let data = [...teachers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (t) =>
          t.fullName?.toLowerCase().includes(q) ||
          t.email?.toLowerCase().includes(q) ||
          t.phoneNumber?.toString().includes(q) ||
          t.subject?.toLowerCase().includes(q)
      );
    }

    if (subjectFilter !== "all") {
      data = data.filter(
        (t) => t.subject?.toLowerCase() === subjectFilter.toLowerCase()
      );
    }

    setFilteredTeachers(data);
    setCurrentPage(1);
  }, [teachers, searchQuery, subjectFilter]);

  // ========= STATS =========
  const totalTeachers = teachers.length;
  const uniqueSubjects = Array.from(
    new Set(teachers.map((t) => t.subject?.toLowerCase()).filter(Boolean))
  );
  const totalClassesCovered = Array.from(
    new Set(
      teachers
        .flatMap((t) => t.classAssigned || [])
        .map((c) => Number(c))
        .filter((c) => !Number.isNaN(c))
    )
  ).length;

  // ========= ADD TEACHER =========
  const toggleClassAssigned = (cls) => {
    setNewTeacher((prev) => {
      const exists = prev.classAssigned.includes(cls);
      if (exists) {
        return {
          ...prev,
          classAssigned: prev.classAssigned.filter((c) => c !== cls),
        };
      }
      return {
        ...prev,
        classAssigned: [...prev.classAssigned, cls],
      };
    });
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newTeacher,
        phoneNumber: Number(newTeacher.phoneNumber),
        subject: newTeacher.subject.toLowerCase(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/createTeacher`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Teacher created:", response.data);

      // Reset form
      setNewTeacher({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        password: "",
        classAssigned: [],
      });
      setShowAddModal(false);
      await fetchTeachers();
    } catch (error) {
      console.error("Error creating teacher:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to create teacher. Check console."
      );
    }
  };

  // ========= EDIT TEACHER =========
  const openEditModal = (teacher) => {
    setEditTeacherId(teacher._id);
    setEditTeacherData({
      fullName: teacher.fullName || "",
      email: teacher.email || "",
      phoneNumber: teacher.phoneNumber || "",
      subject: teacher.subject || "",
      classAssigned: teacher.classAssigned || [],
    });
    setShowEditModal(true);
  };

  const toggleEditClassAssigned = (cls) => {
    setEditTeacherData((prev) => {
      const exists = prev.classAssigned.includes(cls);
      if (exists) {
        return {
          ...prev,
          classAssigned: prev.classAssigned.filter((c) => c !== cls),
        };
      }
      return {
        ...prev,
        classAssigned: [...prev.classAssigned, cls],
      };
    });
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editTeacherData,
        phoneNumber: Number(editTeacherData.phoneNumber),
        subject: editTeacherData.subject.toLowerCase(),
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/admin/updateTeacher/${editTeacherId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Teacher updated:", response.data);
      setShowEditModal(false);
      await fetchTeachers();
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to update teacher. Check console."
      );
    }
  };

  // ========= DELETE TEACHER (OPTIONAL) =========
  // Only if/when you add delete endpoint in backend
  const handleDeleteTeacher = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/removeTeacher/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert(
        error?.response?.data?.message ||
          "Failed to delete teacher. Check console."
      );
    }
  };

  // ========= PAGINATION =========
  const indexOfLast = currentPage * teachersPerPage;
  const indexOfFirst = indexOfLast - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ========= UI =========
  if (loading && teachers.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full" />
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading Teachers...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch teacher data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Teachers Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage teacher profiles, classes, and subjects
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchTeachers}
            className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Teacher
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalTeachers}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Subjects</p>
              <p className="text-2xl font-bold text-gray-800">
                {uniqueSubjects.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Classes Covered</p>
              <p className="text-2xl font-bold text-gray-800">
                {totalClassesCovered}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Subject Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {uniqueSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search teachers by name, email, phone, or subject..."
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
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            Teachers List
            <span className="text-gray-500 text-sm font-normal ml-2">
              ({filteredTeachers.length} teachers)
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject & Classes
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTeachers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No teachers found
                      </p>
                      <p className="text-gray-400 mt-2">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentTeachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                          <span className="font-semibold text-blue-700">
                            {teacher.fullName?.charAt(0)?.toUpperCase() || "T"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {teacher.fullName}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Shield className="w-3 h-3 mr-1 text-blue-500" />
                            Teacher ID: {teacher._id?.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">
                            {teacher.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-700">
                            {teacher.phoneNumber || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-700 capitalize">
                          {teacher.subject || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Classes:{" "}
                          {(teacher.classAssigned || []).length > 0
                            ? teacher.classAssigned.join(", ")
                            : "None"}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">
                          {teacher.createdAt
                            ? new Date(
                                teacher.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition"
                          title="Edit Teacher"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                          title="Delete Teacher"
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
        {filteredTeachers.length > 0 && (
          <div className="px-6 py-4 border-t">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirst + 1} to{" "}
                {Math.min(indexOfLast, filteredTeachers.length)} of{" "}
                {filteredTeachers.length} teachers
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

      {/* ADD TEACHER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Teacher
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newTeacher.fullName}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, fullName: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newTeacher.email}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, email: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newTeacher.phoneNumber}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subject: e.target.value })
                  }
                  placeholder="e.g. mathematics, physics"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={newTeacher.password}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, password: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Classes Assigned
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {classes.map((cls) => {
                    const isSelected = newTeacher.classAssigned.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => toggleClassAssigned(cls)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Class {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEACHER MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Teacher
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTeacher} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editTeacherData.fullName}
                  onChange={(e) =>
                    setEditTeacherData({
                      ...editTeacherData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editTeacherData.email}
                  onChange={(e) =>
                    setEditTeacherData({
                      ...editTeacherData,
                      email: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editTeacherData.phoneNumber}
                  onChange={(e) =>
                    setEditTeacherData({
                      ...editTeacherData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={editTeacherData.subject}
                  onChange={(e) =>
                    setEditTeacherData({
                      ...editTeacherData,
                      subject: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Classes Assigned
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {classes.map((cls) => {
                    const isSelected = editTeacherData.classAssigned.includes(
                      cls
                    );
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => toggleEditClassAssigned(cls)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Class {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
