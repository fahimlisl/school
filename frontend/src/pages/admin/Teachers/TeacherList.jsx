import React from "react";
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

  const SUBJECTS = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Bengali",
    "Geography",
    "History",
    "Civics",
    "Social Science",
  ];

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
    classAssigned: [],
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

  // ============ FETCH TEACHERS ============
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/fetchAllTeachers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const list = response.data.data || [];
        setTeachers(list);
        setFilteredTeachers(list);
      } else {
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
  }, []);

  // ============ FILTER + SEARCH ============
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

  // ============ ADD TEACHER ============
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

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/createTeacher`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset
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
      console.error("Create teacher error:", error);
      alert(error?.response?.data?.message || "Failed to create teacher");
    }
  };

  // ============ EDIT TEACHER ============
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

      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/admin/updateTeacher/${editTeacherId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowEditModal(false);
      await fetchTeachers();
    } catch (error) {
      console.error("Update error:", error);
      alert(error?.response?.data?.message || "Failed to update teacher");
    }
  };

  // ============ DELETE TEACHER ============
  const handleDeleteTeacher = async (teacherId) => {
    if (!window.confirm("Delete teacher?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/removeTeacher/${teacherId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchTeachers();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error?.response?.data?.message || "Delete failed");
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

      {/* HEADER */}
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

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <p className="text-sm text-gray-500">Total Teachers</p>
          <p className="text-2xl font-bold text-gray-800">{teachers.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <p className="text-sm text-gray-500">Subjects</p>
          <p className="text-2xl font-bold text-gray-800">
            {new Set(teachers.map((t) => t.subject)).size}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow border border-gray-200">
          <p className="text-sm text-gray-500">Classes Covered</p>
          <p className="text-2xl font-bold text-gray-800">
            {
              new Set(
                teachers.flatMap((t) => t.classAssigned || [])
              ).size
            }
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl p-6 shadow border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Subject Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2 border rounded-xl bg-gray-50"
            >
              <option value="all">All Subjects</option>
              {SUBJECTS.map((sub) => (
                <option key={sub} value={sub.toLowerCase()}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h3 className="text-lg font-bold">Teachers List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs text-gray-500 uppercase">
                  Teacher
                </th>
                <th className="py-3 px-6 text-left text-xs text-gray-500 uppercase">
                  Contact
                </th>
                <th className="py-3 px-6 text-left text-xs text-gray-500 uppercase">
                  Subject & Classes
                </th>
                <th className="py-3 px-6 text-left text-xs text-gray-500 uppercase">
                  Joined
                </th>
                <th className="py-3 px-6 text-left text-xs text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-medium">{teacher.fullName}</p>
                      <p className="text-xs text-gray-500">
                        ID: {teacher._id?.slice(0, 8)}...
                      </p>
                    </td>

                    <td className="py-4 px-6 space-y-1">
                      <p className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {teacher.email}
                      </p>
                      <p className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {teacher.phoneNumber}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-medium capitalize">
                        {teacher.subject}
                      </p>
                      <p className="text-xs text-gray-500">
                        Classes: {teacher.classAssigned?.join(", ") || "None"}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      {teacher.createdAt
                        ? new Date(teacher.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="py-4 px-6 flex space-x-2">
                      <button
                        onClick={() => openEditModal(teacher)}
                        className="p-2 bg-amber-100 text-amber-600 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-gray-500 text-lg"
                  >
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {filteredTeachers.length > 0 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirst + 1} to{" "}
              {Math.min(indexOfLast, filteredTeachers.length)} of{" "}
              {filteredTeachers.length}
            </span>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => paginate(idx + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-white"
                      : "border"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =================== ADD TEACHER MODAL =================== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Teacher</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4">

              {/* SUBJECT DROPDOWN HERE */}
              <div>
                <label className="text-sm">Subject</label>
                <select
                  required
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, subject: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((sub) => (
                    <option key={sub} value={sub.toLowerCase()}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* CLASS BUTTONS */}
              <div>
                <label className="text-sm">Classes Assigned</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => toggleClassAssigned(cls)}
                      className={`px-3 py-1 rounded-lg border ${
                        newTeacher.classAssigned.includes(cls)
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      Class {cls}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Create Teacher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =================== EDIT TEACHER MODAL =================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Teacher</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTeacher} className="space-y-4">

              {/* SUBJECT DROPDOWN HERE */}
              <div>
                <label className="text-sm">Subject</label>
                <select
                  required
                  value={editTeacherData.subject}
                  onChange={(e) =>
                    setEditTeacherData({
                      ...editTeacherData,
                      subject: e.target.value,
                    })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((sub) => (
                    <option key={sub} value={sub.toLowerCase()}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* CLASS BUTTONS */}
              <div>
                <label className="text-sm">Classes Assigned</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => toggleEditClassAssigned(cls)}
                      className={`px-3 py-1 rounded-lg border ${
                        editTeacherData.classAssigned.includes(cls)
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      Class {cls}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
