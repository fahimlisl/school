import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  LogOut,
  Loader,
  Pencil,
  Search,
  GraduationCap,
  Menu,
  X,
  User2,
  BookOpen,
  BarChart3,
  School,
} from "lucide-react";
import axios from "axios";

export default function TeacherDashboard() {
  const { user, token, logout } = useAuth();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksInput, setMarksInput] = useState("");
  const [term, setTerm] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch assigned students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/teacher/fetch-students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents(res.data.data || []);
      setFilteredStudents(res.data.data || []);

      if (user.classAssigned?.length > 0) {
        setSelectedClass(user.classAssigned[0]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // FILTERING
  useEffect(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter(
        (s) => s.currentClass === Number(selectedClass)
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((s) =>
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [selectedClass, searchQuery, students]);

  // Submit marks
  const submitMarks = async () => {
    if (!marksInput) return alert("Enter marks");

    setSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/teacher/updateMarksheet/${selectedStudent._id}`,
        { obtainedMarks: Number(marksInput), term: Number(term) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Marks updated!");
      setMarksInput("");
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error updating marks:", err);
      alert("Failed to update marks");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 bg-white shadow-xl h-full w-72 p-6 transition-transform duration-300 border-r 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-xl font-semibold">Menu</h2>
          <X onClick={() => setSidebarOpen(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-6">

          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <User2 className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <p className="font-bold text-gray-800 text-lg">{user.fullName}</p>
              <p className="text-gray-500 text-sm">
                {user.subject?.toUpperCase()} Teacher
              </p>
            </div>
          </div>

          <hr />

          {/* CLASS FILTER */}
          <div>
            <p className="font-medium text-gray-700 mb-1 flex gap-2 items-center">
              <GraduationCap className="w-4" /> Class Filter
            </p>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 bg-gray-100 rounded-lg border focus:ring-2 focus:ring-blue-500"
            >
              {user.classAssigned?.map((cls) => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
          </div>

          {/* SEARCH */}
          <div>
            <p className="font-medium text-gray-700 mb-1">Search Student</p>

            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-4" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 bg-gray-100 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <hr />

          <button
            onClick={logout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
          >
            <LogOut className="w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden mb-4 bg-white shadow p-2 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user.fullName.split(" ")[0]} 👋
              </h1>
              <p className="opacity-80 mt-2">
                Subject Teacher — {user.subject?.toUpperCase()}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg inline-flex items-center gap-2">
                <School className="w-5" /> Teacher Portal Active
              </div>
            </div>
          </div>
        </div>

        {/* STUDENTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredStudents.length === 0 ? (
            <p className="text-gray-600 text-lg col-span-full">
              No students match your filters.
            </p>
          ) : filteredStudents.map((student) => {
              const subjects = student.marksheet?.terms?.[0]?.subjects || [];

              return (
                <div
                  key={student._id}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={student.profilePhoto}
                      className="w-16 h-16 rounded-xl object-cover border"
                    />

                    <div>
                      <p className="font-bold text-gray-800 text-lg">
                        {student.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Class {student.currentClass} — Sec {student.section}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-gray-400">Your Subjects</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subjects.length === 0 ? (
                        <span className="text-xs text-gray-300">None</span>
                      ) : (
                        subjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                          >
                            {sub.subjectName.toUpperCase()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Pencil size={16} /> Update Marks
                  </button>
                </div>
              );
            })}
        </div>
      </main>

      {/* MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">
              Update Marks — {selectedStudent.fullName}
            </h2>

            <label className="font-medium">Select Term</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>

            <label className="font-medium">Marks</label>
            <input
              type="number"
              value={marksInput}
              onChange={(e) => setMarksInput(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter marks"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                onClick={submitMarks}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {submitting && (
                  <Loader size={16} className="animate-spin" />
                )}
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
